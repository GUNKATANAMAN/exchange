<?php

class Common_Utill_File
{

    static function upload ($folder, $toFileName)
    {
        if (isset($_FILES['file'])) {
            $ext = explode('.', $_FILES['file']['name']);
            move_uploaded_file($_FILES['file']['tmp_name'],
                    FILE_UPLOAD_PATH . $folder . '/' . $toFileName  . "." . $ext[1]);
            return $toFileName  . "." . $ext[1];
        }
        return false;
    }
}