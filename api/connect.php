<?php
  $servername = "127.0.0.1:8889";
  $username = "root";
  $password = "root";
  $dbname = "php_project";

  // Create connection
  $conn = new mysqli($servername, $username, $password, $dbname);

  // Check connection
  if ($conn->connect_error) {
    die();
    echo json_encode($conn->connect_error);
  }
?>