<?php
header('Content-Type:application/json;charset=utf8');
@$start=$_REQUEST['start'] or $start=1;
$list['start']=$start;
$count=5;
require('init.php');
$sql="SELECT count(*) FROM comm";
$result=mysqli_query($connect,$sql);
$row=mysqli_fetch_row($result);
$total=intval($row[0]);
$list['page']=ceil($total/$count);
$pageCount=($start-1)*$count;
$sql="SELECT * FROM comm ORDER BY cid DESC LIMIT $pageCount,$count";
$result=mysqli_query($connect,$sql);
$list['data']=mysqli_fetch_all($result,MYSQLI_ASSOC);
echo json_encode($list);