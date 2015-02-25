<?php

class Frontend_Dao_UserProject extends Common_Dao
{

    protected $_name = 'user_project';

    protected $_primary = array(
            'user_id',
            'project_id'
    );

    function selectRowWithUserProject ($userId, $projectId)
    {
        $select = $this->select()
            ->where('user_id = :user_id')
            ->where('project_id = :project_id')
            ->bind(
                array(
                        ':user_id' => $userId,
                        ':project_id' => $projectId
                ));

        $result = $this->fetchRow($select);
        return $result;
    }

}