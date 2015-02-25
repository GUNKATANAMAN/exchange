<?php
class Frontend_TopController extends Frontend_Controller {
	public function init() {
		/* Initialize action controller here */
	}
	public function indexAction() {
		$this->setJson ( array (
				array (
						"id" => 1,
						"number" => 1,
						"person_name" => "今野",
						"header_text" => array (
								"status" => "進行中"
						),
						"img_url" => "",
						"body_text" => nl2br ( "説明文テスト\n説明文テスト\n説明文テスト\n" )
				)
		) );
	}
	public function testAction() {
		// action body
	}
}