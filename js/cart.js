$(document).ready(function () {

    $(".numAdd").live("click", function () {//数量加一事件
        AddBtn(this);
        calcTotal(this);
    });
    $(".numSub").live("click", function () {//数量减1事件
        subBtn(this);
        calcTotal(this);
    });
    $(".num").live("keydown",function (event) {//输入数量的事件
        let e=event||window.event;
        if(e.keyCode<48||e.keyCode>57){//输入非数字便阻止
            e.preventDefault();
        }
    });
    $(".num").live("blur", function () {//离开输入框计算金额
    let num=parseInt(this.value);
    if(isNaN(num)){
        this.value=1;
        return false;
    }
    let price=$(this).parent().siblings(".good_price").children("span");
    let total=$(this).parent().siblings(".good_sum").children("span");
    total.html(parseFloat(price.html()*num));
    calcTotal();
});
    let AddBtn=function(obj){
        let num=$(obj).siblings(".num").val();
        let price=$(obj).parent().siblings(".good_price").children("span");
        let total=$(obj).parent().siblings(".good_sum").children("span");
        let gid=$(obj).parent().parent().attr("data-gid");
        let currname=analysisCookie("username");
        num++;
        if(num>=9){num=9}
        $(obj).siblings(".num").val(num); 
        total.html(parseFloat(price.html()*num));
        calcTotal();
        updateGoodNum(gid,num,currname);
    }
    let subBtn=function(obj){
        let num=parseInt($(obj).siblings(".num").val());
        let price=$(obj).parent().siblings(".good_price").children("span");
        let total=$(obj).parent().siblings(".good_sum").children("span");
        let gid=$(obj).parent().parent().attr("data-gid");
        let currname=analysisCookie("username");
        num--;
        if(num<=1){num=1}
        $(obj).siblings(".num").val(num); 
        total.html(parseFloat(price.html()*num));
        calcTotal();
        updateGoodNum(gid,num,currname);
    }
  
   //选择框
   $(".select_all").click(function (e) {//全选效果 
    //    e.preventDefault();
        let isChecked=this.checked;
    $.each($(".select_all"), function (indexInArray, valueOfElement) { 
        $(".select_all")[indexInArray].checked=isChecked;
    });
    $.each($(".good_info .checkboxs"), function (indexInArray, valueOfElement) { 
        $(".good_info .checkboxs")[indexInArray].checked=isChecked;
    });
    if($(".select_all")[0].checked){
        singelCheckBoxEvent();
    }
    calcTotal();
   });
   $(".good_info .checkboxs").live("click", function () {
        singelCheckBoxEvent();
   });
   let singelCheckBoxEvent=function(){//单选框事件
    let  $checkboxs=$(".good_info .checkboxs");
    let goodsTotal=0; 
    let status=[],hasUncheck=false;
    $.each($checkboxs, function (indexInArray, valueOfElement) {     
         if(($checkboxs)[indexInArray].checked){
             let total=$checkboxs.eq(indexInArray).siblings(".good_sum").children("span").html();
             goodsTotal+=parseFloat(total);
          }else{
            hasUncheck=true;
          }
          //status.push(($checkboxs)[indexInArray].checked);
    });
    currentGoodsTotal= $("#totalmoney").html();
    if(goodsTotal!=currentGoodsTotal){//修改总金额
        //   $("#totalmoney").html('');
        //   $("#totalmoney").html(goodsTotal);
        calcTotal();
 
    }
    //判断是否出现为选中的商品，出现则取消全选框
    //if(status.indexOf(false)>=0){
     if(hasUncheck){
        $.each($(".select_all"), function (indexInArray, valueOfElement) { 
            $(".select_all")[indexInArray].checked=false;
        }); 
    }else{
        $.each($(".select_all"), function (indexInArray, valueOfElement) { 
            $(".select_all")[indexInArray].checked=true;
        }); 
    }

    }
    //删除选中商品
    $("#removeselect").click(function (e) { 
        e.preventDefault();
        let  $checkboxs=$(".good_info .checkboxs");
        let goodsId=[];
        showAlert("操作确认","确定删除选中商品吗",function(){
            $.each($checkboxs, function (indexInArray, valueOfElement) { 
                let isCheck=$checkboxs[indexInArray];
                if(isCheck.checked){
                    goodsId.push($(isCheck).parent().attr("data-gid"));
                    $(isCheck).parent().remove();
                }
            });
            calcTotal();
            let currname=analysisCookie("username");
            deleteCartGood(goodsId,currname);
        });
    });
    //单选删除
 
});
window.onload=function(){
        //打开页面时判断cookie,获取购物车内商品数量
    let currname=analysisCookie("username");
    if(currname!=null){
        // console.log(document.cookie);
        $(".menu_notlogined").css("display","none");
        $(".menu_logined").css("display","block");
        $(".menu_logined a:eq(1)").html(currname+"的商城");
        // $(".good_info").remove();
        getCartNum(currname);
        getUserCart(currname); 
        // selectednum();
        $(".add").live("click",function (e) { 
            e.preventDefault();
            let gid=$(this).attr("data-gid");
            showAlert("操作确认","确定删除选中商品吗",function(){
                let goodsId=[];
                goodsId.push(gid);
                let currname=analysisCookie("username")
                console.log(goodsId);
                $(this).parent().remove();
                deleteCartGood(goodsId,currname);
             });
        });
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
function showAlert(tit,content,okFun,noFun){
    PostbirdAlertBox.confirm({
        'title': tit,
        'content': content,
        'okBtn': '确定',
        'onConfirm': (okFun!=undefined)?okFun:'',
        'onCancel':(noFun!=undefined)?noFun:''
    });
}
function calcTotal() {
    let good_sum=$(".good_sum").children("span");
    let goodsTotal=0;
    let ischecked=false;
    $.each(good_sum, function (indexInArray, valueOfElement) { 
        ischecked=good_sum.eq(indexInArray).parent().siblings(".checkboxs")[0].checked;
        if(ischecked){goodsTotal+=parseFloat(good_sum.eq(indexInArray).html());}  
    });
    $("#totalmoney").html(goodsTotal+'.00');
    selectednum();//获取总个数和已选择的个数
}
function getUserCart(name) {
    // $.post("http://localhost/meizu_admin/getShoppingCart.php", 
    //     "username="+name,
    //     function (data, textStatus, jqXHR) {
    //         console.log(data);
    //         insertGood(JSON.parse(data));
    //     },"text"
    // );
    $.ajax({
        type: "post",
        url: "http://localhost/meizu_admin/getShoppingCart.php",
        data: "username="+name,
        dataType: "text",
        success: function (response) {
            // console.log(response);
            if(JSON.parse(response)){
                insertGood(JSON.parse(response));
            }else{
                showAlert("错误","返回数据不是一个JSON"); 
            }    
        },
        beforeSend:function(){
            $(".loading").css("display","block");
        }
    });
}
function insertGood(data){
        let total=0,HtmlStr='';
        $.each(data, function (indexInArray, valueOfElement) { 
            total=parseFloat(data[indexInArray].goodsPrice)*parseInt(data[indexInArray].goodsCount);
            HtmlStr+="<div class='good_info' data-gid='"+data[indexInArray].goodsId+"'><input type='checkbox' class='checkboxs'/>"+
            "<img src='"+data[indexInArray].goodsImg+"'/><div class='good_intro'><h4>"+data[indexInArray].goodsName+
            "</h4><p>"+data[indexInArray].goodsType+'  '+data[indexInArray].yanse+'  '+data[indexInArray].neicun+"</p></div>"+
            "<p class='good_price'>￥<span>"+data[indexInArray].goodsPrice+'.00'+"</span></p>"+
            "<div class='good_num'><input type='button' value='+' class='numAdd btn'/>"+
            "<input type='text' class='num' value='"+data[indexInArray].goodsCount+"'/>"+
            "<input type='button' value='-' class='numSub btn'/></div>"+
            "<p class='good_sum'>￥<span>"+total+".00"+"</span></p>"+
            "<div class='add' data-gid='"+data[indexInArray].goodsId+"'><i></i><i></i></div></div>";
        });
        $(".buyBytheway").after(HtmlStr);
        calcTotal();
        $(".loading").css("display","none");
     
}
function updateGoodNum(gid,num,name) {
    if(gid.length!=5||num<0||num>9||name==""||name==undefined||name==null){
        return ;
    }    
    $.post("http://localhost/meizu_admin/updateGoodsCount.php", 
    "username="+name+"&goodsId="+gid+"&goodsCount="+num,
        function (data, textStatus, jqXHR) {
            // console.log(data);
            if(data!="1"){
                showAlert("错误","修改商品数量出错");   
            }
        },
        "text"
    );   
}
function deleteCartGood(gids,name) {
    if(name==""||name==undefined||name==null){
        return ;
    }
    let len=gids.length;
    for(let i=0;i<len;i++){
        if(gids[i].length>5){
            return;
        }
    }
    for(let i=0;i<len;i++){
        $.post("http://localhost/meizu_admin/deleteUserCart.php", 
        "username="+name+"&goodsId="+gids[i],
            function (data, textStatus, jqXHR) {
                console.log(data);
                if(data!="1"){
                    showAlert("错误","删除商品出错");   
                }else{
                    window.location.reload();
                }
            },
            "text"
        ); 
    } 
    
}
function selectednum(){
    let  $checkboxs=$(".good_info .checkboxs");
    // console.log($checkboxs);
    if($checkboxs.length==0){
        $("#totalcount").html("0");
        $("#selectcount").html("0");
    };
    let selected=0; 
    $.each($checkboxs, function (indexInArray, valueOfElement) {   
        if(($checkboxs)[indexInArray].checked){
            selected++;
        }
    });
    $("#totalcount").html($checkboxs.length);
    $("#selectcount").html(selected);
}
function getCartNum(currname) {  
    $.post("http://localhost/meizu_admin/GetCartCount.php", 
        "username="+currname,
    function (data, textStatus, jqXHR) {
        // console.log(data);
        // $(".goodnum").html(parseInt(data));
        if(parseInt(data)==0){
            $(".nogood h3").html("亲，快去挑选商品吧！")
            $(".nogood p").html("购物车内未发现宝贝，快去挑选吧！");
            $(".nogood a").attr("href","list.html");
            $(".nogood a").html("去挑选");
            $(".nogood").css("display","block");
            $(".goods").css("display","none");  
        }else{
            $(".nogood").css("display","none");
            $(".goods").css("display","block");    
        }
    },"text"
    );

}