<?php

header("Content-type: text/html; charset=utf-8");
// 指定允许其他域名访问,解决CROS
header('Access-Control-Allow-Origin:*');
// 响应类型
header('Access-Control-Allow-Methods:POST');
// 响应头设置
header('Access-Control-Allow-Headers:x-requested-with,content-type');

$username=$_POST["username"];
$password=$_POST["password"];
//建立连接
$conn = mysql_connect("localhost","root","123");

if($conn){
    //选择数据库
    mysql_select_db("meizu",$conn);
    //执行SQL
    //1、注册前检查用户名是否存在
     $sqlstr="select * from user_info where username='".$username."'";
     //echo $sqlstr;
     $result=mysql_query($sqlstr);
     $rows=mysql_num_rows($result);
     
    if($rows>0){
        mysql_close($conn);
        die( '用户名已存在');	
    };
    
  $sqlstr="insert into user_info(username,password) values('".$username."','".$password."')";
  mysql_query($sqlstr);
  //注册后检查是否写入成功
   $sqlstr="select username from user_info where username='".$username."' and password='".$password."'";
   $result= mysql_query($sqlstr);
   $rows =mysql_num_rows($result);

    //输出结果
    if($rows>0){
        echo '注册成功';
    }else{
        echo '注册失败';
    };
    //断开连接
    mysql_close($conn);
}else{
    echo '连接数据库失败'.mysql_error();
};

?>