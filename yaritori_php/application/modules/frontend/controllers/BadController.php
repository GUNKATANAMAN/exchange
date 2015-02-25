<?php

class Frontend_BadController extends Frontend_Controller
{

    public function getAction ()
    {}

    public function postAction ()
    {
        $historyBadDao = new Frontend_Dao_HistoryBad();

        $this->log(Zend_Log::DEBUG, $this->request);
        $seq = $historyBadDao->selectLastSeq($this->request);
        $seq = $seq + 1;

        if(!isset($this->request['description'])){
            $description = '';
        }else{
            $description = $this->request['description'];
        }
        $values = array(
                'exchange_id' => $this->request['exchange_id'],
                'exchange_seq' => $this->request['exchange_seq'],
                'seq' => $seq,
                'user_id' => $this->session->getUserId(),
                'description' => $description
        );

        $historyBadDao->insert($values);

        $this->setJson(array(
                "success" => true
        ));
    }
}