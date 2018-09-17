<?php
header("Content-type: text/html; charset=utf-8");
// 指定允许其他域名访问,解决CROS
header('Access-Control-Allow-Origin:*');
// 响应类型
header('Access-Control-Allow-Methods:POST');
// 响应头设置
header('Access-Control-Allow-Headers:x-requested-with,content-type');

	//1、接受客户端的数据（用户输入的数据）
	$vipName   = $_POST['username'];
	$goodsId   = $_POST['goodsId'];
	
	//2、数据保存在数据库中
	//1）、建立连接（搭桥）
	$conn = mysql_connect("localhost","root","123");
	
	//2）、选择数据库（找目的地）
	if(!mysql_select_db("meizu",$conn)){
		die("数据库选择失败".mysql_error());
	}
	
	//3）、传输数据（过桥）
	$sqlstr = "delete from user_cart where username='".$vipName."' and goodId='".$goodsId."'";
	// die($sqlstr);
	
	if(!mysql_query($sqlstr,$conn)){
		die("执行更新SQL语句失败".mysql_error());
		echo "0";
	}
	
	//4）、关闭连接（拆桥）
	mysql_close($conn);
	
	//3、给客户端返回（响应）一个注册成功！
	echo 1; //1：表示修改成功,0：表示修改失败
?>