-- MySQL dump 10.13  Distrib 5.5.53, for Win32 (AMD64)
--
-- Host: localhost    Database: meizu
-- ------------------------------------------------------
-- Server version	5.5.53

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `goodsinfo`
--

DROP TABLE IF EXISTS `goodsinfo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `goodsinfo` (
  `goodsId` varchar(10) NOT NULL,
  `goodsName` varchar(100) DEFAULT NULL,
  `goodsType` varchar(20) DEFAULT NULL,
  `goodsPrice` float DEFAULT NULL,
  `goodsCount` int(11) DEFAULT NULL,
  `goodsDesc` varchar(100) DEFAULT NULL,
  `goodsImg` varchar(100) DEFAULT NULL,
  `beiyong1` varchar(100) DEFAULT NULL,
  `beiyong2` varchar(100) DEFAULT NULL,
  `beiyong3` varchar(100) DEFAULT NULL,
  `beiyong4` varchar(100) DEFAULT NULL,
  `beiyong5` varchar(100) DEFAULT NULL,
  `beiyong6` varchar(100) DEFAULT NULL,
  `beiyong7` varchar(100) DEFAULT NULL,
  `beiyong8` varchar(100) DEFAULT NULL,
  `beiyong9` varchar(100) DEFAULT NULL,
  `beiyong10` varchar(100) DEFAULT NULL,
  `beiyong11` varchar(100) DEFAULT NULL,
  `beiyong12` varchar(100) DEFAULT NULL,
  `beiyong13` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`goodsId`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `goodsinfo`
--

LOCK TABLES `goodsinfo` WRITE;
/*!40000 ALTER TABLE `goodsinfo` DISABLE KEYS */;
INSERT INTO `goodsinfo` VALUES ('11121','魅族 16th','全网通公开版',3498,0,'','img/16thblack.png','静夜黑','8 +128G','官方标配','','','','','','','','','',''),('11111','魅族 16th','全网通公开版',3198,0,'','img/16thblack.png','静夜黑','6 +128G','官方标配','','','','','','','','','',''),('11131','魅族 16th','全网通公开版',3998,0,'','img/16thblack.png','静夜黑','8 +256G','官方标配','','','','','','','','','',''),('11132','魅族 16th','全网通公开版',4098,0,'','img/16thblack.png','静夜黑','8 +256G','碎屏保套餐','','','','','','','','','',''),('11122','魅族 16th','全网通公开版',3598,0,'','img/16thblack.png','静夜黑','8 +128G','碎屏保套餐','','','','','','','','','',''),('11112','魅族 16th','全网通公开版',3298,0,'','img/16thblack.png','静夜黑','6 +128G','碎屏保套餐','','','','','','','','','',''),('21111','魅族 16th Plus','全网通公开版',3698,0,'','img/16thblack.png','静夜黑','6 +128G','官方标配','','','','','','','','','',''),('21112','魅族 16th Plus','全网通公开版',3798,0,'','img/16thblack.png','静夜黑','6 +128G','碎屏保套餐','','','','','','','','','',''),('21121','魅族 16th Plus','全网通公开版',3998,0,'','img/16thblack.png','静夜黑','8 +128G','官方标配','','','','','','','','','',''),('21122','魅族 16th Plus','全网通公开版',4098,0,'','img/16thblack.png','静夜黑','8 +128G','碎屏保套餐','','','','','','','','','',''),('21131','魅族 16th Plus','全网通公开版',4498,0,'','img/16thblack.png','静夜黑','8+ 256G','官方标配','','','','','','','','','',''),('21132','魅族 16th Plus','全网通公开版',4598,0,'','img/16thblack.png','静夜黑','8+ 256G','碎屏保套餐','','','','','','','','','',''),('11211','魅族 16th','全网通公开版',3198,1,'','img/16th.png','远山白','6+128G','官方标配','','','','','','','','','',''),('11212','魅族 16th','全网通公开版',3298,1,'','img/16th.png','远山白','6 +128G','碎屏保套餐','','','','','','','','','',''),('11221','魅族 16th','全网通公开版',3498,1,'','img/16th.png','远山白','8 +128G','官方标配','','','','','','','','','',''),('11222','魅族 16th','全网通公开版',3598,1,'','img/16th.png','远山白','8 +128G','碎屏保套餐','','','','','','','','','',''),('11231','魅族 16th','全网通公开版',3998,1,'','img/16th.png','远山白','8 +256G','官方标配','','','','','','','','','',''),('11232','魅族 16th','全网通公开版',4098,1,'','img/16th.png','远山白','8 +256G','碎屏保套餐','','','','','','','','','',''),('21211','魅族 16th Plus','全网通公开版',3698,0,'','img/16th.png','远山白','6 +128G','官方标配','','','','','','','','','',''),('21212','魅族 16th Plus','全网通公开版',3798,1,'','img/16th.png','远山白','6 +128G','碎屏保套餐','','','','','','','','','',''),('21221','魅族 16th Plus','全网通公开版',3998,1,'','img/16th.png','远山白','8 +128G','官方标配','','','','','','','','','',''),('21222','魅族 16th Plus','全网通公开版',4098,1,'','img/16th.png','远山白','8 +128G','碎屏保套餐','','','','','','','','','',''),('21231','魅族 16th Plus','全网通公开版',4498,1,'','img/16th.png','远山白','8+ 256G','官方标配','','','','','','','','','',''),('21232','魅族 16th Plus','全网通公开版',4598,1,'','img/16th.png','远山白','8 +256G','碎屏保套餐','','','','','','','','','','');
/*!40000 ALTER TABLE `goodsinfo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_cart`
--

DROP TABLE IF EXISTS `user_cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_cart` (
  `mId` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(15) NOT NULL,
  `goodId` varchar(15) NOT NULL,
  `goodcount` int(11) NOT NULL,
  PRIMARY KEY (`mId`)
) ENGINE=MyISAM AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_cart`
--

LOCK TABLES `user_cart` WRITE;
/*!40000 ALTER TABLE `user_cart` DISABLE KEYS */;
INSERT INTO `user_cart` VALUES (10,'a123123','11211',1),(11,'a123123','11121',1);
/*!40000 ALTER TABLE `user_cart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_info`
--

DROP TABLE IF EXISTS `user_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_info` (
  `mid` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(15) NOT NULL,
  `password` varchar(15) NOT NULL,
  `phonenum` varchar(11) DEFAULT NULL,
  `custname` varchar(10) DEFAULT NULL,
  `custage` int(11) DEFAULT NULL,
  `custsex` varchar(4) DEFAULT NULL,
  PRIMARY KEY (`mid`)
) ENGINE=MyISAM AUTO_INCREMENT=19 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_info`
--

LOCK TABLES `user_info` WRITE;
/*!40000 ALTER TABLE `user_info` DISABLE KEYS */;
INSERT INTO `user_info` VALUES (1,'a123123','123456',NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `user_info` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-09-16 15:51:18
