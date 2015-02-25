<?php
/*
 * cd G:\pleiades\xampp\htdocs\yaritori_php\tests phpunit frontend\Frontend_RegisterControllerTest.php
 */
class Frontend_AdminControllerTest extends Base {

    public function testGet(){
        $this->login ();
        $this->setProject();
        $this->dispatch ( '/frontend/Admin/' );
        $body = $this->getResponse ()->getBody ();
        $this->assertEqualsLog ( '{"id":"35","user_id":"94","name":"\u8a66\u9a13\u30c7\u30fc\u30bf\u3000\u3053\u306e\u30d7\u30ed\u30b8\u30a7\u30af\u30c8\u3051\u3055\u306a\u3044\u3067","description":"\u6d88\u3057\u305f\u3089\u6bba\u3059","image":"35.JPG"}', $body );
    }

	public function testPut() {
		$this->login ();
		$this->setProject();

		$this->setRawBody ( 'PUT', '{"id":"35","user_id":"94","name":"試験データ　このプロジェクトけさないで","description":"消したら殺す","image":"35.JPG"}' );
		$this->dispatch ( '/frontend/Admin/' );
		$body = $this->getResponse ()->getBody ();

		$this->assertEqualsLog ( Zend_Json::encode ( array (
				"success" => true
		) ), $body );
	}
}