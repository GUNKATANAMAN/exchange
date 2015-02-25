<?php
// アプリケーション・ディレクトリへのパスを定義します
defined ( 'APPLICATION_PATH' ) || define ( 'APPLICATION_PATH', realpath ( dirname ( dirname ( __FILE__ ) ) . '/application' ) );

// アプリケーション環境を定義します
defined ( 'APPLICATION_ENV' ) || define ( 'APPLICATION_ENV', (getenv ( 'APPLICATION_ENV' ) ? getenv ( 'APPLICATION_ENV' ) : 'production') );

// ファイルアップロードパス
define ('FILE_UPLOAD_PATH', 'G:\\pleiades\\xampp\\htdocs\\yaritori\\img\\');

// include path
set_include_path ( APPLICATION_PATH . '/library/;' . get_include_path () );

/**
 * Zend_Application
 */
require_once 'Zend/Application.php';

// アプリケーション及びブートストラップを作成して、実行します
$application = new Zend_Application ( APPLICATION_ENV, APPLICATION_PATH . '/configs/application.ini' );

$application->bootstrap ()->run ();

