<?php
/*
 * cd G:\pleiades\xampp\htdocs\yaritori_php\tests phpunit frontend\Frontend_RegisterControllerTest.php
 */
class Frontend_UserProjectControllerTest extends Base {

    public function testGet(){
        $this->login ();
        $this->setProject();
        $this->dispatch ( '/frontend/UserProject/' );
        $body = $this->getResponse ()->getBody ();
        $this->assertEqualsLog ( '[{"id":"94","name":"\u8a66\u9a13\u30c7\u30fc\u30bf","mailaddress":"dont-delete@this.data"}]', $body );
    }

    public function testGetSearch(){
        $this->login ();
        $this->setProject();
        $this->dispatch ( '/frontend/UserProject/gunkatanaman@ezweb.ne.jp' );
        $body = $this->getResponse ()->getBody ();
        $this->assertEqualsLog ( '{"id":"98","name":"\u4eca\u91cegggg","mailaddress":"gunkatanaman@ezweb.ne.jp","password":"40fbbd87428383d6ca636a583684f978","image":"98.JPG"}', $body );
    }

	public function testPost() {
		$this->login ();
		$this->setProject();

		$this->setRawBody ( 'POST', '{"user_id":"98"}' );
		$this->dispatch ( '/frontend/UserProject/' );
		$body = $this->getResponse ()->getBody ();

		$this->assertEqualsLog ( Zend_Json::encode ( array (
				"result" => true
		) ), $body );
	}

	public function testDelete() {
	    $this->login ();
	    $this->setProject();

	    $this->request->setMethod ('DELETE');
	    $this->dispatch ( '/frontend/UserProject/98' );
	    $body = $this->getResponse ()->getBody ();

	    $this->assertEqualsLog ( Zend_Json::encode ( array (
	            "result" => true
	    ) ), $body );
	}

}