<?php
class Common_Utill_Log {
	static function info($level, $message, $tag = null, $trace) {
		$log = $trace;
		if ($tag != null) {
			$log = $log . "[" . $tag . "]";
		}
		$log = $log . print_r ( $message, true );

		switch ($level) {
			case Zend_Log::ALERT :
				Zend_Registry::get ( "logger" )->alert ( $log );
				break;
			case Zend_Log::CRIT :
				Zend_Registry::get( "logger" )->crit ( $log );
				break;
			case Zend_Log::DEBUG :
				Zend_Registry::get( "logger" )->debug ( $log );
				break;
			case Zend_Log::EMERG :
				Zend_Registry::get( "logger" )->emerg ( $log );
				break;
			case Zend_Log::ERR :
				Zend_Registry::get( "logger" )->err ( $log );
				break;
			case Zend_Log::INFO :
				Zend_Registry::get( "logger" )->info ( $log );
				break;
			case Zend_Log::NOTICE  :
				Zend_Registry::get( "logger" )->notice ( $log );
				break;
		}
	}
}