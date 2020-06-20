<?php
require_once './connect.php';
$_POST = json_decode(file_get_contents("php://input"), true);




$sql = "INSERT INTO `quiz` `(id, name, description, date, question_amount)` VALUES ('$_POST['id']', '$_POST['name']', '$_POST['description']', $_POST['date']', '$_POST['question_amount']');";

if($result = mysqli_query($conn, $sql))
{
    echo "Success!";
}
else
{
    echo "Fatal error!";
}


$sql = "INSERT INTO `questions` `(id, question, quiz_id, correct_answer_id, answer_1, answer_2, answer_3, answer_4)` VALUES (id, question, quiz_id, correct_answer_id, answer_1, answer_2, answer_3, answer_4);";

if($result = mysqli_query($conn, $sql))
{
    echo "Success!";
}
else
{
    echo "Fatal error!";
}


?>