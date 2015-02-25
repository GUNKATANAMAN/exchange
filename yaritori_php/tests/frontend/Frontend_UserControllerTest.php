<?php
/*
 * cd G:\pleiades\xampp\htdocs\yaritori_php\tests phpunit frontend\Frontend_RegisterControllerTest.php
 */
class Frontend_UserControllerTest extends Base {

    public function testGet(){
        $this->login ();
        $this->setProject();
        $this->dispatch ( '/frontend/User/' );
        $body = $this->getResponse ()->getBody ();
        $this->assertEqualsLog ( '{"id":"94","name":"\u8a66\u9a13\u30c7\u30fc\u30bf","mailaddress":"dont-delete@this.data","password":"05a671c66aefea124cc08b76ea6d30bb","image":"94.JPG"}', $body );
    }

	public function testPut() {
		$this->login ();
		$this->setProject();

		$this->setRawBody ( 'PUT', '{"id":"94","name":"試験データ","mailaddress":"dont-delete@this.data","password":"05a671c66aefea124cc08b76ea6d30bb","image":"94.JPG"}' );
		$this->dispatch ( '/frontend/User/' );
		$body = $this->getResponse ()->getBody ();

		$this->assertEqualsLog ( Zend_Json::encode ( array (
				"success" => true
		) ), $body );
	}
}