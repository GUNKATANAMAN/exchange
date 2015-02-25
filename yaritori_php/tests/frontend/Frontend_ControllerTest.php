<?php
/*
 * cd G:\pleiades\xampp\htdocs\yaritori_php\tests phpunit
 * frontend\Frontend_LoginControllerTest.php
 */
class Frontend_ControllerTest extends Base
{
    // 未ログインテスト
    public function testNotLoginRedirect ()
    {
        $controllers = scandir(
                APPLICATION_PATH . "/modules/frontend/controllers");
        foreach ($controllers as $val) {
            if (! preg_match("/Controller.php/", $val))
                continue;
            $target = str_replace("Controller.php", "", $val);
            if (! in_array($target,
                    Frontend_Const::$ARR_ALLOW_NO_LOGIN_CONTROLLERS)) {
                echo "\n" . $target;
                $this->dispatch('/frontend/' . $target . '/');
                $body = $this->getResponse()->getBody();
                $this->assertEqualsLog(
                        Zend_Json::encode(
                                Frontend_Const::$RES_LOGIN_ID_IS_EMPTY), $body);
                $this->resetRequest()->resetResponse();
                parent::setUp();
            }
        }
    }

    // ログインテスト
    public function testLoginRedirect ()
    {
        $controllers = scandir(
                APPLICATION_PATH . "/modules/frontend/controllers");
        foreach ($controllers as $val) {
            if (! preg_match("/Controller.php/", $val) ||
                     preg_match("/ErrorController.php/", $val))
                continue;
            $target = str_replace("Controller.php", "", $val);
            echo "\n" . $target;
            $this->login();
            $this->dispatch('/frontend/' . $target . '/');
            $body = $this->getResponse()->getBody();
            $this->assertEqualsLog(
                    $body !=
                             Zend_Json::encode(
                                    Frontend_Const::$RES_LOGIN_ID_IS_EMPTY), true);
            $this->resetRequest()->resetResponse();
            parent::setUp();
        }
    }

    // 未プロジェクトテスト
    public function testNotProjectRedirect ()
    {
        $controllers = scandir(
                APPLICATION_PATH . "/modules/frontend/controllers");
        foreach ($controllers as $val) {
            if (! preg_match("/Controller.php/", $val))
                continue;
            $target = str_replace("Controller.php", "", $val);
            if (! in_array($target,
                    Frontend_Const::$ARR_ALLOW_NO_PROJECT_CONTROLLERS)) {
                echo "\n" . $target;
                $this->login();
                $this->dispatch('/frontend/' . $target . '/');
                $body = $this->getResponse()->getBody();
                $this->assertEqualsLog(
                        Zend_Json::encode(
                                Frontend_Const::$RES_PROJECT_ID_IS_EMPTY), $body);
                $this->resetRequest()->resetResponse();
                parent::setUp();
            }
        }
    }

    // プロジェクトテスト
    public function testProjectRedirect ()
    {
        $controllers = scandir(
                APPLICATION_PATH . "/modules/frontend/controllers");
        foreach ($controllers as $val) {
            if (! preg_match("/Controller.php/", $val) ||
                     preg_match("/ErrorController.php/", $val))
                continue;
            $target = str_replace("Controller.php", "", $val);
            echo "\n" . $target;
            $this->setProject();
            $this->dispatch('/frontend/' . $target . '/');
            $body = $this->getResponse()->getBody();

            $this->assertEqualsLog(
                    $body != Zend_Json::encode(
                            Frontend_Const::$RES_PROJECT_ID_IS_EMPTY), true);
            $this->resetRequest()->resetResponse();
            parent::setUp();
        }
    }
}