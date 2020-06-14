<?php
  session_start();

  //login, password
  
  require_once './connect.php';
  $_POST = json_decode(file_get_contents("php://input"), true);

  $logged = false;

  $login = $_POST['login'];
  $pass = $_POST['password'];

  $sql = "SELECT COUNT(*) FROM users WHERE `users`.`login` = '$login' &&  `users`.`password` = '$pass'";
  
  if($result = mysqli_query($conn, $sql))
  {
    $row = mysqli_fetch_assoc($result);
    if($row['COUNT(*)'] == 1)
    {
    $logged = true;
    $_SESSION['logged'] = true;
    }
  }
  
  echo json_encode($logged);
?>