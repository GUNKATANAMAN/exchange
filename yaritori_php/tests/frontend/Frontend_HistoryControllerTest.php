<?php
/*
 * cd G:\pleiades\xampp\htdocs\yaritori_php\tests phpunit frontend\Frontend_RegisterControllerTest.php
 */
class Frontend_HistoryControllerTest extends Base {
	public function testGet() {
		$this->login ();
		$this->setProject();
		$this->dispatch ( '/frontend/Exchanges/8' );
	    $body = $this->getResponse ()->getBody ();
		$this->assertEqualsLog ( true, ! empty ( $body ) );
		// 動けばいいや
	}

	public function testPostInsert() {
		$this->login ();
		$this->setProject();

		$this->setRawBody ( 'POST', '{"title":"テストケース作成","partner":"94","status":"2","start_date":"2015-12-31","end_date":"2013-12-30","description":"説明","exchange_id":"8"}' );
		$this->dispatch ( '/frontend/History/' );
		$body = $this->getResponse ()->getBody ();

		$this->assertEqualsLog ( Zend_Json::encode ( array (
				"success" => true
		) ), $body );
	}
}