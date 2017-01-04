<?php
header('Content-Type:application/json;charset=utf8');
@$uname=$_REQUEST['uname'] or die ('{"code":2,"msg":"uname reuqired"}');
@$upwd=$_REQUEST['upwd'] or die ('{"code":3,"msg":"upwd reuqired"}');
require('init.php');
$sql="INSERT INTO udata VALUES(NULL,'$uname','$upwd')";
$result=mysqli_query($connect,$sql);
$uid=mysqli_insert_id($connect);
$output=['code'=>1,'uid'=>$uid,'msg'=>'注册成功'];
 echo json_encode($output);