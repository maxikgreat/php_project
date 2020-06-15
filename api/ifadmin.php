<?php
session_start();
if($_SESSION['logged'] = true)
{
    echo('Success!');
}
else
{
    http_response_code(403);
    die('Forbidden');
}

?>