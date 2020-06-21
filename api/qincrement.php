<?php
require_once './connect.php';
$_POST = json_decode(file_get_contents("php://input"), true);


// $quiz = $_POST['quizTitle']; 
// $desc = $_POST['quizDesc'];
// $date = $_POST['quizDate'];
// $amount = 1;
$quiz = "ds"; 
$desc = "sd";
$date = 1212;
$amount = 1;
//Create quiz table w/o questions amount
$sql = "INSERT INTO quiz (id, name, description, date, question_amount) VALUES ('4', '$quiz', '$desc', '$date', '$amount');";

if($result = mysqli_query($conn, $sql))
{
    //echo "Success!";
}
else
{
    //echo "Fatal error!";
}

//Take uploaded quiz id
$sql = "SELECT id FROM quiz ORDER BY id DESC LIMIT 1";
$result = mysqli_query($conn, $sql);
$row = mysqli_fetch_assoc($result);
$quiz_id = $row[id];

//Create questions table
//$sql = "INSERT INTO `questions` `(question, quiz_id, rightAnswer, answer1, answer2, answer3, answer4)` VALUES ('$_POST['question']', '$quiz_id', '$_POST['rightAnswer']', '$_POST['answer1']', '$_POST['answer2']', '$_POST['answer3']', '$_POST['answer4)']';";

if($result = mysqli_query($conn, $sql))
{
    echo "Success!";
}
else
{
    echo "Fatal error!";
}

// //Take questions amount
// $sql = "SELECT COUNT(*) FROM questions WHERE id = '$quiz_id'";
// $result = mysqli_query($conn, $sql);
// $row = mysqli_fetch_assoc($result);
// $questions_amount = $row[COUNT(*)];

// //Upload questions_amount info into Quiz table
// $sql = "UPDATE quiz SET question_amount = '$questions_amount' WHERE id = '$quiz_id';"

// if($result = mysqli_query($conn, $sql))
// {
//     echo "Success!";
// }
// else
// {
//     echo "Fatal error!";
// }


?>