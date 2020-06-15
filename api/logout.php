<?php
  session_start();
  if ($_SESSION['logged'] == true) {
    $_SESSION['logged'] = false;
    unset($_SESSION['logged']);

    session_destroy();
  }
?>