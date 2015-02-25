<?php

class Common_Controller extends Zend_Rest_Controller
{

    private $json;

    protected $request;

    public function init ()
    {
        /* Initialize action controller here */
    }

    protected function log ($level = Zend_Log::INFO, $message = "", $tag = null)
    {
        $trace = debug_backtrace();
        $trace = array(
                $trace[1]["class"],
                get_class($trace[1]["object"]),
                $trace[1]["function"],
                $trace[0]["line"]
        );
        Common_Utill_Log::info($level, $message, $tag,
                "[" . implode("][", $trace) . "]");
    }

    protected function setJson ($json)
    {
        $this->json = Zend_Json::encode($json, true);
    }

    public function preDispatch ()
    {
        $this->log(Zend_Log::DEBUG, "start preDispatch");
        $this->log(Zend_Log::DEBUG, "getRawBody");
        $this->request = Zend_Json::decode($this->getRequest()->getRawBody());
        if(empty($this->request)){
            // GET PATTERN
            $this->request = $this->getRequest()->getParams();
        }
        $this->log(Zend_Log::DEBUG, "beginTransaction");
        Zend_Registry::get("db")->beginTransaction();
    }

    public function postDispatch ()
    {
        $this->log(Zend_Log::DEBUG, "start postDispatch");
        $this->log(Zend_Log::DEBUG, "commit");
        Zend_Registry::get("db")->commit();
        $this->log(Zend_Log::DEBUG, "set Response");
        $this->setRes();
    }

    public function setRes ()
    {
        $this->getResponse()
            ->setHeader('Content-Type', 'application/json')
            ->setHeader('charset', 'utf-8')
            ->appendBody($this->json);
    }

    public function indexAction ()
    {}

    public function getAction ()
    {}

    public function postAction ()
    {}

    public function putAction ()
    {}

    public function deleteAction ()
    {}

    public function headAction ()
    {}
}