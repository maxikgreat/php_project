<?php
  //login, password
  $_POST = json_decode(file_get_contents("php://input"), true);

  $logged = false;

  $login = $_POST['login'];
  $pass = $_POST['password'];
  
  //


  echo json_encode($logged);
?>