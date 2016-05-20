-- MySQL dump 10.13  Distrib 5.7.10, for osx10.10 (x86_64)
--
-- Host: localhost    Database: szfp
-- ------------------------------------------------------
-- Server version	5.7.10
DROP DATABASE IF EXISTS `szfp`;
CREATE DATABASE `szfp`;
use `szfp`;

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
-- Table structure for table `orders`
--


DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `orders` (
  `order_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `amount` float(9,2) DEFAULT NULL,
  `order_date` DATETIME NOT NULL CURRENT_TIMESTAMP,
  `status` varchar(255) NOT NULL,
  `discount_code` varchar(255) NULL,
  `addressline1` varchar(255) NOT NULL,
  `addressline2` varchar(255) NULL,
  `city` varchar(255) NOT NULL,
  `state` varchar(2) NOT NULL,
  `po_box` varchar(255) NOT NULL,
  `cc_token` varchar(255) NOT NULL,
  PRIMARY KEY (`order_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT UNIQUE,
  `firstname` varchar(255) NOT NULL,
  `lastname` varchar(255) NOT NULL,
  `join_date` DATETIME NOT NULL CURRENT_TIMESTAMP,
  `username` varchar(255) NOT NULL,
  `fb_social_id` varchar(255) NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`user_id`)

) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;


--
-- Table structure for table `order_items`
--

DROP TABLE IF EXISTS `order_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `order_items` (
  `item_id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL

) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;


--
-- Table structure for table `item_details`
--

DROP TABLE IF EXISTS `item_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `item_details` (
  `item_id` int(11) NOT NULL AUTO_INCREMENT UNIQUE,
  `description` varchar(255) NOT NULL,
  `price` float(9,2) NOT NULL,
  `item_name` varchar(255) NOT NULL,
  PRIMARY KEY (`item_id`)

) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `cart`
--

DROP TABLE IF EXISTS `cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cart` (
  `cart_id` int(11) NOT NULL AUTO_INCREMENT UNIQUE,
  `user_id` int(255) NOT NULL,
  PRIMARY KEY (`cart_id`)

) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `cart_items`
--

DROP TABLE IF EXISTS `cart_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cart_items` (
  `cart_id` int(11) NOT NULL,
  `item_id` int(255) NOT NULL

) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;




-- Other things


/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-05-17 22:47:56

ALTER TABLE orders
ADD FOREIGN KEY (user_id)
REFERENCES users (user_id);

ALTER TABLE order_items
ADD FOREIGN KEY (order_id)
REFERENCES orders (order_id);

ALTER TABLE order_items
ADD FOREIGN KEY (item_id)
REFERENCES item_details (item_id);

ALTER TABLE cart_items
ADD FOREIGN KEY (item_id)
REFERENCES item_details (item_id);

ALTER TABLE cart
ADD FOREIGN KEY (cart_id)
REFERENCES users (user_id);