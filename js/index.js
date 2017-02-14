var app = angular.module('myApp', ['ng', 'ngSanitize']);

app.run(function ($http) {
  $http.defaults.headers.post = {'Content-Type': 'application/x-www-form-urlencoded'};
});

//记NG
app.controller('noteCtrl', ['$scope', '$http', function ($scope, $http) {
  $http.get('data/notes.php?start=0').success(function (data) {
      $scope.noteList = data;
    }
  );
  $scope.load = true;
  $scope.loadMore = function () {
    $http.get('data/notes.php?start=' + $scope.noteList.length).success(function (data) {
      if (data.length < $scope.noteList.length) {
        $scope.load = false;
      }
      $scope.noteList = $scope.noteList.concat(data);
    })
  };
}]);
// $('#day1').addClass('in').siblings('.panel-heading').find('span').addClass('active');

//留言NG
app.controller('commentCtrl', ['$scope', '$http', function ($scope, $http) {
  $scope.show = true;
  $scope.hideMsg = function () {
    $scope.show = !$scope.show;
  };
  $scope.start = 1;
  $scope.update = function () {
    $http.get('data/comment.php?start=' + $scope.start).success(function (data) {
      $scope.commentList = data.data;
      $scope.commentSum = data.data[0].cid;
      $scope.page = data.page;
      $scope.start = data.start;
      var html = ` <li>
      <span class="Prev">
        &laquo;
      </span>
        </li>`;
      for (var i = 1; i <= $scope.page; i++) {
        html += `<li>
              <span class="page">${i}</span>
              </li>`;
      }
      ;
      html += `<li>
          <span class="Next">
           &raquo;
          </span>
        </li>`;
      $('ul.pagination').html(html);
      $('ul.pagination li').eq($scope.start).addClass('active');
      if ($scope.start == 1) {
        $('ul.pagination li').eq(0).addClass('disabled');
      }
      ;
      if ($scope.start == $scope.page) {
        $('ul.pagination li').eq($scope.page + 1).addClass('disabled');
      }
      ;
    });
  };

  $('ul.pagination').on('click', 'li', function () {
    var page = $(this).index();
    if (page == 0) {
      if ($scope.start == 1)return;
      $scope.start--;
    } else if (page == $scope.page + 1) {
      if ($scope.start == $scope.page)return;
      $scope.start++;
    } else {
      $scope.start = page;
    };
    $('ul.pagination li').eq($scope.start).addClass('active');
    $scope.update();
  });
  $scope.update();
  $scope.subm = function () {
    $scope.msg.ucname = sessionStorage.loginName;
    var msg = jQuery.param($scope.msg);
    $http.post('data/user_comment.php', msg).success(function (data) {
      // var  list=Array(data);
      // $scope.commentList = list.concat($scope.commentList);
      $scope.update();
    });
    $('textarea').val('');
    // location.reload(true);
  };

}]);
app.controller('replyCtrl', ['$scope', '$http', function ($scope, $http) {
  $scope.reply = false;
  $scope.showReply = function () {
    $scope.reply = !$scope.reply;
    loginConfirm();
  };
  $scope.show = false;
  $scope.subReply = function () {
    $scope.show = !$scope.show;
    $scope.rep.urname = sessionStorage.loginName;
    $scope.rep.rcid = $('.media-heading .rcid').html();
    var rep = jQuery.param($scope.rep);
    $http.post('data/user_reply.php', rep).success(function (list) {
      $scope.replyList = list;
    })
  }
}]);

function loginConfirm(){
  if (!sessionStorage.loginName) {
    $('#login-nav').parent().html(`<a id="login-nav" data-toggle="modal" href="#modal-login">登录</a>`);
    $('.subComment').prop('disabled', true);
    $('textarea').attr('placeholder', "请登录后留言！");
  } else {
    sessionStorage.loginName == 'admin'?$('.navbar-right a.writeNote').attr('href', 'note.html'):$('.navbar-right a.writeNote').attr('href','');
    $('#login-nav').parent().html(`<a id='logOut' href=''>${sessionStorage.loginName} 注销</a>`);
    $('.subComment').prop('disabled', false);
    $('textarea').attr('placeholder', "说点什么呀！");
  }
};
loginConfirm();

