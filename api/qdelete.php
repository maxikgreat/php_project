<?php
require_once './connect.php';
//$_POST = json_decode(file_get_contents("php://input"), true);
//$id = $_POST['id'];

$id = 3;

$sql = "DELETE FROM `questions` WHERE `questions`.`quiz_id` = '$id'";

if($result = mysqli_query($conn, $sql))
{
    echo "Success!";
}
else
{
    echo "Fatal error!";
}

$sql = "DELETE FROM quiz WHERE id = '$id'";

if($result = mysqli_query($conn, $sql))
{
    echo "Success!";
}
else
{
    echo "Fatal error!";
}





?>