if(!sessionStorage.loginName){
  $('#login-nav').parent().html(`<a id="login-nav" data-toggle="modal" href="#modal-login">登录</a>`);
}else{
  $('#login-nav').parent().html(`<a id='logOut' href=''>${sessionStorage.loginName},注销</a>`);
}
//绘圆
function circle(c,lim) {
  $(window).scroll(function(){
      if ($(this).scrollTop() == 3600 ) {
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
}
    circle(circle1, 75);
    circle(circle2, 80);
    circle(circle3, 88);
    circle(circle4, 60);

//+号旋转
$('.panel-group').on('click','.panel-heading',function(){
  $(this).find('span').toggleClass('active');
  $(this).parent().siblings().find('span.active').removeClass('active');
});

//音乐播放器
var ap = new APlayer({
  element: document.getElementById('player1'),
  narrow: false,
  autoplay: true,
  showlrc: false,
  mutex: true,
  theme: '#e6d0b2',
  mode: 'random',
  preload:'metadata',
  listmaxheight: '500px',
  music: [
    {
      title: '深夜港湾',
      author: '关淑怡',
      url: 'res/关淑怡 - 深夜港湾.mp3',
      pic: 'res/2.jpg',
      lrc:''
    },
    {
      title: '地尽头',
      author: '关淑怡',
      url: 'res/关淑怡 - 地尽头.mp3',
      pic: 'res/1.jpg',
      lrc: ''
    },
    {
      title: '李香兰',
      author: '张学友',
      url: 'res/张学友 - 李香兰.mp3',
      pic: 'res/3.jpg',
      lrc: ''
    },
    {
      title: '寂寞的男人',
      author: '张学友',
      url: 'res/张学友 - 寂寞的男人.mp3',
      pic: 'res/1.jpg',
      lrc: ''
    }
  ]
})

//to-top,navbar-scroll
$(window).scroll(function(){
  if($(this).scrollTop()>400){
    $('#to-top').css('opacity',1);
    $('#player1').css('opacity',1);
  }else{
    $('#to-top').css('opacity',0);
    $('#player1').css('opacity',0);
  }
  if($(this).scrollTop()>60){
    $('.navbar-fixed-top').removeClass('nav-fade').addClass('nav-fadeout');
    $('.navbar-fixed-top a,#nav-menu .glyphicon-user').css('color','#000');
    $('.navbar-nav.nav>li.active>a').css('color','#F73859');
    //$('.navbar-brand').css('color','#000');
    //$('.navbar-nav.nav li:not(.active) a').css('color','#000');
    //$('.navbar-right a').css('color','#000');
  }else{
    $('div.navbar-fixed-top').removeClass('nav-fadeout').addClass('nav-fade');
    $('div.navbar-fixed-top a,#nav-menu .glyphicon-user').css('color','');
    //$('.navbar-brand').css('color','');
    //$('.navbar-nav.nav li:not(.active) a').css('color','');
  }
  //内容淡入
  //for(var index=150;index<=1950;index+=200){
  //if($(this).scrollTop()>index){
  //  $(`#fadeout-${index}`).addClass('animated fadeInUp');
  //  }
  //}

})
//内容淡入
function content(index){
  $(window).scroll(function(){
    if($(this).scrollTop()>($(index.concat('-title')).offset().top)-200){
      //$("#"+index+"-title").addClass('animated fadeInUp');
      $(index.concat('-title')).addClass('animated fadeInUp');
      $(index).addClass('animated fadeInUp');
    }
  })
}
content('#car');
content('#poem');
content('#visit');
content('#eat');
content('#skill');
content('#note');
content('#comment');

//导航栏内容定位
function navPosition(index){
  $(window).ready(function(){
    $(index.concat('-link')).click(function(e){
      e.preventDefault();
      $('body').animate({scrollTop:$(index.concat('-title')).offset().top},500);
    })
  })
}
navPosition('#car');
navPosition('#poem');
navPosition('#visit');
navPosition('#eat');
navPosition('#skill');
navPosition('#note');
navPosition('#comment');


$('#to-top').click(function(e){
  e.preventDefault();
  $('body').animate({scrollTop:0},500);
})

//banner
$('#ban').hover(function(){
  $('#ban .carousel-control').css('opacity',.5);
},function(){
    $('#ban .carousel-control').css('opacity',0);
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

//车特效
$('div.thumbnail').hover(
  function(){
  $(this).children('.caption').addClass('animated fadeInLeft').removeClass('fadeOutRight');
},
  function(){
    $(this).children('.caption').addClass('animated fadeOutRight').removeClass('fadeInLeft');

  }
)

//留言NG
var app=angular.module('myApp',['ng']);
app.run(function($http){
  $http.defaults.headers.post={'Content-Type':'application/x-www-form-urlencoded'};
})
app.controller('myCtrl',['$scope','$http',function($scope,$http){
  $scope.show=true;
  $scope.hideMsg=function(){
    $scope.show=!$scope.show;
  }
  $http.get('data/comment.php').success(function(data){
    $scope.list=data;
  });
  $scope.subm=function(){
    $scope.msg.ucname=sessionStorage.loginName;
    var msg=jQuery.param($scope.msg);
    $http.post('data/user_comment.php',msg).success(function(data){
      $scope.list=$scope.list.concat(data);
    });
    $('textarea').val('');
    //location.reload(true);
  };
}])

//食图片翻转
var all=[
  `
  <div class="eat-pic-box">
  <img src="img/food/ddm.jpg" alt=""/>
                <div class="eat-pic">
                  <h3>担担面</h3>
                  <p>发生交通i卡侬穷武汉我就给你 偶i好囧我还给我合计二哦 货物企鹅偶然i亶我诶欧尼</p>
                </div>
                </div>
  `,
  `
  <div class="eat-pic-box">
  <img src="img/food/fqfp.jpg" alt=""/>
                <div class="eat-pic">
                  <h3>夫妻肺片</h3>
                  <p>发生交通i卡侬穷武汉我就给你 偶i好囧我还给我合计二哦 货物企鹅偶然i亶我诶欧尼</p>
                </div>
                </div>
  `,
  `
  <div class="eat-pic-box">
  <img src="img/food/fty.jpg" alt=""/>
                <div class="eat-pic">
                  <h3>反田一</h3>
                  <p>发生交通i卡侬穷武汉我就给你 偶i好囧我还给我合计二哦 货物企鹅偶然i亶我诶欧尼</p>
                </div>
                </div>
  `,
  `
  <div class="eat-pic-box">
  <img src="img/food/hg.jpg" alt=""/>
                <div class="eat-pic">
                  <h3>火锅</h3>
                  <p>发生交通i卡侬穷武汉我就给你 偶i好囧我还给我合计二哦 货物企鹅偶然i亶我诶欧尼</p>
                </div>
                </div>
  `
];
$('#eat').carousel(all,500,1500,4);
