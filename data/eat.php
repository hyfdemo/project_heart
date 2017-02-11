<?php
header('ConTent-Type:application/json');
require('init.php');
$sql="SELECT * FROM eat";
$result= mysqli_query($connect,$sql);
$list = mysqli_fetch_all($result,MYSQLI_ASSOC);
echo json_encode($list);