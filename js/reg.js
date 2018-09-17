// alert(document.documentElement.clientWidth)
$(function(){

    //滑动验证效果，使用ajaxLoad方法
    var isChecked=false;
    $("#password").on("keyup", function () {
        $(".checklogin").load("vaildator/index.html",function(){
            $(".checklogin").animate({
                "opacity":1
            },300);
        });
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

    $(document).on("click", function (event) {
        let e=event||window.event;
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
    //注册验证
    $("#login").click(function (e) { 
       // e.preventDefault();
        //判断用户没有加载滑动验证就点击登陆
        if($(".checklogin").html()==''){
            return ShowMsg("请全部输入后并滑动验证条后后再点击登陆");   
        }
        if($("#CaptchaID")){//已加载滑动验证
            let Isuser=$("#CaptchaID").val();
            if(!Isuser){
                SlideCheckFail();
                return ShowMsg("滑动验证失败，请重试"); 
            }
        }else{
            return  ShowMsg("用户验证模块加载失败，网络可能出错，请刷新页面重试");    
        }

        if($.trim($("#phonenum").val())!=''){//验证用户名
            let username=$.trim($("#phonenum").val());
            let phonereg=/^1[3-9]\d{9}$/;
            let namereg=/^[a-zA-Z_]\w{5,14}$/;
            if(!phonereg.test(username)){
                if(!namereg.test(username)){
                   return ShowMsg("用户名格式不正确"); 
                }
            }
            }else{
                return ShowMsg("用户名不能为空"); 
            }

            if($("#password").val()!=''){//验证密码
                let password=$("#password").val();
                let username=$.trim($("#phonenum").val());
                console.log(username,password);
                //ajax验证
                $.ajax({
                    type: "post",
                    url: "http://localhost/meizu_admin/reg.php",
                    data: "username="+username+"&password="+password,
                    dataType: "text",
                    success: function (response) {
                        $(".loading").css("display","none");
                        console.log(response);
                        if(response=="注册成功"){
                            addCookie("username",username,0);
                            console.log(document.cookie);
                            showAlert("注册成功","是否返回首页");
                        }else{
                            showAlert("注册失败",response+"，请重新注册");
                            return ShowMsg(response); 
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
       

    });


});

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