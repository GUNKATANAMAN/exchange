<?php
class IndexController extends Zend_Controller_Action
{
	public function init()
	{
		/* Initialize action controller here */
	}

	public function indexAction()
	{
		$array = get_class_vars("Frontend_Const");
		echo Zend_Json::encode($array);
	}

	public function testAction()
	{
		// action body
	}
}