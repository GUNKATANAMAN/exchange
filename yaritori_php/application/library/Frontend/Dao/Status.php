<?php

class Frontend_Dao_Status extends Common_Dao
{

    protected $_name = 'status';

    function selectAll(){
        return $this->fetchAll($this->select());
    }

}