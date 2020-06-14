<?php
$servername = "127.0.0.1";
$username = "root";
$password = "";
$dbname = "php_project";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
  //echo "ponnection failed!";
}
//echo "xonnected successfully";
?>