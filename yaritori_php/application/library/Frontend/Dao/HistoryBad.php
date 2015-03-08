<?php

class Frontend_Dao_HistoryBad extends Common_Dao
{

    protected $_name = 'exchange_history_bad';

    public function selectLastSeq ($params)
    {
        $select = $this->select()->from($this,
                new Zend_Db_Expr('MAX(seq) as max_seq'));
        $this->addWhere($select, $params, "exchange_id");
        $this->addWhere($select, $params, "exchange_seq");
        $result = $this->fetchRow($select);
        $seq;
        if ($result == null) {
            $seq = 0;
        } else {
            $seq = $result['max_seq'];
        }
        return $seq;
    }

    public function selectHistory ($params)
    {
        $select = $this->selectJoin()
            ->from(array(
                'eh' => 'exchange_history_bad'
        ))
            ->join(array(
                'u' => 'user'
        ), 'u.id = eh.user_id', array(
                'image'
        ))
            ->
        where("exchange_id = ?", $params['exchange_id'])
            ->where("exchange_seq = ?", $params['exchange_seq'])
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
                        'eh' => 'exchange_history_bad'
                ))
                ->join(array(
                        'e' => 'exchange'
                ), 'e.id = eh.exchange_id',array(''))
                ->join(array(
                        'u' => 'user'
                ), 'u.id = eh.user_id', array(
                        'image'
                ))
                ->order(array(
                        'eh.update_date DESC'
                ))
                ->limit(1);
        $result = $this->fetchAll($select);
        foreach ($result as $key => $val) {
            $result[$key]['user_name'] = Common_Utill_Table::getUserName(
                    $val['user_id']);
            $result[$key]['description'] = nl2br($val['description']);
        }
        return $result;
    }

}