//模态框登录
$('#modal-login-nav').click(function () {
  var data = $('#login').serialize();
  $.ajax({
    type: 'get',
    url: 'data/user_login.php',
    data: data,
    success: function (list) {
      if (list.code === 1) {
        $('#modal-login').modal('hide');
        sessionStorage.loginName = list.uname;
        sessionStorage.loginUid = list.uid;
        loginConfirm();
        // location.reload(true);
        //$('#login-nav').parent().html(`<a id='logOut' href=''>${list.uname},注销</a>`);
      } else {
        $('#login p').html(list.msg).addClass('form-control fadeIn');
      }
    },
    error: function () {
      alert('响应完成但有问题，请检查network');
    }
  })
});

//注销
$('#logOut').click(function(e) {
  e.preventDefault();
  sessionStorage.clear();
  location.reload(true);
});

//to-top,navbar-scroll
$(window).scroll(function () {
  if ($(this).scrollTop() > 400) {
    $('#to-top').css('opacity', 1);
    $('#to-bottom').css('opacity', 1);
    $('#player1').css({'opacity': 1, 'boxShadow': '0 2px 6px rgba(0, 0, 0, 0.5)'});
    ap.play();
  } else {
    $('#to-top').css('opacity', 0);
    $('#to-bottom').css('opacity', 0);
    $('#player1').css('opacity', 0);
  }
  if ($(this).scrollTop() > 60) {
    $('.navbar-fixed-top').removeClass('nav-fade').addClass('nav-fadeout');
    $('.navbar-fixed-top a,#nav-menu .glyphicon-user').css('color', '#000');
    $('.navbar-nav.nav>li.active>a').css('color', '#F73859');
    //$('.navbar-brand').css('color','#000');
    //$('.navbar-nav.nav li:not(.active) a').css('color','#000');
    //$('.navbar-right a').css('color','#000');
  } else {
    $('div.navbar-fixed-top').removeClass('nav-fadeout').addClass('nav-fade');
    $('div.navbar-fixed-top a,#nav-menu .glyphicon-user').css('color', '');
    //$('.navbar-brand').css('color','');
    //$('.navbar-nav.nav li:not(.active) a').css('color','');
  }
  //内容淡入
  //for(var index=150;index<=1950;index+=200){
  //if($(this).scrollTop()>index){
  //  $(`#fadeout-${index}`).addClass('animated fadeInUp');
  //  }
  //}
});
//内容淡入，导航栏监听
function content(index) {
  $(window).scroll(function () {
    if ($(this).scrollTop() >= ($(index.concat('-box')).offset().top) && $(this).scrollTop() < ($(index.concat('-box')).height()) + $(index.concat('-box')).offset().top) {
      $(index.concat('-link')).addClass('active').parent('li').siblings('li').children('a.active').removeClass();
    };
    if ($(this).scrollTop() > ($(index.concat('-box')).offset().top) - 100) {
      //$("#"+index+"-title").addClass('animated fadeInUp');
      $(index.concat('-title')).addClass('animated fadeInUp');
      $(index).addClass('animated fadeInUp');
    };
  });
};
content('#ban');
content('#car');
content('#poem');
content('#visit');
content('#eat');
content('#skill');
content('#note');
content('#comment');

//导航栏跳转
function navPosition(index) {
  $(function () {
    $(index.concat('-link')).click(function (e) {
      e.preventDefault();
      $('body').animate({scrollTop: $(index.concat('-box')).offset().top}, 500);
    })
  })
}
navPosition('#ban');
navPosition('#car');
navPosition('#poem');
navPosition('#visit');
navPosition('#eat');
navPosition('#skill');
navPosition('#note');
navPosition('#comment');

$('.downArrow').click(function (e) {
  e.preventDefault();
  $('body').animate({scrollTop: $('#poem-box').offset().top}, 500);
});
$('#to-top').click(function (e) {
  e.preventDefault();
  $('body').animate({scrollTop: 0}, 800);
});
$('#to-bottom').click(function (e) {
  e.preventDefault();
  $('body').animate({scrollTop: $('body').height()}, 800);
});

