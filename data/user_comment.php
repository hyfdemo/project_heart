<?php
header('Content-Type:application/json;charset=utf8');
@$comment=$_REQUEST['comment'] or die('{"code":2,"msg":"comment required}');
@$ucname=$_REQUEST['ucname'] or die('{"code":3,"msg":"ucname required}');
require('init.php');
$sql="INSERT INTO comm VALUES(NULL,'$comment','$ucname')";
$result=mysqli_query($connect,$sql);
if($result){
$cid=mysqli_insert_id($connect);
$output=['code'=>1,'msg'=>"导入成功",'cid'=>$cid,'comment'=>$comment,'ucname'=>$ucname];
}
echo json_encode($output);