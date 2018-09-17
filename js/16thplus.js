 $(function () {
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
    /*scrollBar*/
    $(window).bind("scroll", function (e) {
        let scrollTop=$(window).scrollTop();
        if(scrollTop>81){
            $(".head").addClass("head_fixed");
            $(".head").slideDown(500);
            if(scrollTop>300){
                $(".smallsilder").css("display","block");
            }else{
                $(".smallsilder").css("display","none");
            }
        }else{
            $(".head").removeClass("head_fixed");
        }
    });
    $(".smallsilder li").click(function (e) { 
        //e.preventDefault();
        let i=$(".smallsilder li").index(this);
        if(i==1){
            $('body,html').animate({ "scrollTop": 0 }, 500);
        }
        
    });
    //图片预览是点击底下换上面的src
    $(".imgbox_click").click(function (e) { 
       // e.preventDefault();
       $(".imgBox li:first").css("opacity",0.4);
       let src=$(this).find("img").attr("src");
       $(".imgBox li:first").find("img").attr("src",src);
       $(".imgBox li:first").animate({
        "opacity":1
        },600);
    });    
    //型号等按钮的点击加边框
    $(".choice_btn button").click(function (e) { 
        //e.preventDefault();
        $(this).addClass('buttonclicked').siblings().removeClass('buttonclicked');
        let type=$(this).html();
        $(this).parent().parent().attr("data-type",type);
        let addfei=0;
        let defaultPrice=3198;
        let $choices=$(".buttonclicked");
        $.each($choices, function (indexInArray, valueOfElement) { 
            addfei+=parseInt($choices.eq(indexInArray).attr("data-addfei"))
        });
        if(addfei<=0){
            $("#price").html(defaultPrice+'.00'); 
        }else{
            $("#price").html(defaultPrice+addfei+'.00');
        }
    });
    //数量加减
    $(".changenum").click(function (e) { 
        //e.preventDefault();
        let num=parseInt($(this).siblings("input").val());
        if($(this).is(".addBtn")){
            num++;
            if(num>=9){
                num==9;
                $(".addBtn").attr("disabled",true); 
                $(".subBtn").removeAttr("disabled");  
            }
            if(num>1){
                $(".subBtn").removeAttr("disabled"); 
            }else{
                $(".subBtn").attr("disabled",true);  
            }
            $(this).siblings("input").val(num);
        }
        if($(this).is(".subBtn")){
            num--;
            if(num<=1){
                num==1;
                $(".subBtn").attr("disabled",true);
                $(".addBtn").removeAttr("disabled"); 
            }
            $(this).siblings("input").val(num);
        }
    });
    //加入购物车
    $("#gotocart").click(function (e) { 
        //e.preventDefault();
        if(analysisCookie("username")==null){
            showAlert("请您登陆","请您登陆后购买",function () {
                window.location.href="login.html";
            });
        }else{
            let username=analysisCookie("username");
            let count=parseInt($("#boughtNum").val());
            let cid='';
            $.each($(".buttonclicked"), function (indexInArray, valueOfElement) { 
                 cid+=this.getAttribute("data-id");
            });

            if(cid.length!=5){
                showAlert("提示","规格必须全部选择");
                return false;
            }

            console.log("username="+username+"&cid="+cid+"&count="+count);
            $.post("http://localhost/meizu_admin/addToCart.php",
            "username="+username+"&cid="+cid+"&count="+count,
            function (data, textStatus, jqXHR) {
                console.log(data);
                if(data=='1'){
                    $("#layer").html("加入购物车成功");
                    myFadeInOut($("#layer"),1500);
                    getCartNum(username);
                }else{
                    $("#layer").html("加入购物车失败");
                    myFadeInOut($("#layer"),1500);
                }
            },"text");
            // uploadgoods(cid);

        }
        
    });
    //打开页面时判断cookie,获取购物车内商品数量
      if(analysisCookie("username")!=null){
        // console.log(document.cookie);
        let currname=analysisCookie("username");
        $(".icon-user").css("color","#00c3f5");
        $(".user a:first-child").attr("href","javascript:void(0)");
        $(".subMenu2 a").eq(0).attr("href","javascript:void(0)").html("用户中心");
        $(".subMenu2 a").eq(1).attr("href","javascript:exitAlert()").html("退出登陆");
        //发送ajax请求获取购物车的商品数量
        getCartNum(currname);
    }
 });
 function subMenuInNavEff(str){//子菜单效果
    $(str+" li").mouseenter(function () { 
        $(str+" li").css("opacity",0.5);
        $(this).css("opacity",1);
    });
}
function myFadeInOut($obj,time){
    $obj.animate({"opacity":0.5},time);
    setTimeout(function(){
        $obj.animate({"opacity":0},time);
    },3000)
    // $obj.html("");
}
function getCartNum(currname) {  
    $.post("http://localhost/meizu_admin/GetCartCount.php", 
        "username="+currname,
    function (data, textStatus, jqXHR) {
        // console.log(data);
        $(".goodnum").html(parseInt(data));
    },"text"
    );
}
window.onload=function(){
    var swiper2 = new Swiper('.swiper-container',{
        navigation: {
            nextEl: ' .swiper-button-next',
            prevEl: ' .swiper-button-prev'
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
        swiper2.autoplay.stop();
    });
    $(".swiper-container").mouseleave(function () { 
        swiper2.autoplay.start();
    });

      
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
function showAlert(tit,content,okFun,noFun){
    PostbirdAlertBox.confirm({
        'title': tit,
        'content': content,
        'okBtn': '确定',
        'onConfirm': (okFun!=undefined)?okFun:'',
        'onCancel':(noFun!=undefined)?noFun:''
    });
}
function uploadgoods(cid) {
    let xinghao=$(".xinghao").attr("data-type");
    let wangluo=$(".wangluo").attr("data-type");
    let yanse =$(".yanse ").attr("data-type"); 
    let neicun=$(".neicun").attr("data-type");
    let taocan=$(".taocan").attr("data-type");
    let price=parseFloat($("#price").html());
    let scount=1;//parseInt($("#boughtNum").val());
    let sendStr="goodsId="+cid+"&goodsName="+xinghao+"&goodsType="+wangluo+
    "&beiyong1="+yanse+"&beiyong2="+neicun+"&beiyong3="+taocan+
    "&goodsPrice="+price+"&goodsCount="+scount;
    console.log(sendStr);
    $.post("http://localhost/meizu_admin/saveGoods2.php", 
        sendStr,
        function (data, textStatus, jqXHR) {
            console.log(data);
        },"text"
    );   
}