<?php
session_start();
if($_SESSION['logged'] == true)
{
    echo json_encode('Success!');
}
else
{
    http_response_code(403);
}
?>