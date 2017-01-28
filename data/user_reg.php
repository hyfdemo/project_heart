<?php
header('Content-Type:application/json;charset=utf8');
@$uname=$_REQUEST['uname'] or die ('{"code":2,"msg":"uname reuqired"}');
@$upwd=$_REQUEST['upwd'] or die ('{"code":3,"msg":"upwd reuqired"}');
@$vcode = $_REQUEST['vcode'] or die('{"code":4, "msg":"vcode required"}');
session_start();
$vs = $_SESSION['vcode_in_server'];
//判断客户端提交的验证码与服务器端保存验证码是否一致
if(strtoupper($vcode)!==strtoupper($vs)){
   die('{"code":-1,"msg":"验证码错误"}');
}
session_destroy();
require('init.php');
$sql="INSERT INTO udata VALUES(NULL,'$uname','$upwd')";
$result=mysqli_query($connect,$sql);
$uid=mysqli_insert_id($connect);
$output=['code'=>1,'uid'=>$uid,'msg'=>'验证通过'];
 echo json_encode($output);