<?php

class Common_Utill_Table
{

    static $statusMap = null;

    static $userMap = null;

    static function getStatusName ($id)
    {
        if (self::$statusMap == null) {
            $statusDao = new Frontend_Dao_Status();
            $result = $statusDao->selectAll();
            self::$statusMap = array();
            foreach ($result as $val) {
                self::$statusMap[$val['id']] = $val['name'];
            }
        }
        return self::$statusMap[$id];
    }

    static function getUserName ($id)
    {
        if (self::$userMap == null) {
            $statusDao = new Frontend_Dao_User();
            $result = $statusDao->selectAll();
            self::$userMap = array();
            foreach ($result as $val) {
                self::$userMap[$val['id']] = $val['name'];
            }
        }
        return self::$userMap[$id];
    }
}