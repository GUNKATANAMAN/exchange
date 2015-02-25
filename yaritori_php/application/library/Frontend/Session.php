<?php

class Frontend_Session extends Zend_Session_Namespace
{

    public function set ($key, $value)
    {
        $this->$key = $value;
    }

    public function get ($key)
    {
        return $this->$key;
    }

    public function setUserId ($value)
    {
        $this->set("user_id", $value);
    }

    public function getUserId ()
    {
        return $this->get("user_id");
    }

    public function setProjectId ($value)
    {
        $this->set("project_id", $value);
    }

    public function getProjectId ()
    {
        return $this->get("project_id");
    }
}