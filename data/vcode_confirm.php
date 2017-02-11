<?php
/***
*接收客户端提交的注册信息，验证提交的随机验证码是否有效
*若有效，则保存入数据库
*/
header("Content-Type: application/json");

//@$n = $_REQUEST['uname'] or die('{"code":-2, "msg":"uname required"}');
//@$p = $_REQUEST['upwd'] or die('{"code":-3, "msg":"upwd required"}');
@$v = $_REQUEST['vcode'] or die('{"code":-4, "msg":"vcode required"}');
session_start();
$vs = $_SESSION['vcode_in_server'];
//判断客户端提交的验证码与服务器端保存验证码是否一致
if(strtoupper($v)!==strtoupper($vs)){
   die('{"code":-1,"msg":"验证码错误"}');
}

//所有的验证通过了，开始执行数据库INSERT
//INSERT INTO user VALUES(NULL, '$n', '$p');

$output = [
    'code'=>1,
    'msg'=>'验证通过',
    'request'=>$_REQUEST,
    'session'=>$_SESSION
];
echo json_encode($output);