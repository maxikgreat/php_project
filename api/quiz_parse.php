<?php
require_once './connect.php';

$sql = "SELECT * FROM `quiz`";
$array = array();
$result = mysqli_query($conn, $sql);

class Quiz
{
    public $id;
    public $name;
    public $description;
    public $date;
    public $question_amount;
}



while($row = mysqli_fetch_assoc($result))
{

$obj = new Quiz();
$obj->id = $row[id];
$obj->name = $row[name];
$obj->description = $row[description];
$obj->date = $row[date];
$obj->question_amount = $row[question_amount];


array_push($array, $obj);

}

echo json_encode($array);
?>