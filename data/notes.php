<?php
header('ConTent-Type:application/json');
require('init.php');
@$start=$_REQUEST['start'] or $start=0;
$count=5;
//$note=($start-1)*$count;
$sql="SELECT * FROM notes ORDER BY nid DESC LIMIT $start,$count";
$result= mysqli_query($connect,$sql);
$list = mysqli_fetch_all($result,MYSQLI_ASSOC);
echo json_encode($list);