<?php
/*
 * cd G:\pleiades\xampp\htdocs\yaritori_php\tests phpunit frontend\Frontend_RegisterControllerTest.php
 */
class Frontend_ProjectsControllerTest extends Base {
	public function testGet() {
		$this->login ();
		$this->dispatch ( '/frontend/Projects/' );
	    $body = $this->getResponse ()->getBody ();
		$this->assertEqualsLog ( true, ! empty ( $body ) );
	}
	public function testPutInvalidAccess() {
	    $this->login ();
		$this->setRawBody ( 'PUT', '{"project_id":"12"}' );
	    $this->dispatch ( '/frontend/Projects/' );
	    $body = $this->getResponse ()->getBody ();
	    $this->assertEqualsLog ( Zend_Json::encode(array("error"=>"不正なアクセスです。")), $body );
	}
	public function testPut() {
	    $this->login ();
	    $this->setRawBody ( 'PUT', _TEST_USER_2_PROJECT_ID_ );
	    $this->dispatch ( '/frontend/Projects/' );
	    $body = $this->getResponse ()->getBody ();
	    $this->assertEqualsLog ( Zend_Json::encode(array("success"=>true)), $body );
	}

	public function testPostInsert() {
		$this->login ();

		$this->setRawBody ( 'POST', '{"name":"試験プロジェクト","description":"asdfsa\nfdsafas\nfsd\nafs"}' );
		$this->dispatch ( '/frontend/Projects/' );
		$body = $this->getResponse ()->getBody ();

		$this->assertEqualsLog ( Zend_Json::encode ( array (
				"success" => true
		) ), $body );
	}
}