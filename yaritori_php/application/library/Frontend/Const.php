<?php

class Frontend_Const
{

    public static $RES_LOGIN_ID_IS_EMPTY = array(
            "redirect" => "/login"
    );

    public static $RES_PROJECT_ID_IS_EMPTY = array(
            "redirect" => "/projects"
    );

    public static $ARR_ALLOW_NO_LOGIN_CONTROLLERS = array(
            "Error",
            "Login",
            "Register"
    );

    public static $ARR_ALLOW_NO_PROJECT_CONTROLLERS = array(
            "Error",
            "Login",
            "Register",
            "Projects"
    );
}