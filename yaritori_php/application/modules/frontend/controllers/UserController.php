<?php

class Frontend_UserController extends Frontend_Controller
{

    public function indexAction ()
    {
        $userDao = new Frontend_Dao_User();

        $result = $userDao->find($this->session->getUserId());

        $this->setJson($result[0]);
    }

    public function putAction ()
    {

        $userDao = new Frontend_Dao_User();
        $value = array();
        if(!empty($this->request['name'])){
            $value['name'] = $this->request['name'];
        }
        if(!empty($this->request['mailaddress'])){
            $value['mailaddress'] = $this->request['mailaddress'];
        }
        if(!empty($this->request['password'])){
            $value['password'] = $this->request['password'];
        }

        if(count($value) > 0){
            $userDao->update($value, array('id = ' . $this->session->getUserId()));
        }
        $this->setJson(array(
                "success" => true
        ));
    }
}