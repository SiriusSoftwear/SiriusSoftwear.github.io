<?php
$dbConnection = mysqli_connect('localhost', 'root', '', 'scrims.net');
mysqli_query($dbConnection,"SET NAMES 'utf8'");
$query  = "$sql="insert into player  (idplayer,nameplayer,elo,password,email,nameteam) values ('100','dadadad','-1','adada','dadada','null')";";
$result = mysqli_query($dbConnection,$query);
printf($result);
?>