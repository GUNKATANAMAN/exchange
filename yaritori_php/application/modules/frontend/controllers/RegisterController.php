<?php
class Frontend_RegisterController extends Frontend_Controller {
	public function init() {
		/* Initialize action controller here */
	}
	public function indexAction() {
	}
	public function postAction() {
		$userDao = new Frontend_Dao_User ();
		$result = $userDao->selectWithMailaddress ( $this->request ["mailaddress"] );
		if (count ( $result )) {
			$this->setJson ( array (
					"error" => "すでに登録されているメールアドレスです。"
			) );
			return;
		}
		$this->request ['password'] = md5 ( $this->request ['password'] );
		$userDao->insert ( $this->request );
		$this->setJson ( array (
				"success" => true
		) );
	}
	public function deleteAction() {
		$userDao = new Frontend_Dao_User ();
		$result = $userDao->deleteWithMailaddress ( $this->request ["mailaddress"] );

		$this->setJson ( array (
				"success" => true
		) );
	}
}