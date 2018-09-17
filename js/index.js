$(document).ready(function () {
    //顶部banner点击隐藏效果
    $(".add").click(function (e) { 
        e.preventDefault();
        $(".topbanner").slideUp(1000);
        $(".add").hide();
    });
    //给subMenu一个宽
    $(".subMenu").css("width",$(window).width()+'px');
    //下拉菜单移入悬浮效果
    $(".links li").mouseenter(function(){
        $(this).find('.subMenu').slideDown();
        let str="#"+$(this).find('.subMenu').attr("id");       
         subMenuInNavEff(str);
    });
    $(".links li").mouseleave(function(){
        $(this).find('.subMenu').hide();

    });
    ////////////忘用a标签了，用jq模拟一下
    let url=["http://www.baidu.com","http://www.qq.com",
    "http://www.163.com","http://www.szy.life"];
    $(".sec_menu div").on("click", function () {
      let i= $(".sec_menu div").index($(this));
        window.open(url[i]);
    });
    //////////选项卡
    $('.title-list li').mouseenter(function () {
        var liindex = $('.title-list li').index(this);
        $(this).addClass('sec5_hover').siblings().removeClass('sec5_hover');
        $('.product-wrap .product').eq(liindex).fadeIn(150).siblings('.product').hide();
    });
    ////////侧边栏划入效果
    $(".slide_second").mouseenter(function () { 
        $(".slide_second p").show().animate({
            "top":0       
        },500); 
    });
    $(".slide_second").mouseleave(function () { 
        $(".slide_second p").hide(500).css("top",30);

    });
    ////回到顶部效果
    $("#slide_last").click(function (e) { 
        e.preventDefault();
        $('body,html').animate({ "scrollTop": 0 }, 500);
        // return false;
    });
    $(document).scroll(function () { 
        let scrollTop =  document.documentElement.scrollTop || document.body.scrollTop ;
        // console.log(scrollTop);
        if(scrollTop>600){
            $(".slideBar").show();
        }else{
            $(".slideBar").hide(); 
        }
    });
    ///登录框下拉效果
    $(".user").hover(function () {
            // over
            $(this).find(".subMenu2").slideDown();

            // subMenuInNavEff("#subMenu_login");
        }, function () {
            // out
            $(this).find(".subMenu2").hide();
        }
    );

});
function subMenuInNavEff(str){//子菜单效果
    $(str+" li").mouseenter(function () { 
        $(str+" li").css("opacity",0.5);
        $(this).css("opacity",1);
    });

}
window.onload=function(){

    var swiper = new Swiper('#gellay .swiper-container',{
        navigation: {
            nextEl: '#gellay .swiper-button-next',
            prevEl: '#gellay .swiper-button-prev'
        }, 
        pagination: {
            el: '#gellay swiper-pagination ',
            clickable: true
        },
        effect:"fade",
        loop: true,
        autoplay:true,
        spaceBetween: 200,
        speed:1500
    });

    var swiper2 = new Swiper('.sec2 .swiper-container',{
        navigation: {
            nextEl: '.sec2 .swiper-button-next',
            prevEl: '.sec2 .swiper-button-prev'
        }, 
        slidesPerView: 5,
        spaceBetween: 10,
        slidesPerGroup: 5,
        loop: true,
        loopFillGroupWithBlank: false,
        autoplay:true,
        speed:1000
    });
    //swiper鼠标进入时停止轮播，移出自动开始
    $(".swiper-container").mouseenter(function () { 
        swiper.autoplay.stop();
        swiper2.autoplay.stop();
    });
    $(".swiper-container").mouseleave(function () { 
        swiper.autoplay.start();
        swiper2.autoplay.start();
    });
  
    window.onresize=function(){
        $(".subMenu").css("width",$(window).width()+'px');
    }
    //cookie判断
    if(analysisCookie("username")!=null){
        // console.log(document.cookie);
        let currname=analysisCookie("username");
        $(".icon-user").css("color","#00c3f5");
        $(".user a:first-child").attr("href","javascript:void(0)");
        $(".subMenu2 a").eq(0).attr("href","javascript:void(0)").html("用户中心");
        $(".subMenu2 a").eq(1).attr("href","javascript:exitAlert()").html("退出登陆");
        //发送ajax请求获取购物车的商品数量
        $.post("http://localhost/meizu_admin/GetCartCount.php", 
                "username="+currname,
            function (data, textStatus, jqXHR) {
               $(".goodnum").html(parseInt(data));
            },
            "text"
        );
    }
}
function exitAlert(){
    PostbirdAlertBox.confirm({
        'title': "确认退出",
        'content': "您确认要退出吗？",
        'okBtn': '确定',
        'onConfirm': function () {
            removeCookie("username");
            location.reload();
        }
    });
}