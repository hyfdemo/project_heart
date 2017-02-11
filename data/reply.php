<?php
header('Content-Type:application/json;charset=utf8');
require('init.php');
$sql="SELECT * FROM reply AND comm WHERE rcid=cid";
$result=mysqli_query($connect,$sql);
$list = mysqli_fetch_all($result, MYSQLI_ASSOC);
var_dump($list);
//echo json_encode($list);