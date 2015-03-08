<?php
/*
 * cd G:\pleiades\xampp\htdocs\yaritori_php\tests phpunit frontend\Frontend_RegisterControllerTest.php
 */
class Frontend_TopControllerTest extends Base {

	public function testGet() {
		$this->login ();
		$this->setProject();

		$this->dispatch ( '/frontend/Top/' );
		$body = $this->getResponse ()->getBody ();
		$result = Zend_Json::decode($body);

		$this->assertEqualsLog( 3, count($result['history']) );
		$this->assertEqualsLog( true, !empty($result['nice']) );
		$this->assertEqualsLog( true, !empty($result['bad']) );
	}
}