//绘圆
function circle(c, lim) {
  $(window).scroll(function () {
    if ($(this).scrollTop() == 3000) {
      var w = h = 180;
      c.width = c.height = w;
      var ctx = c.getContext('2d');
      ctx.arc(90, 90, 80, 0, 2 * Math.PI);
      ctx.lineWidth = 10;
      ctx.strokeStyle = '#eee';
      ctx.stroke();
      var deg = 0, per = 0;
      var timer = setInterval(function () {
        ctx.beginPath();
        deg += Math.PI / 50;
        ctx.arc(90, 90, 80, -Math.PI / 2, -Math.PI / 2 + deg);
        ctx.lineWidth = 10;
        ctx.strokeStyle = '#F73859';
        ctx.stroke();
        ctx.clearRect(60, 60, 60, 60);
        per++;
        if (per >= lim) {
          clearInterval(timer);
        }
        ctx.font = '30px MicroSoft YaHei';
        ctx.fillText(per + '%', 65, 100);
        ctx.fillStyle = '#5bc0de';

      }, 20)
    }
  })
}
circle(circle1, 85);
circle(circle2, 85);
circle(circle3, 80);
circle(circle4, 60);

//banner

$.ajax({
  type: 'get',
  url: 'data/banners.php',
  success: function (data) {
    var html = '';
    $.each(data, function (index, obj) {
      html += `<div class="item ${obj.bName}" style="background-image: url('img/banner/${obj.bPic}');background-size: 100% 100%;">
       <div class="carousel-caption">
       <h1>${obj.bTitle}</h1>
       <h4>${obj.bContent1}</h4>
       <h4>${obj.bContent2}</h4>
     </div>
     </div>`;
    });
    $('#ban-box .carousel-inner').html(html);
    $('#ban-box .carousel-inner .item.bm').addClass('active');
    $('#ban-box .item').css({
      width: $(window).width(),
      height: $(window).height()
    });
    $('.carousel').hover(function () {
      $('.carousel .carousel-control').css('opacity', .5);
    }, function () {
      $('.carousel .carousel-control').css('opacity', 0);
    });
    if ($('#ban-box .item').hasClass('active')) {
      $('#ban-box .item').find('h1').addClass('animated fadeInDownBig');
      $('#ban-box .item').find('h4:first').addClass('animated-fast fadeInLeft delay-1').next('h4').addClass('animated-fast fadeInRight delay');
    }
  }
});


//车
$.ajax({
  type: 'get',
  url: 'data/cars.php',
  success: function (data) {
    var html1 = '', html2 = '';
    for (var i = 0; i < data.length; i++) {
      html1 += `
    <div class="col-xs-12 col-sm-6 col-md-3">
      <a href="#modal-cars" data-toggle="modal" class=${data[i].carname}>
      <div class="thumbnail">
      <img src="img/lexus/${data[i].carimg_sm}" alt=""/>
      <!--<div class="pic-mask"></div>-->
      <div class="caption">
      <span>${data[i].carname}</span>
    </div>
    </div>
    </a>
    </div>`;
      html2 += `<img class="img-responsive  item ${data[i].carname}" src="img/lexus/${data[i].carimg_lg}" alt=""/>`;
    }
    $('#lexus').html(html1);
    $('#car-lexus .carousel-inner').html(html2);
    $('div.thumbnail').hover(
      function () {
        $(this).children('.caption').addClass('animated fadeInLeft').removeClass('fadeOutRight');
      },
      function () {
        $(this).children('.caption').addClass('animated fadeOutRight').removeClass('fadeInLeft');
      }
    );
    $('#lexus a').click(function (e) {
      e.preventDefault();
      $(`#car-lexus img.${this.className}`).addClass('active').siblings('.active').removeClass('active');
    })
  }
});

//诗
$.ajax({
  type: 'get',
  url: 'data/poems.php',
  success: function (data) {
    var html = '';
    for (var i = 0; i < data.length; i++) {
      html += `        <div class="col-xs-12 col-sm-4">
          <div class="pro-caption text-center" >
            <span class="fa fa-user"></span> ${data[i].pAuthor}
            <h4>${data[i].pTitle}</h4>
              <p>${data[i].pContent1}</p>
              <p>${data[i].pContent2}</p>
              <p>${data[i].pContent3}</p>
              <p>${data[i].pContent4}</p>
            <div class="popover bottom">
              <i class="arrow"></i>
              <div class="popover-title">
                注释
              </div>
              <div class="popover-content">
                <p class="text-justify">${data[i].pDesc}</p>
              </div>
            </div>

          </div>
        </div>
`;
    }
    $('#poem').html(html);
  }
});

