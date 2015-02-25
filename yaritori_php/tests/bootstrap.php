<?php
// アプリケーション・ディレクトリへのパスを定義します
defined('APPLICATION_PATH')
    || define('APPLICATION_PATH',
              realpath(dirname(dirname(__FILE__))) . '/application');

// アプリケーション環境を定義します
defined('APPLICATION_ENV')
    || define('APPLICATION_ENV',
              (getenv('APPLICATION_ENV') ? getenv('APPLICATION_ENV')
                                         : 'production'));

define('_TEST_USER_1_ID_', '{"mailaddress":"test@test.ne.jp","password":"testtest"}');
define('_TEST_USER_1_PROJECT_ID_',30);

define('_TEST_USER_2_ID_','{"mailaddress":"dont-delete@this.data","password":"testtest"}');
define('_TEST_USER_2_PROJECT_ID_', '{"project_id":35}');

// include path
set_include_path(APPLICATION_PATH . '/library/;'.get_include_path());

/** Zend_Application */
require_once 'Zend/Application.php';

// アプリケーション及びブートストラップを作成して、実行します
$application = new Zend_Application(
    APPLICATION_ENV,
    APPLICATION_PATH . '/configs/application.ini'
);

require_once 'Zend/Loader/Autoloader.php';
Zend_Loader_Autoloader::getInstance();

require_once 'frontend/Base.php';
