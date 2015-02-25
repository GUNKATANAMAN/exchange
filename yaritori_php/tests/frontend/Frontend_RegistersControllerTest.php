<?php
/*
 * cd G:\pleiades\xampp\htdocs\yaritori_php\tests phpunit frontend\Frontend_RegisterControllerTest.php
 */
class Frontend_RegisterControllerTest extends Base {
	public function testDelete() {
		$this->setRawBody ( 'DELETE', '{"mailaddress":"test@test.ne.jp"}' );
		$this->dispatch ( '/frontend/Register/' );
		$body = $this->getResponse ()->getBody ();

		$this->assertEqualsLog ( Zend_Json::encode ( array (
				"success" => true
		) ), $body );
	}
	public function testPostInsert() {
		$this->setRawBody ( 'POST', '{"name":"試験君","mailaddress":"test@test.ne.jp","password":"testtest"}' );
		$this->dispatch ( '/frontend/Register/' );
		$body = $this->getResponse ()->getBody ();

		$this->assertEqualsLog ( Zend_Json::encode ( array (
				"success" => true
		) ), $body );
	}
	public function testPostExists() {
		$this->setRawBody ( 'POST', '{"name":"試験君","mailaddress":"test@test.ne.jp","password":"testtest"}' );
		$this->dispatch ( '/frontend/Register/' );
		$body = $this->getResponse ()->getBody ();

		$this->assertEqualsLog ( Zend_Json::encode ( array (
				"error" => "すでに登録されているメールアドレスです。"
		) ), $body );
	}
}