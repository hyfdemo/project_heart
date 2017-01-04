if(!sessionStorage.loginName){
  $('#login-nav').parent().html(`<a id="login-nav" data-toggle="modal" href="#modal-login">登录</a>`);
}else{
  $('#login-nav').parent().html(`<a id='logOut' href=''>${sessionStorage.loginName},注销</a>`);
}
//绘圆
function circle(c,lim) {
  $(window).scroll(function() {
    if($(this).scrollTop()==1600) {
      var w = h = 220;
      c.width = c.height = w;
      var ctx = c.getContext('2d');
      ctx.arc(110, 110, 100, 0, 2 * Math.PI);
      ctx.lineWidth = 10;
      ctx.strokeStyle = '#eee';
      ctx.stroke();
      var deg = 0, per = 0;
      var timer = setInterval(function () {
        ctx.beginPath();
        deg += Math.PI / 50;
        ctx.arc(110, 110, 100, -Math.PI / 2, -Math.PI / 2 + deg);
        ctx.lineWidth = 10;
        ctx.strokeStyle = '#F73859';
        ctx.stroke();
        ctx.clearRect(90, 80, 60, 50);
        per++;
        if (per >= lim) {
          clearInterval(timer);
        }
        ctx.font = '30px MicroSoft YaHei';
        ctx.fillText(per + '%', 90, 110);
        ctx.fillStyle = '#5bc0de';

      }, 10)
    }
  })
};
  circle(circle1,75);
  circle(circle2,80);
  circle(circle3,88);
  circle(circle4,60);

//+号旋转
$('div.panel-title').click(function(){
  $(this).children('span').toggleClass('active');
});
//to-top,navbar-scroll
$(window).scroll(function(){
  if($(this).scrollTop()>500){
    $('#to-top').show();
  }else{
    $('#to-top').hide();
  }
  if($(this).scrollTop()>50){
    $('div.navbar').removeClass('nav-fade').addClass('nav-fadeout');
  }else{
    $('div.navbar').removeClass('nav-fadeout').addClass('nav-fade');
  }
  //内容淡入
  for(var index=150;index<=1950;index+=200){
  if($(this).scrollTop()>index){
    $(`#fadeout-${index}`).addClass('animated fadeInUp');
    }
  }
})
//模态框登录

$('#modal-login-nav').click(function(){
  var data=$('#login').serialize();
  $.ajax({
    type:'get',
    url:'data/user_login.php',
    data:data,
    success:function(list){
      if(list.code===1){
        $('#modal-login').modal('hide');
        sessionStorage.loginName=list.uname;
        sessionStorage.loginUid=list.uid;
        location.reload(true);
        //$('#login-nav').parent().html(`<a id='logOut' href=''>${list.uname},注销</a>`);
      }else{
        $('#login p').html(list.msg).addClass('form-control fadeIn');
      }
    },
    error:function(){
      alert('响应完成但有问题，请检查network');
    }
  })
})
//注销
$('#logOut').click(function(e){
  e.preventDefault();
  sessionStorage.clear();
  location.reload(true);
})
//导航栏登录注册位置
  $('#nav-menu>ul.list-inline').css('marginTop','');

