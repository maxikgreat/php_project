<?php
session_start();
echo $_SESSION['logged'];
if($_SESSION['logged'] == true)
{
    echo json_encode('Success!');
}
else
{
    http_response_code(403);
    die('Forbidden');
}
?>