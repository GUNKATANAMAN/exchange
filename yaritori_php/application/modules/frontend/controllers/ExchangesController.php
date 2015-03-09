<?php

class Frontend_ExchangesController extends Frontend_Controller
{

    public function indexAction ()
    {
        // ステータスの取得
        $statusDao = new Frontend_Dao_Status();
        $status = $statusDao->selectAll();
        // このプロジェクトの人員を取得
        $userDao = new Frontend_Dao_User();
        $partner = $userDao->selectUserWithProject(
                $this->session->getProjectId());
        // リストの取得(TODO)
        $exchangeDao = new Frontend_Dao_Exchange();
        $list = $exchangeDao->searchExchange($this->request,
                $this->session->getProjectId());
        $this->log(Zend_Log::DEBUG,$this->request);
        // paginator
        $paginator = $exchangeDao->getPaginator($this->request,
                $this->session->getProjectId());

        $result = array(
                "status" => $status,
                "partner" => $partner,
                'exchanges' => $list,
                'paginator' => $paginator
        );

        $this->setJson($result);
    }

    public function getAction ()
    {
        $exchangeDao = new Frontend_Dao_Exchange();
        $this->log(Zend_Log::DEBUG, $this->request);
        $list = $exchangeDao->searchExchange($this->request,
                $this->session->getProjectId());
        foreach ($list as $key => $val) {
            $list[$key]["description"] = nl2br($val["description"]);
            $list[$key]["status"] = Common_Utill_Table::getStatusName(
                    $val['status']);
        }
        $this->setJson(array(
                'exchanges' => $list
        ));
    }

    public function postAction ()
    {
        $exchangeDao = new Frontend_Dao_Exchange();
        $exchangeUserDao = new Frontend_Dao_ExchangeUser();
        // TODO:PARTNER

        $this->log(Zend_Log::DEBUG, "insertExchange");
        $id = $exchangeDao->insertExchange($this->request,
                $this->session->getUserId(), $this->session->getProjectId());
        $exchangeUserDao->insert(
                array(
                        'exchange_id' => $id,
                        'user_id' => $this->session->getUserId()
                ));

        $this->setJson(array(
                "success" => true
        ));
    }
}