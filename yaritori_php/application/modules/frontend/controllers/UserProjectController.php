<?php

class Frontend_UserProjectController extends Frontend_Controller
{

    public function indexAction ()
    {
        // プロジェクトに日もづくユーザー一覧を取得
        $userDao = new Frontend_Dao_User();
        $result = $userDao->selectUserWithProject($this->session->getProjectId());
        $this->setJson($result);
    }

    public function getAction ()
    {
        // メールアドレスからユーザーを検索
        $userDao = new Frontend_Dao_User();
        $result = $userDao->selectWithMailaddress($this->request['id']);
        if(count($result) <= 0){
            $result = array('error'=>'存在しないユーザーです。');
        }
        $this->setJson($result);
    }

    public function postAction ()
    {
        // セッションのプロジェクトに、ユーザーを追加
        $userProjectDao = new Frontend_Dao_UserProject();
        $userProjectDao->insert(array('project_id'=>$this->session->getProjectId(), 'user_id'=>$this->request['user_id']));
        $this->setJson(array('result'=>true));
    }

    public function deleteAction ()
    {
        // 対象のユーザーをプロジェクトから削除
        $userProjectDao = new Frontend_Dao_UserProject();
        $this->log(Zend_Log::DEBUG, $this->request);
        $userProjectDao->delete(array('project_id = '. $this->session->getProjectId(), 'user_id = '.$this->request['id']));
        $this->setJson(array('result'=>true));
    }
}