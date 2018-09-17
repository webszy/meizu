<?php
header("Content-type: text/html; charset=utf-8");
// 指定允许其他域名访问,解决CROS
header('Access-Control-Allow-Origin:*');
// 响应类型
header('Access-Control-Allow-Methods:POST');
// 响应头设置
header('Access-Control-Allow-Headers:x-requested-with,content-type');

	$username=$_POST["username"];
	//建立连接
		$conn = mysql_connect("localhost","root","123");
	if($conn){
			//选择数据库
			mysql_select_db("meizu",$conn);
			//执行SQL
		  $sqlstr="select IFNULL(sum(goodcount),0) from user_cart where username='".$username."'";
		  $result= mysql_query($sqlstr);
           $rows =mysql_num_rows($result);
            if($rows>0){
				// $query_row = mysql_fetch_array($result);
				// echo $query_row[0];
				echo mysql_result($result, 0, 0);//第1行第1列
            };
			//断开连接
            mysql_close($conn);
	}else{
		echo '连接数据库失败';
	};
?>