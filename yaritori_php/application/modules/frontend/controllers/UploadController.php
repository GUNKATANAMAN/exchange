<?php

class Frontend_UploadController extends Frontend_Controller
{

    public function postAction ()
    {
        $this->log(Zend_Log::DEBUG, $this->request);

        $this->log(Zend_Log::DEBUG, $_FILES);

        if ($this->request['type'] == 'User') {
            $folder = 'user';
            $toFileName = $this->session->getUserId();
            $dao = new Frontend_Dao_User();
            $where = 'id = ' . $this->session->getUserId();
        }
        if ($this->request['type'] == 'Project') {
            $folder = 'project';
            $toFileName = $this->session->getProjectId();
            $dao = new Frontend_Dao_Project();
            $where = 'id = ' . $this->session->getProjectId();
        }

        if ($result = Common_Utill_File::upload($folder, $toFileName)) {
            $dao->update(
                    array(
                            'image' => $result
                    ), $where);
            $this->setJson(
                    array(
                            "filename" => $result
                    ));
        }
    }
}