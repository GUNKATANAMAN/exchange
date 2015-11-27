<?php
set_include_path(
        get_include_path() . ';G:\pleiades\xampp\htdocs\difftestrunner\Vender');
require_once 'simple_html_dom_utility.php';

class Base extends PHPUnit_Framework_TestCase
{

    var $htmlA;

    var $htmlB;

    var $domA;

    var $domB;

    public function setHtmlA ($url)
    {
        $this->setHtml($url, 'A');
    }

    public function setHtmlB ($url)
    {
        $this->setHtml($url, 'B');
    }

    private function setHtml ($url, $type)
    {
        $ch = curl_init($url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        $html = curl_exec($ch);
        curl_close($ch);
        if ($type == 'A') {
            $this->htmlA = $html;
            $this->domA = str_get_html($html);
        } else {
            $this->htmlB = $html;
            $this->domB = str_get_html($html);
        }
    }

    public function assertInnerHtml ($selector)
    {
        $resultA = $this->domA->find($selector);
        $resultB = $this->domB->find($selector);
        $this->assertEquals(count($resultA),count($resultB));
        for($i=0; $i < min(array(count($resultA),count($resultB))); $i++){
            echo "-----------------A-----------------\n";
            print_r($resultA[$i]->innerText());
            echo "\n-----------------B-----------------\n";
            print_r($resultB[$i]->innerText());
            $this->assertEquals($resultA[$i]->innerText(), $resultB[$i]->innerText());
        }
    }
}
