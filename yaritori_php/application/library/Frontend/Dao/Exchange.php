<?php

class Frontend_Dao_Exchange extends Common_Dao
{

    protected $_name = 'exchange';

    const _PER_PAGE_ = 10;

    public function insertExchange ($params, $userId, $projectId)
    {
        unset($params["partner"]);
        return $this->insert(
                array_merge($params,
                        array(
                                'user_id' => $userId,
                                'project_id' => $projectId,
                                'create_date' => new Zend_Db_Expr("NOW()")
                        )));
    }

    public function searchExchange ($params, $projectId)
    {
        $select = $this->selectJoin()
            ->from(array(
                'e' => 'exchange'
        ))
            ->join(array(
                'u' => 'user'
        ), 'e.user_id = u.id', array(
                'name'
        ))
            ->where('project_id = ?', $projectId);
        $this->addWhere($select, $params, "id", "e");
        $this->addWhere($select, $params, "title");
        $this->addWhere($select, $params, "user_id");
        $this->addWhere($select, $params, "status");
        if (isset($params["start_date"])) {
            $select->where("start_date >= ?", $params["start_date"]);
        }
        if (isset($params["end_date"])) {
            $select->where("end_date <= ?", $params["end_date"]);
        }
        if (isset($params["create_date"])) {
            $select->where("create_date >= ?", $params["create_date"]);
        }
        if (isset($params["update_date"])) {
            $select->where("update_date >= ?", $params["update_date"]);
        }
        $page = (isset($params['page']) ? $params['page'] : 1) - 1;
        $from = $page * self::_PER_PAGE_;
        $select->limit(self::_PER_PAGE_, $from);

        $result = $this->fetchAll($select);
        $exchangeUserDao = new Frontend_Dao_ExchangeUser();
        foreach ($result as $key => $value) {
            $users = $exchangeUserDao->selectUser($value['id']);
            $result[$key]["users"] = $users;
        }
        // やり取り相手の絞込みは、ロジックで行う
        if (isset($params["partner"])) {
            $dummy = $result;
            foreach ($dummy as $key => $val) {
                foreach ($val["users"] as $user) {
                    if ($user["user_id"] != $params["partner"]) {
                        unset($result[$key]);
                        break;
                    }
                }
            }
        }

        return $result;
    }

    public function getPaginator ($params, $projectId)
    {
        $select = $this->selectJoin()
            ->from(array(
                'e' => 'exchange'
        ), array(
                'id'
        ))
            ->join(array(
                'u' => 'user'
        ), 'e.user_id = u.id', array(
                'name'
        ))
            ->where('project_id = ?', $projectId);
        $this->addWhere($select, $params, "id", "e");
        $this->addWhere($select, $params, "title");
        $this->addWhere($select, $params, "user_id");
        $this->addWhere($select, $params, "status");
        if (isset($params["start_date"])) {
            $select->where("start_date >= ?", $params["start_date"]);
        }
        if (isset($params["end_date"])) {
            $select->where("end_date <= ?", $params["end_date"]);
        }
        if (isset($params["create_date"])) {
            $select->where("create_date >= ?", $params["create_date"]);
        }
        if (isset($params["update_date"])) {
            $select->where("update_date >= ?", $params["update_date"]);
        }

        $result = $this->fetchAll($select);
        $exchangeUserDao = new Frontend_Dao_ExchangeUser();
        foreach ($result as $key => $value) {
            $users = $exchangeUserDao->selectUser($value['id']);
            $result[$key]["users"] = $users;
        }
        // やり取り相手の絞込みは、ロジックで行う
        if (isset($params["partner"])) {
            $dummy = $result;
            foreach ($dummy as $key => $val) {
                foreach ($val["users"] as $user) {
                    if ($user["user_id"] != $params["partner"]) {
                        unset($result[$key]);
                        break;
                    }
                }
            }
        }

        $maxCount = count($result);
        $maxPage = ($maxCount % self::_PER_PAGE_) == 0 ? $maxCount /
                 self::_PER_PAGE_ : floor($maxCount / self::_PER_PAGE_) + 1;
        $currentPage = isset($params['page']) ? $params['page'] : 1;
        $hasPrev = $currentPage > 1;
        $hasNext = $currentPage < $maxPage;
        $paginator = array(
                'maxCount' => $maxCount,
                'hasPrev' => $hasPrev,
                'hasNext' => $hasNext,
                'maxPage' => $maxPage,
                'currentPage' => $currentPage,
                'nextPage' => $currentPage+1,
                'prevPage' => $currentPage-1
        );
        $paginator['list'] = array();
        for ($i = 1; $i <= $maxPage; $i ++) {
            $paginator['list'][$i]['isActive'] = $i == $currentPage;
            $paginator['list'][$i]['number'] = $i;
        }

        return $paginator;
    }
}