//游-百度地图
// function loadJScript(){
//   var script=document.createElement('script');
//   script.type='text/javascript';
//   script.src='http://api.map.baidu.com/api?v=2.0&ak=QGhGwk6zEaUzzkddGvIRbxxk6AnSRRTx&callback=init';
//   document.body.appendChild(script);
// }
// function init(){
$('#allmap').css('min-height', $(window).height() - 250);
var map = new BMap.Map('allmap', {enableMapClick: false, minZoom: 4});
var point = new BMap.Point(104.072227, 30.663456);//天府广场
map.centerAndZoom(point, 10);
map.enableScrollWheelZoom();
// 编写自定义函数,创建标记图标,标注
// function addMarker(point){
var myIcon = new BMap.Icon('img/pd.gif', new BMap.Size(30, 40));
// var marker = new BMap.Marker(point,{icon:myIcon});
// map.addOverlay(marker);
// };
map.addControl(new BMap.ScaleControl({anchor: BMAP_ANCHOR_TOP_LEFT}));// 左上角，添加比例尺
map.addControl(new BMap.NavigationControl());  //左上角，添加默认缩放平移控件
// 向地图添加标注
//   var tfgc = new BMap.Point(104.072301,30.663317);
//   var whc = new BMap.Point(104.055802,30.651751);
//   var dfct = new BMap.Point(104.034252,30.666634);
//   var jl = new BMap.Point(104.056424,30.651723);
//   var qcs = new BMap.Point(103.571786,30.911187);
//   var djy = new BMap.Point(103.620123,31.006856);
//   var xm = new BMap.Point(104.151066,30.741636);
//   var jzg = new BMap.Point(103.919275,33.148667);
// addMarker(tfgc);
// addMarker(whc);
// addMarker(dfct);
// addMarker(jl);
// addMarker(qcs);
// addMarker(djy);
// addMarker(xm);
// addMarker(jzg);
//   var MAX = 10;
var markers = [];
var data = [[104.072301, 30.663317], [104.055802, 30.651751], [104.034252, 30.666634], [104.056424, 30.651723], [103.571786, 30.911187], [103.620123, 31.006856], [104.151066, 30.741636], [103.919275, 33.148667]];//天府广场，武侯祠，杜甫草堂，锦里，青城山，都江堰，大熊猫基地，九寨沟
for (var i = 0; i < data.length; i++) {
  markers.push(new BMap.Marker(new BMap.Point(data[i][0], data[i][1]), {icon: myIcon}));
}
//最简单的用法，生成一个marker数组，然后调用markerClusterer类即可。
var markerClusterer = new BMapLib.MarkerClusterer(map, {markers: markers});
$.ajax({
  type: 'get',
  url: 'data/visit.php',
  success: function (data) {
    $.each(data, function (index, item) {
      var sContent = `<h4 style='margin:0 0 5px 0;padding:0.2em 0'>${item.vName}</h4>
    <img style='float:right;margin:4px' id='imgDemo' src='img/cd/${item.vPic}' width='300' height='200' title=${item.vName}/>
    <p style='margin:0;line-height:1.5;font-size:13px;text-indent:2em'>${item.vContent}</p>
    </div>`;
      var infoWindow = new BMap.InfoWindow(sContent);  // 创建信息窗口对象
      markers[index].addEventListener("click", function () {
        this.openInfoWindow(infoWindow);
        //图片加载完毕重绘infowindow
        document.getElementById('imgDemo').onload = function () {
          infoWindow.redraw();   //防止在网速较慢，图片未加载时，生成的信息框高度比图片的总高度小，导致图片部分被隐藏
        }
      });
    })
  }
});
// var sContent =
//     `<h4 style='margin:0 0 5px 0;padding:0.2em 0'>大熊猫繁育研究基地</h4>
//     <img style='float:right;margin:4px' id='imgDemo' src='img/cd/tfgc.jpg' width='300' height='200' title='天府广场'/>
//     <p style='margin:0;line-height:1.5;font-size:13px;text-indent:2em'>大熊猫是人见人爱的珍稀动物，世界生物多样性保护的标志，亦是和平友好的象征。成都所属的崇州、都江堰、大邑、彭州、邛崃市县等均有大熊猫出没。 成都大熊猫繁育研究基地，具有世界一流水平，位于成都北郊斧头山，距市区10公里，有一条宽阔的熊猫大道与市区相连，大熊猫博物馆内珍贵的资料、丰富的展品举世无双，是认识大熊猫、回归大自然、观光旅游、休闲娱乐的极佳场所。</p>
//     </div>`;
// var infoWindow = new BMap.InfoWindow(sContent);  // 创建信息窗口对象
// markers[0].addEventListener("click", function(){
//     this.openInfoWindow(infoWindow);
//     //图片加载完毕重绘infowindow
//     document.getElementById('imgDemo').onload = function (){
//         infoWindow.redraw();   //防止在网速较慢，图片未加载时，生成的信息框高度比图片的总高度小，导致图片部分被隐藏
//     }
// });
// }
// window.onload=loadJScript;


