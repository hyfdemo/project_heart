if (window.jQuery === undefined) { 
    throw new Error('carousel插件库依赖jQuery'); 
}
jQuery.fn.carousel = function (all, interval, wait,num) {
    var timer = null,
        current = 0,    // 当前第一个子元素的索引  
        $parent = $(this),
        INTERVAL = interval || 500, // 动画时间间隔
        WAIT = wait || 1500,        // 自动移动的等待时间
        LIWIDTH = parseFloat($parent.css('width'));
    if (INTERVAL > WAIT * 0.8) {
        throw new Error('carousel插件: 动画时间间隔不能大于动画等待时间 * 0.8');
    }
    if(parseFloat($parent.css('height')) <= 0) {
        throw new Error('carousel插件: 轮播图父容器的高度不能为0');
    }
    if(all.length<num) {
        throw new Error('轮播的数量不能大于子元素的个数');
    }
    $parent.attr('data-trigger', 'carousel')
           .append($('<ul id="all">'))
           // .append($('<ul id="indexs">'))
           //  .append($('<span id="eat-left" class="glyphicon glyphicon-menu-left"></span><span id="eat-right" class="glyphicon glyphicon-menu-right pull-right"></span>'));
    var $all = $parent.children('ul:first-child'),
        $indexs = $all.next('ul');
    for (var i = 0, lis = '', idxs = ''; i < all.length; i++) {
        lis += `<li>${all[i]}</li>`; // 准备侵入所有子元素和索引
        idxs += '<li></li>';
    }
    for(var i=0;i<num;i++){
        lis += `<li>${all[i]}</li>`;
    }
    //lis += `<li>${all[0]}</li>`;     // 添加第一个子元素副本
    //lis += `<li>${all[1]}</li>`;     // 添加第二个子元素副本
    $all.html(lis).css('width', LIWIDTH/num * (all.length + num)) // 入侵子元素
         .next('#indexs').html(idxs)                          // 入侵索引
         .children('li:first-child').addClass('hover');       // 入侵完毕
    $all.children('li').css('width', LIWIDTH/num);               // 为每个子元素设置宽度

    function move(index, repeat) {
        clearTimeout(timer); // 先停止动画
        $indexs.children(`li:nth-child(${index % all.length + 1})`)
               .addClass('hover').siblings('li').removeClass('hover');  // 更改索引的样式
        $all.stop(true).animate({left: -LIWIDTH/num * index}, INTERVAL, () => {
            if ((current = index) === all.length) { // 如果移动到第二个子元素的副本时
                current = 0;          // 把当前子元素索引置为0
                $all.css('left', 0); // 把子元素组的位置还原
            }                 
        });
        repeat && autoMove();    // 先判断是否要重启滚动动画
    }
    function autoMove() {
        timer = setTimeout(() => move(++current, true), WAIT); // 自动动画
    }
    $indexs.on("mouseenter", "li", (e) => {        // 监听鼠标进入事件
            move($("#indexs>li").index(e.target)); // 移动到鼠标悬停索引的子元素
        }).on('mouseleave', 'li', () => { autoMove(); }); // 当鼠标移出时重启自动轮播

    $('div.eat-pic-box').hover(function(){
        clearTimeout(timer);
    },function(){
        autoMove();
    })
    // var clickIndex=$('#indexs>li').index($('li.hover'));
    // $('#eat-right').click(function(){
    //     clearTimeout(timer);
    //     clickIndex++;
    //     $all.css('left',(-LIWIDTH/num)*clickIndex);
    //     if(clickIndex>=all.length){
    //         clickIndex=0;
    //     }
    //     autoMove();
    // })
    // var c=0;
    // $('#eat-left').click(function(){
    //     clearTimeout(timer);
    //     c++;
    //     // clickIndex--;
    //     $all.css('left',(-LIWIDTH/num)*c);
    //     // imgs=imgs.splice(-n,n).concat(imgs)
    //     //修改$ulImgs的left为left-n*LIWIDTHd
    //     if(c>=all.length-num){
    //         all= all.splice(num,all.length-num).concat(all);
    //         c=0;
    //     }
    //     autoMove();
    // })
    autoMove();
}
