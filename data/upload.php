<?php
header('Content-Type: text/plain;');
header('Location:../index.html');
//$_REQUEST数组中保存着客户端提交的文本数据，没有文件
//var_dump($_REQUEST);
//$_FILES数组中保存着客户端上传的文件数据
//var_dump($_FILES);
$nTitle=$_REQUEST['nTitle'];
$nTime=$_REQUEST['nTime'];
$nContent=$_REQUEST['nContent'];

//获取客户端上传的文件的后缀名，构建一个服务器可用的随机文件名
$pname = $_FILES['nPic']['name']; //文件在客户端的名称
if($pname==null){
$nPic='';
}else{
$suffix = substr($pname, strrpos($pname,'.'));
$randName = uniqid().$suffix;
$randName = '../img/note/'.$randName;
//把客户端上传的文件从服务器的临时目录转移到项目目录下
move_uploaded_file($_FILES['nPic']['tmp_name'],$randName);
//把用户注册信息保存入数据库
$pic=substr($randName,stripos($randName,'i'));
$nPic="<img src=$pic>";
};
echo $nPic;
$list=explode("\r\n", $nContent);
$content='';
foreach($list as $value){
$content.= "<p>$value</p>";
};
require('init.php');
$sql = "INSERT INTO notes VALUES(NULL,'$nTitle', '$nPic', '$content','$nTime')";
mysqli_query($connect,$sql);



