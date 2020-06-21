<?php


//Take uploaded quiz id
// $sql = "SELECT id FROM quiz ORDER BY id DESC LIMIT 1";
// $result = mysqli_query($conn, $sql);
// $row = mysqli_fetch_assoc($result);
// $quiz_id = $row[id];








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

  require_once './connect.php';

  $_POST = json_decode(file_get_contents("php://input"), true);

  $quiz = $_POST['quizTitle']; 
  $desc = $_POST['quizDesc'];
  $date = $_POST['quizDate'];
  $amount = sizeof($_POST['questions']);

  $sql = "INSERT INTO quiz (name, description, date, question_amount) VALUES ('$quiz', '$desc', '$date', '$amount')";

  if ($result = mysqli_query($conn, $sql))
  {
    echo json_encode($result);
  }
  else
  {
    echo json_encode($result);
  }

//Take uploaded quiz id
$sql = "SELECT id FROM quiz ORDER BY id DESC LIMIT 1";
$result = mysqli_query($conn, $sql);
$row = mysqli_fetch_assoc($result);
$quiz_id = $row[id];

  $questions = $_POST['questions'];
  foreach ($questions as $item) {
    $question = $item['question'];
    $answer_1 = $item['answer1'];
    $answer_2 = $item['answer2'];
    $answer_3 = $item['answer3'];
    $answer_4 = $item['answer4'];
    $rightanswer = $item['rightAnswer'];
    $sql = "INSERT INTO questions (question, quiz_id, correct_answer_id, answer_1, answer_2, answer_3, answer_4) VALUES ('$question', '$quiz_id', '$rightanswer', '$answer_1', '$answer_2', '$answer_3', '$answer_4')";
    mysqli_query($conn, $sql);
  }
?>
