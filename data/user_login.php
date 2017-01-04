<?php
header('Content-Type: application/json;charset=UTF-8');
@$uname=$_REQUEST['uname'] or die('{"code":"3","msg":"uname required"}');
@$upwd=$_REQUEST['upwd'] or die('{"code":"4","msg":"upwd required"}');
require('init.php');
$sql="SELECT * FROM udata WHERE uname='$uname' AND upwd='$upwd'";
$result=mysqli_query($connect,$sql);

$row = mysqli_fetch_assoc($result);
if($row===null){    //查询结果集中没有记录
  $output=['code'=>2,'msg'=>'用户名或密码错误'];
}else {  //查询结果集中有数据,验证成功
  $output = ['code'=>1,'uname'=>$uname,'uid'=>$row['uid']];
}
echo json_encode($output);
