<?php
require_once './connect.php';
$_POST = json_decode(file_get_contents("php://input"), true);

?>
<script>
    alert("123"+$_POST[]);
</script>    

<?php

 $quiz = $_POST['quizTitle']; 
 $desc = $_POST['quizDesc'];
 $date = $_POST['quizDate'];
 $amount = 1;
//Create quiz table w/o questions amount
$sql = "INSERT INTO quiz (id, name, description, date, question_amount) VALUES (NULL, '$quiz', '$desc', '$date', '$amount');";

if($result = mysqli_query($conn, $sql))
{
    //echo "Success!";
}
else
{
    //echo "Fatal error!";
}

//Take uploaded quiz id
// $sql = "SELECT id FROM quiz ORDER BY id DESC LIMIT 1";
// $result = mysqli_query($conn, $sql);
// $row = mysqli_fetch_assoc($result);
// $quiz_id = $row[id];



//Create questions table
// $que = $_POST['question'];
// $qui_id = $_POST['2'];
// $rig_answer = $_POST[''];
// $an_1 = $_POST['answer1'];
// $an_2 = $_POST['answer2'];
// $an_3 = $_POST['answer3'];
// $an_4 = $_POST['answer4'];

$que = $_POST['questions[question[1]]'];
$qui_id = 2;
$rig_answer = 2;
$an_1 = "dsds";
$an_2 = "dsds";
$an_3 = "dsds";
$an_4 = "dsds";

$sql = "INSERT INTO questions (id, question, quiz_id, correct_answer_id, answer_1, answer_2, answer_3, answer_4) VALUES (NULL, '$que', '$qui_id', '$rig_answer', '$an_1', '$an_2', '$an_3', '$an_4');";



 if($result = mysqli_query($conn, $sql))
 {
     //echo "Success!";
 }
 else
 {
    //echo "Fatal error!";
 }

// // //Take questions amount
// $sql = "SELECT COUNT(*) FROM questions WHERE id = '$quiz_id'";
// $result = mysqli_query($conn, $sql);
// $row = mysqli_fetch_assoc($result);
// $questions_amount = $row[COUNT(*)];

// // // //Upload questions_amount info into Quiz table
// //  $sql = "UPDATE quiz SET question_amount = '$questions_amount' WHERE id = '$quiz_id';"

// // if($result = mysqli_query($conn, $sql))
// // {
// //     //echo "Success!";
// // }
// // else
// // {
// //     //echo "Fatal error!";
// // }


?>