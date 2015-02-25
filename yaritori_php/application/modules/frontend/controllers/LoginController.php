<?php
class Frontend_LoginController extends Frontend_Controller {

	public function indexAction() {
	}
	public function putAction() {
		$userDao = new Frontend_Dao_User();

		$result = $userDao->selectAuth($this->request['mailaddress'], $this->request['password']);
		if(count($result) > 0){
			// login
			$this->session->setUserId($result["id"]);
			$this->session->setProjectId("");
			$this->setJson(array("success"=>true));
		}else{
			$this->setJson(array("error"=>"ログインに失敗しました。"));
		}

	}
}