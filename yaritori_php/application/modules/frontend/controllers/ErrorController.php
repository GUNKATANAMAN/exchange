<?php

class Frontend_ErrorController extends Frontend_Controller
{

    public function preDispatch ()
    {
        $this->log(Zend_Log::CRIT, "rollback", "EXCEPTION");
        Zend_Registry::get("db")->rollback();
    }

    public function postDispatch ()
    {}

    public function errorAction ()
    {
        $errors = $this->_getParam('error_handler');

        $msg = "";

        switch ($errors->type) {
            case Zend_Controller_Plugin_ErrorHandler::EXCEPTION_NO_ROUTE:
            case Zend_Controller_Plugin_ErrorHandler::EXCEPTION_NO_CONTROLLER:
            case Zend_Controller_Plugin_ErrorHandler::EXCEPTION_NO_ACTION:
                // コントローラもしくはアクションが存在しない場合
                $msg = 'リクエストされたコントローラ・アクションは存在しません。';
                break;
            case 'Common_Exception_Exit':
                // exitの代わりに何もしないアクションに飛ばす
                break;
            default:
                // アプリケーションの処理中に発生したエラーの処理
                $msg = $errors->exception->getMessage();
                break;
        }
        $this->log(Zend_Log::CRIT, $msg, "EXCEPTION");
    }
}