<?php

class Frontend_Dao_History extends Common_Dao
{

    protected $_name = 'exchange_history';

    public function selectLastHistorySeq ($params)
    {
        $select = $this->select()->from($this,
                new Zend_Db_Expr('MAX(seq) as max_seq'));
        $this->addWhere($select, $params, "user_id");
        $this->addWhere($select, $params, "project_id");
        $this->addWhere($select, $params, "exchange_id");
        $result = $this->fetchRow($select);
        $seq;
        if ($result == null) {
            $seq = - 1;
        } else {
            $seq = $result['max_seq'];
        }
        return $seq;
    }

    public function selectHistory ($params)
    {
        $select = $this->selectJoin()
            ->from(
                array(
                        'eh' => 'exchange_history'
                ))
            ->join(array(
                'u' => 'user'
        ), 'u.id = eh.user_id', array(
                'image'
        ))
            ->where("exchange_id = ?", $params['id'])
            ->where("project_id = ?", $params['project_id'])
            ->order(array(
                'seq DESC'
        ));
        $result = $this->fetchAll($select);
        foreach ($result as $key => $val) {
            $result[$key]['user_name'] = Common_Utill_Table::getUserName(
                    $val['user_id']);
            $result[$key]['description'] = nl2br($val['description']);
        }
        return $result;
    }

    public function recentHistory ($projectId)
    {
        $select = $this->selectJoin()
            ->from(
                array(
                        'eh' => 'exchange_history'
                ))
            ->join(array(
                'u' => 'user'
        ), 'u.id = eh.user_id', array(
                'image'
        ))
            ->where("project_id = ?", $projectId)
            ->order(array(
                'eh.create_time DESC'
        ))
            ->limit(3);
        $result = $this->fetchAll($select);
        foreach ($result as $key => $val) {
            $result[$key]['user_name'] = Common_Utill_Table::getUserName(
                    $val['user_id']);
            $result[$key]['description'] = nl2br($val['description']);
        }
        return $result;
    }
}