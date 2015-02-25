<?php

class Frontend_ProjectsController extends Frontend_Controller
{

    public function indexAction ()
    {
        $projectDao = new Frontend_Dao_Project();
        $result = $projectDao->selectProjectWithUser(
                $this->session->getUserId());
        $this->setJson($result);
    }

    public function getAction ()
    {}

    public function putAction ()
    {
        $this->log(Zend_Log::DEBUG, "PUT ACTION");
        $projectId = $this->request["project_id"];
        $userId = $this->session->getUserId();
        $userProjectDao = new Frontend_Dao_UserProject();
        $result = $userProjectDao->selectRowWithUserProject($userId, $projectId);
        $this->log(Zend_Log::DEBUG, $result);
        if(count($result) > 0){
            $this->session->setProjectId($result["project_id"]);
            $this->setJson(array("success"=>true));
            $this->log(Zend_Log::DEBUG,"set project id success");
        }else{
            $this->setJson(array("error"=>"不正なアクセスです。"));
            $this->log(Zend_Log::DEBUG,"invalid project user_id:" . $userId . " project_id:" . $projectId);
        }
    }

    public function postAction ()
    {
        $projectDao = new Frontend_Dao_Project();
        $id = $projectDao->insert(
                array_merge($this->request,
                        array(
                                'user_id' => $this->session->getUserId()
                        )));
        $userProjectDao = new Frontend_Dao_UserProject();
        $userProjectDao->insert(
                array(
                        'user_id' => $this->session->getUserId(),
                        'project_id' => $id
                ));
        $this->setJson(array(
                "success" => true
        ));
    }
}