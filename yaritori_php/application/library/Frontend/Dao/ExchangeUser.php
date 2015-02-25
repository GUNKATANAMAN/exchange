<?php

class Frontend_Dao_ExchangeUser extends Common_Dao
{

    protected $_name = 'exchange_user';

    public function insertExchange ($exchangeId, $params)
    {
        if (is_array($params)) {
            foreach ($params as $userId) {
                $this->insert(
                        array(
                                'exchange_id' => $exchangeId,
                                'user_id' => $userId
                        ));
            }
        } else {
            $this->insert(
                    array(
                            'exchange_id' => $exchangeId,
                            'user_id' => $params
                    ));
        }
    }

    public function selectUser ($exchangeId)
    {
        return $this->fetchAll(
                $this->selectJoin()
                ->from(array('eu'=>'exchange_user'))
                ->join(array('u'=>'user'), 'eu.user_id = u.id')
                    ->where('exchange_id = ?', $exchangeId));
    }
}