<?php
header('Content-Type: text/plain');

//$_REQUEST数组中保存着客户端提交的文本数据，没有文件
//var_dump($_REQUEST);
//$_FILES数组中保存着客户端上传的文件数据
//var_dump($_FILES);

//获取客户端上传的文件的后缀名，构建一个服务器可用的随机文件名
$fname = $_FILES['pic1']['name']; //文件在客户端的名称
$suffix = substr($fname, strrpos($fname,'.'));
$randName = uniqid().$suffix;
$randName = 'img/headpic/'.$randName;

//把客户端上传的文件从服务器的临时目录转移到项目目录下
move_uploaded_file($_FILES['pic1']['tmp_name'], $randName);


//把用户注册信息保存入数据库
//$sql = "INSERT INTO user VALUES(NULL,'$n', '$p', '$randName')";
echo $randName;



