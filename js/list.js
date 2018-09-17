$(document).ready(function () {
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
         }, function () {
              // out
              $(this).find(".subMenu2").hide();
          }
        );
    //筛选链接点击永久变色效果
    $(".selector_item a").add(".filter_l a").click(function (e) { 
       // e.preventDefault();
       $(this).addClass("aHover").siblings("a").removeClass("aHover"); 
    });
    //筛选有货时模仿checkbox
    $(".filter_r").click(function (e) { 
        //e.preventDefault();
        if($("#hasStock").is(".isChecked")){
            $("#hasStock").removeClass("isChecked");
            filterbyStock(false);
        }else{
            $("#hasStock").addClass("isChecked"); 
            filterbyStock(true);
        }
    });

        $("#jiage").click(function (e) { 
            e.preventDefault();
            if($(this).is(".down")){
                $(this).removeClass("down").addClass("up");
                sortbyPrice("down");
            }else{
                $(this).removeClass("up").addClass("down");
                sortbyPrice("up"); 
            }
        });
    //商品下盒子中，点击小图片更换大图片src
    $(".phoneImgs img").live("click", function () {
      let src=this.src;
      $(this).parent().prev().css("opacity",0.4);
      $(this).parent().prev().attr("src",src);
      $(this).parent().prev().animate({
        "opacity":1
        },600);
    });

 
});
function subMenuInNavEff(str){//子菜单效果
    $(str+" li").mouseenter(function () { 
        $(str+" li").css("opacity",0.5);
        $(this).css("opacity",1);
    });

}
function getCartNum(currname) {  
    $.post("http://localhost/meizu_admin/GetCartCount.php", 
        "username="+currname,
    function (data, textStatus, jqXHR) {
        //console.log(data);
        $(".goodnum").html(parseInt(data));
    },"text"
    );
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
window.onload=function () {  
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
        getGoodList();
    }
}
//获取商品列表
function getGoodList(){
    $.post("http://localhost/meizu_admin/getGoodList.php", "123",
        function (data, textStatus, jqXHR) {
        //    console.log(JSON.parse(data));
           if(JSON.parse(data)){
                insertGoods(JSON.parse(data));
           }else{
                showAlert("错误","返回数据不是一个JSON"); 
           }
        },
        "text"
    );
}
function insertGoods(data){
    // let len=data.length;
    let htmlStr='';
    $.each(data, function (indexInArray, valueOfElement) { 
        //console.log(data[indexInArray]);
        htmlStr="<div class='phone_detail' data-stock='"+data[indexInArray].goodsCount+"'data-price='"+data[indexInArray].goodsPrice+"'>"+
        "<img src='"+data[indexInArray].goodsImg+"'class='phoneImg'/>"+
        "<div class='phoneImgs'><img src='img/16thblack.png' /><img src='img/16thplus.png' /></div>"+
        "<a href='16thplus.html' class='phone_link'> <h2>"+data[indexInArray].goodsName+"</h2>"+
        "<h3>全款预订订单按付款时间先后发货</h3>"+"<div class='phone_price'> <span>￥</span>"+
        "<span class='pr-price'>"+data[indexInArray].goodsPrice+"</span> <span >起</span> </div></a>"+
        "<p class='compare'>对比</p>";
        $(".content").append(htmlStr);
        htmlStr='';
    });
    // $(".content").append(htmlStr);
}
function filterbyStock(checked) {
    let $detail=$(".phone_detail");
    if(checked){
        $.each($detail, function (indexInArray, valueOfElement) { 
            if($detail.eq(indexInArray).attr("data-stock")=="0"){
              $detail.eq(indexInArray).hide("slow");
          }
      });
    }else{
        $.each($detail, function (indexInArray, valueOfElement) { 
            if($detail.eq(indexInArray).css("display")=="none"){
              $detail.eq(indexInArray).show("slow");
          }
      }); 
    }
  
}
function sortbyPrice(type) {
   let $datas=[];
   let $details=$(".phone_detail");
   //获取当前页面显示的商品信息
   $.each($details, function (indexInArray, valueOfElement) { 
        if($details.eq(indexInArray).css("display")=="block"){
            $datas.push($details.eq(indexInArray));
        }
   });
//    console.log($datas);
   //冒泡排序
   let returns= BubbleSort($datas,type);
 //改变DOM，用replaceWith (失败) 
 //清除当前的DOM元素，按排序后重新插入
 $(".content").empty(".phone_detail");
   $.each(returns, function (indexInArray, valueOfElement) { 
        // console.log(returns[indexInArray].attr("data-price"));
        // console.log("----------------------------------------")
        // $(".phone_detail").eq(indexInArray).replaceWith(returns[indexInArray]);
        $(".content").append(returns[indexInArray]);
   });
}
//冒泡排序
function BubbleSort(arr,type){
    for(var i=0;i<arr.length-1;i++){
        for(var j=0;j<arr.length-1-i;j++){
            if(type=="down"){
                if(parseFloat(arr[j].attr("data-price"))>parseFloat(arr[j+1].attr("data-price"))){
                    var temp = arr[j];
                    arr[j] = arr[j+1];
                    arr[j+1] = temp;
                }
            }else{
                if(parseFloat(arr[j].attr("data-price"))<parseFloat(arr[j+1].attr("data-price"))){
                    var temp = arr[j];
                    arr[j] = arr[j+1];
                    arr[j+1] = temp;
                }
            }      
        }
    }
    return arr
}