<?php

class Common_Exception_Exit extends Common_Exception
{

    function __construct(){
        parent::__construct("exit dispatch loop.");
    }
}