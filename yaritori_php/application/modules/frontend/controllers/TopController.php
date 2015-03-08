<?php

class Frontend_TopController extends Frontend_Controller
{

    public function init ()
    {
        /* Initialize action controller here */
    }

    public function indexAction ()
    {
        $hisotryDao = new Frontend_Dao_History();
        $exchanges = $hisotryDao->recentHistory(
                $this->session->getProjectId());

        $historyNiceDao = new Frontend_Dao_HistoryNice();
        $historyNice = $historyNiceDao->recentHistory(
                $this->session->getProjectId());

        $historyBadDao = new Frontend_Dao_HistoryBad();
        $historyBad = $historyBadDao->recentHistory(
                $this->session->getProjectId());

        $this->setJson(
                array(
                        'history' => $exchanges,
                        'nice' => $historyNice[0],
                        'bad' => $historyBad[0]
                ));
    }

    public function testAction ()
    {
        // action body
    }
}