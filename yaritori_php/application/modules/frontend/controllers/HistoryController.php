<?php

class Frontend_HistoryController extends Frontend_Controller
{

    public function getAction ()
    {
        // ヒストリーの取得
        $historyDao = new Frontend_Dao_History();
        $this->log(Zend_Log::DEBUG, $this->request);
        $params = array('id'=>$this->request['id'], 'project_id'=>$this->session->getProjectId());
        $historyList = $historyDao->selectHistory($params);
        $historyNiceDao = new Frontend_Dao_HistoryNice();
        $historyBadDao = new Frontend_Dao_HistoryBad();
        foreach($historyList as $key => $val){
            $result = $historyNiceDao->selectHistory(array('exchange_id'=>$this->request['id'],'exchange_seq'=>$val['seq']));
            if(!empty($result)){
                $historyList[$key]['nice'] = $result;
            }
            $result = $historyBadDao->selectHistory(array('exchange_id'=>$this->request['id'],'exchange_seq'=>$val['seq']));
            if(!empty($result)){
                $historyList[$key]['bad'] = $result;
            }
        }
        $result = array(
                'history' => $historyList
        );

        $this->setJson($result);
    }

    public function postAction ()
    {
        $historyDao = new Frontend_Dao_History();
        // ヒストリーの取得
        $seq = $historyDao->selectLastHistorySeq(
                array(
                        'exchange_id' => $this->request['exchange_id'],
                        'user_id' => $this->session->getUserId(),
                        'project_id' => $this->session->getProjectId()
                ));
        $this->log(Zend_Log::DEBUG, "history seq is :" . $seq);
        // ヒストリーの作成
        $changeLog = "";
        $exchangeUpdateValue = array();
        if (! empty($this->request['title'])) {
            $changeLog = $changeLog . "タイトルを「" . $this->request['title'] . "」に変更。";
            $exchangeUpdateValue['title'] = $this->request['title'];
        }
        if (! empty($this->request['status'])) {
            $statusDao = new Frontend_Dao_Status();
            $rows = $statusDao->find($this->request['status']);
            $changeLog = $changeLog . "ステータスを「" . $rows[0]['name'] . "」に変更。";
            $exchangeUpdateValue['status'] = $this->request['status'];
        }
        if (! empty($this->request['partner'])) {
            $userDao = new Frontend_Dao_User();
            $rows = $userDao->find($this->request['partner']);
            $changeLog = $changeLog . "やり取り相手を「" . $rows[0]['name'] . "」に変更。";
        }
        if (! empty($this->request['start_date'])) {
            $changeLog = $changeLog . "開始日を「" . $this->request['start_date'] .
                     "」に変更。";
            $exchangeUpdateValue['start_date'] = $this->request['start_date'];
        }
        if (! empty($this->request['end_date'])) {
            $changeLog = $changeLog . "終了日を「" . $this->request['end_date'] .
                     "」に変更。";
            $exchangeUpdateValue['end_date'] = $this->request['end_date'];
        }
        // ヒストリーのインサート
        $description = "";
        if (isset($this->request['description'])) {
            $description = $this->request['description'];
        }
        $historyInsertParams = array(
                'user_id' => $this->session->getUserId(),
                'project_id' => $this->session->getProjectId(),
                'exchange_id' => $this->request['exchange_id'],
                'seq' => $seq + 1,
                'description' => $description,
                'change_log' => $changeLog
        );
        $historyDao->insert($historyInsertParams);

        // やりとりのupdate
        if (! empty($exchangeUpdateValue)) {
            $exchangeDao = new Frontend_Dao_Exchange();
            $exchangeUpdateParam = array(
                    'id = ?' => $this->request['exchange_id'],
                    'user_id = ?' => $this->session->getUserId(),
                    'project_id = ?' => $this->session->getProjectId()
            );
            $exchangeDao->update($exchangeUpdateValue, $exchangeUpdateParam);
        }

        // やり取り相手のupdate（ゆくゆくはupdate,insertの判定が必要）
        if (! empty($this->request['partner'])) {
            $exchangeUserDao = new Frontend_Dao_ExchangeUser();
            $exchangeUserDao->update(
                    array(
                            'user_id' => $this->request['partner']
                    ),
                    array(
                            'exchange_id' => $this->request['exchange_id']
                    ));
        }

        $this->setJson(array(
                "success" => true
        ));
    }
}