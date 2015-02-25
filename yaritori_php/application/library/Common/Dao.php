<?php

class Common_Dao extends Zend_Db_Table_Abstract
{

    protected $_schema = 'exchange';

    public function fetchAll ($where = NULL, $order = NULL, $count = NULL, $offset = NULL)
    {
        // jsonデータにしやすいよう配列に変換

        $data = parent::fetchAll($where, $order, $count, $offset);
        $result = array();
        foreach ($data as $index => $row) {
            $result[$index] = $row->toArray();
        }
        return $result;
    }

    public function selectJoin ()
    {
        return $this->select()->setIntegrityCheck(false);
    }

    public function addWhere(&$select, $params, $key, $alias = ""){
        if(!empty($alias)){
            $alias = $alias.".";
        }
        if(isset($params[$key])){
            $select->where($alias . $key .  '= ?',  $params[$key] );
        }
    }

    public function selectWithUserId ($userId)
    {
        $result = $this->fetchAll(
                $this->select()
                    ->where('user_id = :user_id')
                    ->bind(array(
                        ':user_id' => $userId
                )));
        return $result;
    }
}