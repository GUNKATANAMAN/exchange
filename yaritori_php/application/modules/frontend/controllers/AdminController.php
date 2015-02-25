<?php

class Frontend_AdminController extends Frontend_Controller
{

    public function indexAction ()
    {
        $projectDao = new Frontend_Dao_Project();

        $result = $projectDao->find($this->session->getProjectId());

        $this->setJson($result[0]);
    }

    public function putAction ()
    {
        $this->log(Zend_Log::DEBUG, $this->request);
        $projectDao = new Frontend_Dao_Project();
        $value = array();
        if (! empty($this->request['name'])) {
            $value['name'] = $this->request['name'];
        }
        if (! empty($this->request['description'])) {
            $value['description'] = $this->request['description'];
        }

        if (count($value) > 0) {
            $projectDao->update($value,
                    array(
                            'id = ' . $this->session->getProjectId()
                    ));
        }
        $this->setJson(array(
                "success" => true
        ));
    }
}