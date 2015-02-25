<?php
/*
 * cd G:\pleiades\xampp\htdocs\yaritori_php\tests phpunit frontend\Frontend_RegisterControllerTest.php
 */
class Frontend_ExchangesControllerTest extends Base {
	public function testGet() {
		$this->login ();
		$this->setProject();
		$this->dispatch ( '/frontend/Exchanges/' );
	    $body = $this->getResponse ()->getBody ();
		$this->assertEqualsLog ( true, ! empty ( $body ) );
		// 動けばいいや
	}


	public function testGetDetail() {
	    $this->login ();
	    $this->setProject();
	    $this->dispatch ( '/frontend/Exchanges/8' );
	    $body = $this->getResponse ()->getBody ();
	    $this->assertEqualsLog ( true, ! empty ( $body ) );
	    $this->resetRequest ()->resetResponse ();
	    $this->dispatch ( '/frontend/History/8' );
	    $body = $this->getResponse ()->getBody ();
	    $this->assertEqualsLog ( true, ! empty ( $body ) );
	    // 動けばいいや
	}

	public function testGetWithParam(){
	    $this->login ();
	    $this->setProject();
	    $this->dispatch ( '/frontend/Exchanges/user_id/94/partner/94/status/1/start_date/2015-02-11/end_date/2023-02-11/create_date/2015-02-01/update_date/2015-02-01' );
	    $body = $this->getResponse ()->getBody ();
	    $this->assertEqualsLog ( true, ! empty ( $body ) );
	    // 動けばいいや

	}

	public function testPostInsert() {
		$this->login ();
		$this->setProject();

		$this->setRawBody ( 'POST', '{"title":"aaaa","status":"1","partner":"94","start_date":"2015-02-04T13:59:49.318Z","end_date":"","description":"aaaa"}' );
		$this->dispatch ( '/frontend/Exchanges/' );
		$body = $this->getResponse ()->getBody ();

		$this->assertEqualsLog ( Zend_Json::encode ( array (
				"success" => true
		) ), $body );
	}
}