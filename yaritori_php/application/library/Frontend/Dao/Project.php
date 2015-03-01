<?php

class Frontend_Dao_Project extends Common_Dao
{

    protected $_name = 'project';

    function selectProjectWithUser ($userId)
    {
        $select = $this->selectJoin()
            ->from(array(
                'p' => 'project'
        ))
            ->join(array(
                'up' => 'user_project'
        ), 'p.id = up.project_id')
            ->where('up.user_id = :user_id')
            ->bind(array(
                ':user_id' => $userId
        ));

        $result = $this->fetchAll($select);
        return $result;
    }
}