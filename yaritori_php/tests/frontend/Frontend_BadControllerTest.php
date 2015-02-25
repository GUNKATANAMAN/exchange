<?php
/*
 * cd G:\pleiades\xampp\htdocs\yaritori_php\tests phpunit frontend\Frontend_RegisterControllerTest.php
 */
class Frontend_BadControllerTest extends Base {

	public function testPostInsert() {
		$this->login ();
		$this->setProject();

		$this->setRawBody ( 'POST', '{"exchange_id":"8","exchange_seq":"3","description":"きゃぷちゃbad"}' );
		$this->dispatch ( '/frontend/Bad/' );
		$body = $this->getResponse ()->getBody ();

		$this->assertEqualsLog ( Zend_Json::encode ( array (
				"success" => true
		) ), $body );
	}
}