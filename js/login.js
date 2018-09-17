// alert(document.documentElement.clientWidth)
$(function(){
    //右上角点击二维码切换二维码登录效果
    $("#ysj").toggle(function(){
        $("#ysj").attr("src","img/login_pc.png");
        $(".loginBySMS").hide();
        $(".checklogin").hide();
        $(".inputs").attr
        $.each($(".inputs"), function (indexInArray, valueOfElement) { 
             if($.trim($(".inputs").eq(indexInArray).val())!=''){
                $(".inputs").eq(indexInArray).val('');
             }
        });
        $(".qrlogin").show(100);
    },function () {  
        $("#ysj").attr("src","img/login_qr.png");
        $(".loginBySMS").hide();
        $(".checklogin").hide();
        $(".tit a:first-child").addClass("titblue").siblings().removeClass("titblue");
        $.each($(".inputs"), function (indexInArray, valueOfElement) { 
            if($.trim($(".inputs").eq(indexInArray).val())!=''){
               $(".inputs").eq(indexInArray).val('');
            }
       });
        $(".qrlogin").hide(100);
    });
    //点击上方连接，切换登录方式
    $(".tit a").click(function (e) { 
        e.preventDefault();
        //  $(".tit a").removeClass("titblue");
       
        $(this).addClass("titblue").siblings().removeClass("titblue");
       // $(this).attr("data-checked",1);
       $.each($(".inputs"), function (indexInArray, valueOfElement) { 
        if($.trim($(".inputs").eq(indexInArray).val())!=''){
           $(".inputs").eq(indexInArray).val('');
        }
         });
        if($(this).text()=="验证码登录"){
            $(".loginBySMS").show().animate({
                "left":0
            },500);
            $(".tit").attr("data-type","code");
        }else{
            $(".loginBySMS").hide().css({
                "left":340
            },500);
            $(".tit").attr("data-type","name");
        }
    });
    //滑动验证效果，使用ajaxLoad方法
    var isChecked=false;
    $("#password").on("keyup", function () {
        $(".checklogin").load("vaildator/index.html",function(){
            $(".checklogin").animate({
                "opacity":1
            },300);
        });
    });
    //点击发送验证码后的倒计时效果
    $(".loginBySMS a").click(function (e) { 
        e.preventDefault();
        let num=60;
        let innerTimer=setInterval(
            function() {
            num--;
            if(num<=0){
                $(".loginBySMS a").text("获取验证码");
                clearInterval(innerTimer);  
                return;
            }
            $(".loginBySMS a").text(num+"秒后重新获取");
        },1000);
    });
    //国际区号选择框
    $("#areacode").click(function (e) { 
        e.preventDefault();
        $(".phoneCode").show(function(){
            $(".phoneCode li").click(function(){
                // console.log($(this).attr("data-code"));
                $("#areacode").html($(this).attr("data-code"));
                $(".phoneCode").hide(function(){
                    $(".phoneCode li").click(null);
                });
            });

        });
    });
    // let bodyclick=function(event){
    //     let e=event||window.event;

    // }
    $(document).on("click", function (event) {
        let e=event||window.event;
        //console.log(e);
        if(e.target.className!="phoneCode"&&e.target.id!="areacode"){
            $(".phoneCode").hide(function(){
                $(".phoneCode li").click(null);
            });
        }
    });
    //错误提示框
    let ShowMsg=function(str){
        $("#login_msg").text(str);
        $("#login_msg").show(500);
        setTimeout(function(){
            $("#login_msg").hide(1000);
        },3000);
    };
    //底部语言选择框
    $("#lang").toggle(function(event) {
        let e=event||window.event;
        e.preventDefault();
        $(".lang").css("display","block"); 
     },function(event) {
        let e=event||window.event;
        e.preventDefault();
        $(".lang").css("display","none"); 
     });
    //登陆验证
    $("#login").click(function (e) { 
        //e.preventDefault();
        //判断用户没有加载滑动验证就点击登陆
        if($(".checklogin").html()==''){
            return ShowMsg("请全部输入后并滑动验证条后后再点击登陆"); 
        }

        if($("#CaptchaID")){//已加载滑动验证
            let Isuser=parseInt($("#CaptchaID").val());
            if(!Isuser){
                SlideCheckFail();
                return ShowMsg("滑动验证失败，请重试"); 
            }
        }else{
            return  ShowMsg("用户验证模块加载失败，网络可能出错，请刷新页面重试");    
        }
        if($(".tit").attr("data-type")=='name'){//账号密码登陆
            if($.trim($("#username").val())!=''){//验证用户名
                let username=$.trim($("#username").val());
                let phonereg=/^1[3-9]\d{9}$/;
                let namereg=/^[a-zA-Z_]\w{5,14}$/;
                if(!phonereg.test(username)){
                    if(!namereg.test(username)){
                       return ShowMsg("用户名不正确"); 
                    }
                }
            }else{
                return ShowMsg("用户名不能为空"); 
            }
            if($("#password").val()!=''){//验证密码
                let password=$("#password").val();
                let username=$.trim($("#username").val());
                console.log(username,password);
                //ajax验证
                $.ajax({
                    type: "post",
                    url: "http://localhost/meizu_admin/login.php",
                    data: "username="+username+"&password="+password,
                    dataType: "text",
                    success: function (response) {
                        console.log(response);
                        $(".loading").css("display","none");
                        if(response=="登陆成功"){
                            if($(".rember input").is(':checked')){
                                addCookie("username",username,7);
                                showAlert("登陆成功","是否返回首页");
                            }else{
                                showAlert("登陆成功","是否返回首页");
                                addCookie("username",username,0);
                            }
                        }else{
                            showAlert("登陆失败","用户名与密码不匹配");
                        }
                    },
                    beforeSend:function(){
                        $(".loading").css("display","block");
                    }
                });
                //加载登陆成功的函数，保存cookie用户名用以判断是否登陆成功
                //return ShowMsg("login by username successful");
            }else{
                return ShowMsg("密码不能为空"); 
            }  
        }else{ //手机号登陆
            if($.trim($("#phonenum").val())!=''){//验证手机号
                let phonereg=/^1[3-9]\d{9}$/;
                let phonenum=$.trim($("#phonenum").val());
                if(phonereg.test(phonenum)){
                    let smstext=$.trim($("#smstext").val());
                    if(smstext.length==6){
                        ShowMsg("login by SMS successful");
                        //加载登陆成功的函数，保存cookie用户名用以判断是否登陆成功
                    }
                }
            }

        }
       

    });

});
function addCookie(item,value,dayCount){//添加Cookie
	var d = new Date();
    if(dayCount==undefined||dayCount==0){
        d.setDate(d.getMinutes()+10);
    }else{
        d.setDate(d.getDate()+dayCount);
    }	
    document.cookie = item+"="+escape(value)+";expires="+d.toGMTString();
}
function showAlert(tit,content){
    PostbirdAlertBox.confirm({
        'title': tit,
        'content': content,
        'okBtn': '确定',
        'onConfirm': function () {
            $(".inputs").val("");
            if(tit.indexOf("成功")>=0){
                window.location.href="index.html";
            }
        },'onCancel': function () {
            $(".inputs").val("");
        }
    });
}