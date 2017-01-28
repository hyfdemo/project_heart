<?php
header('Content-Type: image/png');

//在服务器端内存中生成一张随机验证码图片
$w = 110;
$h = 34;
$img = imagecreatetruecolor($w, $h);

//为图片生成随机的背景颜色——绘制矩形
$c = imagecolorallocate($img,rand(180,240),rand(180,240),rand(180,240));
imagefilledrectangle($img,0,0,$w, $h, $c);

//绘制四个随机的字符
$pool = 'ABCEFGHJKLMNPQRSTWXY23456789';
$vcode = '';
for($i=0; $i<4; $i++){
  $s = $pool[rand(0, strlen($pool)-1)]; //随机字符
  $vcode .= $s; //保存所有的字符
  $fs = rand(12, 24); //随机的字体大小
  $an = rand(-45,45); //随机旋转角度
  $x = $i*20+20;   //每个字符的X坐标
  $y = rand(18, 28); //每个字符的Y坐标
  $c = imagecolorallocate($img,rand(80,180),rand(80,180),rand(80,180));
  $font = 'simhei.ttf';
  imagettftext($img,$fs,$an,$x,$y,$c,$font,$s);
}
//为了在下一个页面：register.php页面使用该验证，判断用户输入是否正确
//必须把此处生成的随机验证码保存在当前客户端所对应的session空间中
session_start();
$_SESSION['vcode_in_server'] = $vcode;



//绘制5条随机干扰线
for($i=0; $i<5; $i++){
  $c = imagecolorallocate($img,rand(20,240),rand(20,240),rand(20,240));
  imageline($img, rand(0,$w),rand(0,$h),rand(0,$w),rand(0,$h),$c);
}

//绘制50个杂色点——半径为1的圆
for($i=0; $i<50; $i++){
  $c = imagecolorallocate($img,rand(20,240),rand(20,240),rand(20,240));
  imagearc($img,rand(0,$w),rand(0,$h),1,1,0,360,$c);
}


//把服务器内存中的图片输出给客户端
imagepng($img);
//从服务器内存中删除图片
imagedestroy($img);
