<?php
require_once __DIR__ . '/Base.php';
class Test_Pctb extends Base
{
    public function testNew1()
    {
        $this->setHtmlA('www.google.co.jp');
        $this->setHtmlB('www.google.co.jp');
        $selector = 'title';
        $this->assertInnerHtml($selector);
    }
}