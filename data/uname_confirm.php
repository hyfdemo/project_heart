<?php
header('Content-Type:application/json;charset=utf8');
@$uname=$_REQUEST['uname'] or die ('{"code":2,"msg":"uname reuqired"}');
require('init.php');
$sql="SELECT uname FROM udata WHERE uname='$uname'";
$result=mysqli_query($connect,$sql);
$row=mysqli_fetch_row($result);
if($row!==null){
  $output=['code'=>0,'msg'=>'该用户名已存在'];
//  echo json_encode($output);
//  die();
}else{
    $output=['code'=>1,'msg'=>'该用户名可用'];
}
  echo json_encode($output);
