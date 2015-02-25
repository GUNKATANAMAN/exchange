<?php
/*
 * G:\pleiades\xampp\htdocs\yaritori_php\tests>phpunit frontend\Frontend_IndexControllerTest.php
 */
class Base extends Zend_Test_PHPUnit_ControllerTestCase {

    const _USER_ID = 0;
    const _PROJECT_ID_ = 0;

	public function setUp() {
		// アプリケーション及びブートストラップを作成して、実行します
		$this->bootstrap = new Zend_Application ( APPLICATION_ENV, APPLICATION_PATH . '/configs/application.ini' );
		parent::setUp ();
		Zend_Controller_Front::getInstance ()->setParam ( 'disableOutputBuffering', true );
	}
	public function assertEqualsLog($expected, $actual) {
		echo "\n";
		echo "expected:" . print_r ( $expected, true ) . " actual:" . print_r ( $actual, true );
		$this->assertEquals ( $expected, $actual );
	}

	public function setRawBody($method, $rawBody) {
		$this->request->setHeader ( 'Content-Type', 'application/json' )->setMethod ( $method )->setRawBody ( $rawBody );
	}
	public function tearDown() {
		echo "\n";
	}
	public function login() {
		$this->setRawBody ( 'PUT', _TEST_USER_2_ID_ );
		$this->dispatch ( '/frontend/Login/' );
		$this->resetRequest ()->resetResponse ();
	}

	public function setProject() {
	    $this->login ();
	    $this->setRawBody ( 'PUT', _TEST_USER_2_PROJECT_ID_ );
	    $this->dispatch ( '/frontend/Projects/' );
		$this->resetRequest ()->resetResponse ();
	}

}