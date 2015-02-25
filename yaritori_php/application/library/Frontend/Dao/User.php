<?php

class Frontend_Dao_User extends Common_Dao
{

    protected $_name = 'user';

    function selectAuth ($mailaddress, $password)
    {
        $row = $this->fetchRow(
                $this->select()
                    ->where('mailaddress = :mailaddress')
                    ->where('password = :password')
                    ->bind(
                        array(
                                ':mailaddress' => $mailaddress,
                                ':password' => md5($password)
                        )));
        return $row;
    }

    function selectAll (){
        return $this->fetchAll($this->select());
    }

    function selectUserWithProject ($projectId)
    {
        $select = $this->selectJoin()
            ->from(array('u'=>'user'),array("id","name"))
            ->join(array('up' => 'user_project'), 'u.id = up.user_id',array())
            ->join(array('p' => 'project'), 'p.id = up.project_id',array())
            ->where('p.id = :project_id')
            ->bind(
                array(
                        ':project_id' => $projectId
                ));

        $result = $this->fetchAll($select);
        return $result;
    }

    function selectWithMailaddress ($mailaddress)
    {
        $row = $this->fetchRow(
                $this->select()
                    ->where('mailaddress = :mailaddress')
                    ->bind(
                        array(
                                ':mailaddress' => $mailaddress
                        )));
        return $row;
    }

    function deleteWithMailaddress ($mailaddress)
    {
        $where = $this->getAdapter()->quoteInto('mailaddress = ?', $mailaddress);
        return $this->delete($where);
    }
}