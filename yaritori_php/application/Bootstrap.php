<?php

class Bootstrap extends Zend_Application_Bootstrap_Bootstrap
{

    function _initModule ()
    {
        $front = Zend_Controller_Front::getInstance();
        // set module directory
        $front->addModuleDirectory(
                APPLICATION_PATH . DIRECTORY_SEPARATOR . "modules");
        // set base url これが無いと、default module yaritori_php controller index
        // actio になる
        $front->setBaseUrl("/yaritori_php");
        // api man になるので norender
        $front->setParam('noViewRenderer', true);
        // auto load
        spl_autoload_register(
                function  ($class)
                {
                    require_once implode("/", explode("_", $class)) . ".php";
                });
    }

    function _initLogger ()
    {
        $writer = new Zend_Log_Writer_Stream(
                APPLICATION_PATH . "/data/logs/aplication." . date("Ymd") .
                         ".log");
        $logger = new Zend_Log($writer);
        Zend_Registry::set("logger", $logger);
    }

    protected function _initRoutes ()
    {
        $this->bootstrap('frontController');
        $frontController = Zend_Controller_Front::getInstance();
        $restRoute = new Zend_Rest_Route($frontController);
        $frontController->getRouter()->addRoute('default', $restRoute);
    }

    protected function _initDb ()
    {
        $front = Zend_Controller_Front::getInstance();
        $config = $this->getOptions();
        $db = new Zend_Db_Adapter_Pdo_Mysql($config['db']);
        Zend_Db_Table_Abstract::setDefaultAdapter($db);
        Zend_Registry::set("db", $db);
    }

    protected function _initPlugin ()
    {
        $front = Zend_Controller_Front::getInstance();
        $plugin = new Zend_Controller_Plugin_ErrorHandler();
        $plugin->setErrorHandlerModule('frontend');
        $front->registerPlugin($plugin);
    }
}