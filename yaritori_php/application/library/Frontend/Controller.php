<?php

class Frontend_Controller extends Common_Controller
{

    public $session;

    public function preDispatch ()
    {
        parent::preDispatch();
        $this->session = new Frontend_Session();

        $controllerName = $this->getRequest()->getParam('controller');
        // loginチェック
        $userId = $this->session->getUserId();
        if (empty($userId) && ! in_array($controllerName,
                Frontend_Const::$ARR_ALLOW_NO_LOGIN_CONTROLLERS)) {
            $this->log(Zend_Log::INFO, "no login id");
            $this->setJson(Frontend_Const::$RES_LOGIN_ID_IS_EMPTY);
            $this->setRes();
            $this->getResponse()->sendResponse();
            throw new Common_Exception_Exit();
        }

        $projectId = $this->session->getProjectId();
        // projectチェック
        if (empty($projectId) && ! in_array($controllerName,
                Frontend_Const::$ARR_ALLOW_NO_PROJECT_CONTROLLERS)) {
            $this->log(Zend_Log::INFO, "no project id");
            $this->setJson(Frontend_Const::$RES_PROJECT_ID_IS_EMPTY);
            $this->setRes();
            $this->getResponse()->sendResponse();
            throw new Common_Exception_Exit();
        }
    }
}

