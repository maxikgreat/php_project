<?php
require_once './connect.php';

$_POST = json_decode(file_get_contents("php://input"), true);

$sql = "SELECT * FROM `questions` where quiz_id = " . "{$_POST['id']}";
$array = array();
$result = mysqli_query($conn, $sql);

class questions
{
    public $id;
    public $question;
    public $quiz_id;
    public $correct_answer_id;
    public $answer_1;
    public $answer_2;
    public $answer_3;
    public $answer_4;
}



while($row = mysqli_fetch_assoc($result))
{

$obj = new questions();
$obj->id = $row[id];
$obj->question = $row[question];
$obj->quiz_id = $row[quiz_id];
$obj->correct_answer_id = $row[correct_answer_id];
$obj->answer_1 = $row[answer_1];
$obj->answer_2 = $row[answer_2];
$obj->answer_3 = $row[answer_3];
$obj->answer_4 = $row[answer_4];


array_push($array, $obj);

}

echo json_encode($array);
?>