<?php
header('Content-Type:application/json;charset=utf8');
require('init.php');
$sql="SELECT * FROM comm";
$result=mysqli_query($connect,$sql);
$list = mysqli_fetch_all($result, MYSQLI_ASSOC);
echo json_encode($list);