//食图片切换
$.ajax({
  type: 'get',
  url: 'data/eat.php',
  success: function (data) {
    var all = [];
    var html = '';
    $.each(data, function (index, item) {
      html = `<div class="eat-pic-box">
           <img src="img/food/${item.ePic}" alt=""/>
                <div class="eat-pic">
                  <h4>${item.eName}</h4>
                  <p>${item.eContent}</p>
                </div>
                </div>`;
      all.push(html);
    });
    $('#eat').carousel(all, 500, 1500, 4);
  }
});
// var all=[
//   `
//   <div class="eat-pic-box">
//   <img src="img/food/ddm.jpg" alt=""/>
//                 <div class="eat-pic">
//                   <h3>担担面</h3>
//                   <p>发生交通i卡侬穷武汉我就给你 偶i好囧我还给我合计二哦 货物企鹅偶然i亶我诶欧尼</p>
//                 </div>
//                 </div>
//   `,
//   `
//   <div class="eat-pic-box">
//   <img src="img/food/fqfp.jpg" alt=""/>
//                 <div class="eat-pic">
//                   <h3>夫妻肺片</h3>
//                   <p>发生交通i卡侬穷武汉我就给你 偶i好囧我还给我合计二哦 货物企鹅偶然i亶我诶欧尼</p>
//                 </div>
//                 </div>
//   `,
//   `
//   <div class="eat-pic-box">
//   <img src="img/food/fty.jpg" alt=""/>
//                 <div class="eat-pic">
//                   <h3>反田一</h3>
//                   <p>发生交通i卡侬穷武汉我就给你 偶i好囧我还给我合计二哦 货物企鹅偶然i亶我诶欧尼</p>
//                 </div>
//                 </div>
//   `,
//   `
//   <div class="eat-pic-box">
//   <img src="img/food/hg.jpg" alt=""/>
//                 <div class="eat-pic">
//                   <h3>火锅</h3>
//                   <p>发生交通i卡侬穷武汉我就给你 偶i好囧我还给我合计二哦 货物企鹅偶然i亶我诶欧尼</p>
//                 </div>
//                 </div>
//   `
// ];
// $('#eat').carousel(all,500,1500,4);

//记
//   $.ajax({
//   type: 'get',
//   url: 'data/notes.php?start=0',
//   success: function (data) {
//     var html = '';
//     $.each(data, function (index, obj) {
//       html += `            <div class="panel panel-info">
//               <div data-parent="#day" data-toggle="collapse" data-target="#day${obj.nid}" class="panel-heading">
//           <div class="panel-title">${obj.nTitle}
//           <span class="glyphicon glyphicon-plus pull-right"></span>
//           </div>
//               </div>
//           <div class="panel-collapse collapse" id="day${obj.nid}">
//             <div class="panel-body text-center">
//             ${obj.nPic}
//              ${obj.nContent}
//           </div>
//             <div class="panel-footer text-right">
//               <p>${obj.nTime}</p>
//             </div>
//               </div>
//             </div>
// `;
//     });
//     html += `<div class="panel panel-default">
//             <div class="panel-heading" id="loadnote">
//               <div class="panel-title">加载更多
//               </div>
//             </div>
//         </div>`;
//     $('#note #day').html(html);
//     $('#day1').addClass('in').siblings('.panel-heading').find('span').addClass('active');
//   }
// });

//+号旋转
$('.panel-group').on('click', '.panel-heading', function () {
  $(this).find('span').toggleClass('active');
  $(this).parent().siblings().find('span.active').removeClass('active');
});

//音乐播放器
var ap = new APlayer({
  element: document.getElementById('player1'),
  narrow: false,
  autoplay: false,
  showlrc: false,
  mutex: true,
  theme: '#e6d0b2',
  mode: 'random',
  preload: 'auto',
  listmaxheight: '500px',
  music: [
    {
      title: '深夜港湾',
      author: '关淑怡',
      url: 'res/关淑怡 - 深夜港湾.mp3',
      pic: 'res/2.jpg',
      lrc: ''
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
});