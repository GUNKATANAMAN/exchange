<?php
/*
 * cd G:\pleiades\xampp\htdocs\yaritori_php\tests phpunit frontend\Frontend_LoginControllerTest.php
 */
class Frontend_LoginControllerTest extends Base {
	public function testPutSuccess() {
		$this->setRawBody ( 'PUT', _TEST_USER_1_ID_ );
		$this->dispatch ( '/frontend/Login/' );
		$body = $this->getResponse ()->getBody ();

		$this->assertEqualsLog (Zend_Json::encode ( array (
				"success" => true
		) ),$body )
		;
		$session = new Frontend_Session ();
		$userId = $session->getUserId ();
		$projectId = $session->getProjectId ();
		$this->assertEqualsLog ( true, ! empty ( $userId ) );
		$this->assertEqualsLog ( true, empty ( $projectId ) );
	}

	// ２回ログイン時にprojectがクリアされているか？
	public function testDoublePutSuccess() {
	    $this->setProject();
	    $this->setRawBody ( 'PUT', _TEST_USER_1_ID_ );
	    $this->dispatch ( '/frontend/Login/' );
	    $body = $this->getResponse ()->getBody ();

	    $this->assertEqualsLog (Zend_Json::encode ( array (
	            "success" => true
	    ) ),$body )
	    ;
	    $session = new Frontend_Session ();
	    $userId = $session->getUserId ();
	    $projectId = $session->getProjectId ();
	    $this->assertEqualsLog ( true, ! empty ( $userId ) );
	    $this->assertEqualsLog ( true, empty ( $projectId ) );
	}

	public function testPutError() {
		$this->setRawBody ( 'PUT', '{"mailaddress":"none","password":"none"}' );
		$this->dispatch ( '/frontend/Login/' );
		$body = $this->getResponse ()->getBody ();

		$this->assertEqualsLog ( $body, Zend_Json::encode ( array (
				"error" => "ログインに失敗しました。"
		) ) );
	}
}