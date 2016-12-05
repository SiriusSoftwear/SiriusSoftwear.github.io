<?php
$dbConnection = mysqli_connect('localhost', 'root', '', 'scrims.net');
$result=mysqli_query($dbConnection,"SELECT * FROM payment_data.data;")
$rows = mysqli_num_rows($result);
$query  = "INSERT INTO `scrims.net`.`payment_data` (`idnew_table`, `name`) VALUES ('2', '3dfafa');";
mysqli_query($dbConnection,"SET NAMES 'utf8'");
mysqli_query($dbConnection,$query);
?>
