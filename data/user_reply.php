<?php
header('Content-Type:application/json;charset=utf8');
@$rcid=$_REQUEST['rcid'] or die('{"code":2,"msg":"rcid required}');
@$reply_comment=$_REQUEST['reply_comment'] or die('{"code":3,"msg":"reply_comment required}');
@$urname=$_REQUEST['urname'] or die('{"code":4,"msg":"urname required}');
$reply_time = date("Y.m.d",time());
require('init.php');
$sql="INSERT INTO reply VALUES(NULL,'$reply_comment','$urname','$rcid')";
$result=mysqli_query($connect,$sql);
$rid=mysqli_insert_id($connect);
$output=['code'=>1,'msg'=>"导入成功",'rid'=>$rid,'reply_comment'=>$reply_comment,'urname'=>$urname,'reply_time'=>$reply_time];
echo json_encode($output);