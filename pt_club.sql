-- MariaDB dump 10.17  Distrib 10.5.5-MariaDB, for osx10.15 (x86_64)
--
-- Host: localhost    Database: pt_club
-- ------------------------------------------------------
-- Server version	10.5.5-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `addresses`
--

DROP TABLE IF EXISTS `addresses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `addresses` (
  `address_id` int(11) NOT NULL AUTO_INCREMENT,
  `street` varchar(256) DEFAULT NULL,
  `city` varchar(256) DEFAULT NULL,
  `state` varchar(256) DEFAULT NULL,
  `country` varchar(256) DEFAULT NULL,
  `post_code` varchar(16) DEFAULT NULL,
  PRIMARY KEY (`address_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `addresses`
--

LOCK TABLES `addresses` WRITE;
/*!40000 ALTER TABLE `addresses` DISABLE KEYS */;
INSERT INTO `addresses` VALUES (1,'','','','','');
/*!40000 ALTER TABLE `addresses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `admins`
--

DROP TABLE IF EXISTS `admins`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `admins` (
  `admin_id` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(50) DEFAULT NULL,
  `last_name` varchar(50) DEFAULT NULL,
  `email` varchar(256) DEFAULT NULL,
  `password_hash` char(64) DEFAULT NULL,
  PRIMARY KEY (`admin_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admins`
--

LOCK TABLES `admins` WRITE;
/*!40000 ALTER TABLE `admins` DISABLE KEYS */;
INSERT INTO `admins` VALUES (1,NULL,NULL,'kusala@adelaide.edu.au','2900d37ab85f8dadaebc4aaf93d9a86528849b04d93b22937e071b2c2fc429aa');
/*!40000 ALTER TABLE `admins` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bookings`
--

DROP TABLE IF EXISTS `bookings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `bookings` (
  `booking_id` int(11) NOT NULL AUTO_INCREMENT,
  `trainer_id` int(11) DEFAULT NULL,
  `client_id` int(11) DEFAULT NULL,
  `start_date_time` datetime DEFAULT NULL,
  `end_date_time` datetime DEFAULT NULL,
  `address_id` int(11) DEFAULT NULL,
  `booking_status` varchar(50) DEFAULT 'Pending',
  PRIMARY KEY (`booking_id`),
  KEY `trainer_id` (`trainer_id`),
  KEY `client_id` (`client_id`),
  KEY `address_id` (`address_id`),
  CONSTRAINT `bookings_ibfk_1` FOREIGN KEY (`trainer_id`) REFERENCES `trainers` (`trainer_id`),
  CONSTRAINT `bookings_ibfk_2` FOREIGN KEY (`client_id`) REFERENCES `clients` (`client_id`),
  CONSTRAINT `bookings_ibfk_3` FOREIGN KEY (`address_id`) REFERENCES `addresses` (`address_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bookings`
--

LOCK TABLES `bookings` WRITE;
/*!40000 ALTER TABLE `bookings` DISABLE KEYS */;
/*!40000 ALTER TABLE `bookings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `clients`
--

DROP TABLE IF EXISTS `clients`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `clients` (
  `client_id` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(50) DEFAULT NULL,
  `last_name` varchar(50) DEFAULT NULL,
  `email` varchar(256) DEFAULT NULL,
  `password_hash` char(64) DEFAULT NULL,
  `date_of_birth` date DEFAULT NULL,
  `gender` varchar(6) DEFAULT NULL,
  `account_status` varchar(50) DEFAULT 'Active',
  PRIMARY KEY (`client_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clients`
--

LOCK TABLES `clients` WRITE;
/*!40000 ALTER TABLE `clients` DISABLE KEYS */;
INSERT INTO `clients` VALUES (1,'Jason','Lam','jason@adelaide.edu.au','06b9a6eacd7a77b9361123fd19776455eb16b9c83426a1abbf514a414792b73f',NULL,NULL,'Suspended'),(2,'Greenland','Yu','greenland@adelaide.edu.au','f71ef5459640bf06d3b60eaa6e671d6bc868a56d72fc1ff205862995044ff28a',NULL,NULL,'Suspended'),(3,'Franky','Lu','franky@adelaide.edu.au','22737d36997eacfb0667c5b4c13aa8aa09e1520b6477ab759743da4e517e3c2e',NULL,NULL,'Active');
/*!40000 ALTER TABLE `clients` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `clients_addresses`
--

DROP TABLE IF EXISTS `clients_addresses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `clients_addresses` (
  `client_id` int(11) NOT NULL,
  `address_id` int(11) NOT NULL,
  PRIMARY KEY (`client_id`,`address_id`),
  KEY `address_id` (`address_id`),
  CONSTRAINT `clients_addresses_ibfk_1` FOREIGN KEY (`client_id`) REFERENCES `clients` (`client_id`),
  CONSTRAINT `clients_addresses_ibfk_2` FOREIGN KEY (`address_id`) REFERENCES `addresses` (`address_id`),
  CONSTRAINT `clients_addresses_ibfk_3` FOREIGN KEY (`client_id`) REFERENCES `clients` (`client_id`),
  CONSTRAINT `clients_addresses_ibfk_4` FOREIGN KEY (`address_id`) REFERENCES `addresses` (`address_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clients_addresses`
--

LOCK TABLES `clients_addresses` WRITE;
/*!40000 ALTER TABLE `clients_addresses` DISABLE KEYS */;
/*!40000 ALTER TABLE `clients_addresses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reviews`
--

DROP TABLE IF EXISTS `reviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `reviews` (
  `trainer_id` int(11) NOT NULL,
  `client_id` int(11) NOT NULL,
  `rating` int(11) DEFAULT NULL,
  `review_date_time` datetime NOT NULL DEFAULT current_timestamp(),
  `description` text NOT NULL,
  PRIMARY KEY (`trainer_id`,`client_id`,`review_date_time`),
  KEY `client_id` (`client_id`),
  CONSTRAINT `reviews_ibfk_1` FOREIGN KEY (`trainer_id`) REFERENCES `trainers` (`trainer_id`),
  CONSTRAINT `reviews_ibfk_2` FOREIGN KEY (`client_id`) REFERENCES `clients` (`client_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reviews`
--

LOCK TABLES `reviews` WRITE;
/*!40000 ALTER TABLE `reviews` DISABLE KEYS */;
/*!40000 ALTER TABLE `reviews` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `trainer_availability`
--

DROP TABLE IF EXISTS `trainer_availability`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `trainer_availability` (
  `trainer_id` int(11) NOT NULL,
  `start_date_time` datetime NOT NULL,
  `end_date_time` datetime NOT NULL,
  PRIMARY KEY (`trainer_id`,`start_date_time`,`end_date_time`),
  CONSTRAINT `trainer_availability_ibfk_1` FOREIGN KEY (`trainer_id`) REFERENCES `trainers` (`trainer_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trainer_availability`
--

LOCK TABLES `trainer_availability` WRITE;
/*!40000 ALTER TABLE `trainer_availability` DISABLE KEYS */;
/*!40000 ALTER TABLE `trainer_availability` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `trainers`
--

DROP TABLE IF EXISTS `trainers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `trainers` (
  `trainer_id` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(50) DEFAULT NULL,
  `last_name` varchar(50) DEFAULT NULL,
  `email` varchar(256) DEFAULT NULL,
  `password_hash` char(64) DEFAULT NULL,
  `biography` varchar(1500) DEFAULT NULL,
  `date_of_birth` date DEFAULT NULL,
  `gender` varchar(6) DEFAULT NULL,
  `prior_experience` varchar(256) DEFAULT NULL,
  `muscle_group` varchar(256) DEFAULT '[]',
  `languages_spoken` varchar(256) DEFAULT '[]',
  `training_location` varchar(50) DEFAULT NULL,
  `account_status` varchar(50) DEFAULT 'Awaiting Approval',
  `profile_image` varchar(64) DEFAULT 'default.jpg',
  `mobile_number` varchar(10) DEFAULT NULL,
  `hourly_rate` float DEFAULT NULL,
  `location_preference` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`trainer_id`)
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trainers`
--

LOCK TABLES `trainers` WRITE;
/*!40000 ALTER TABLE `trainers` DISABLE KEYS */;
INSERT INTO `trainers` VALUES (1,'Jason','Lam','jason@adelaide.edu.au','06b9a6eacd7a77b9361123fd19776455eb16b9c83426a1abbf514a414792b73f','We\'ve done it!','2006-05-13','Male',NULL,'[\"Abdominals\",\"Biceps\",\"Calves\",\"Deltoids\",\"Forearms\",\"Hamstrings\",\"Hips\",\"Latissimus Dorsi\",\"Lower Back\",\"Pectorals\",\"Quadriceps\",\"Trapezius\",\"Triceps\"]','[\"English\",\"Arabic\",\"Bengali\",\"Cantonese\",\"Dutch\",\"French\",\"German\",\"Hindi\",\"Indonesian\",\"Japanese\",\"Mandarin\",\"Punjabi\",\"Portuguese\",\"Russian\",\"Spanish\",\"Swahili\",\"Turkish\",\"Urdu\"]',NULL,'Suspended','default.jpg','0123456789',123,'Home Training'),(2,'Franky','Lu','franky@adelaide.edu.au','22737d36997eacfb0667c5b4c13aa8aa09e1520b6477ab759743da4e517e3c2e',NULL,'2020-01-01','Male',NULL,'[\"Calves\"]','[\"English\"]',NULL,'Active','7b88782d5a533db0970f86729f2775021602083425039.jpeg','0123456789',3,'Home training'),(3,'Deon','Mai','deon@adelaide.edu.au','02eed24081e3250a4f1c6efa2490163350746b90874a8a2a09321a49b5301302','The barber did me good','2020-01-01','Male',NULL,'[\"Abdominals\",\"Calves\",\"Forearms\",\"Hamstrings\"]','[\"Bengali\",\"English\"]',NULL,'Suspended','8a5a8a0554be2b2946187d56967dc28a1602120981131.jpeg','0123456789',1,'Home training'),(4,'Sheryl','Mourin','sheryl@adelaide.edu.au','4b5bf9adc2208877caecd323b2a514a67e05227c8bce1ecada4b589558aafefb',NULL,'2020-01-01','Female',NULL,'[]','[\"English\"]',NULL,'Active','a90681004b0d541857c3edb009ba56a71602083740677.png','0123456789',1234570,'Home training'),(5,'Edward','Tan','edward@adelaide.edu.au','2632ec06e2c2e54a52245ffd9e5af1cb65b21a4cdb031d4e11383719cf8c0ca4',NULL,NULL,NULL,NULL,'[]','[]',NULL,'Rejected','308824ba14b3ade2d4e367128de644711602083525314.jpeg','0123456789',NULL,'Home Training'),(6,'Shaun','White','shaun@adelaide.edu.au','91184a0dd41538c632dabb7326beb5f4e1cf5d35664a8651bcb8935f2876426d',NULL,NULL,NULL,NULL,'[]','[]',NULL,'Suspended','a6798bf9b0a29a154aa563d65746e3931602084391910.jpeg','0123456789',NULL,'Gym Training'),(7,'Greenland','Yu','greenland@adelaide.edu.au','f71ef5459640bf06d3b60eaa6e671d6bc868a56d72fc1ff205862995044ff28a',NULL,NULL,NULL,NULL,'[]','[]',NULL,'Suspended','44fcddd177a450f07ba434960534fb0c1602084054735.jpeg','0123456789',NULL,'Gym Training'),(8,'Georgia','Zhang','georgia@adelaide.edu.au','1c18bc2214f67ae19bbaa640fc776f5a4a38c4021d421cdd8cd3d2bcad23da93',NULL,NULL,NULL,NULL,'[]','[]',NULL,'Suspended','398183878503c69069c5e2ab885c0f7b1602083491989.jpeg','0123456789',NULL,'Gym Training'),(9,'Ben','Zhu','ben@adelaide.edu.au','6700869c8ff7480e34a70a708b028700dbaa3a033b5652b903afe89f49a31456','Naruto Uzumaki (うずまきナルト, Uzumaki Naruto) is a shinobi of Konohagakure\'s Uzumaki clan. He became the jinchūriki of the Nine-Tails on the day of his birth — a fate that caused him to be shunned by most of Konoha throughout his childhood. After joining Team Kakashi, Naruto worked hard to gain the village\'s acknowledgement all the while chasing his dream to become Hokage. In the following years, through many hardships and ordeals, he became a capable ninja regarded as a hero both by the villagers, and soon after, the rest of the world, becoming known as the Hero of the Hidden Leaf (木ノ葉隠れの英雄, Konohagakure no Eiyū, Literally meaning: Hero of the Hidden Tree Leaves). He soon proved to be one of the main factors in winning the Fourth Shinobi World War, leading him to achieve his dream and become the village\'s Seventh Hokage (七代目火影, Nanadaime Hokage, Literally meaning: Seventh Fire Shadow).','2020-01-01','Male',NULL,'[\"Deltoids\",\"Hamstrings\",\"Hips\",\"Lower Back\",\"Pectorals\",\"Triceps\"]','[\"English\",\"Mandarin\"]',NULL,'Suspended','345572aaf258d8d43e9d53d3490845861602085533652.jpeg','0123456789',123,'Home training'),(10,'Amanda','Lu','amanda@adelaide.edu.au','52e8e47b38e854580afce4aade15dbd5ce0c0464da711afe71da123687d5a4cd','im in love with georgia zhang!! \ni am the supreme trainer','2000-05-06','Female',NULL,'[\"Gluteus Maximus\"]','[\"English\",\"Bengali\",\"Arabic\"]',NULL,'Active','65bb3741fd7167f9de25fe21402596f91602331669362.png','1234567890',95,'Gym training');
/*!40000 ALTER TABLE `trainers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `trainers_addresses`
--

DROP TABLE IF EXISTS `trainers_addresses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `trainers_addresses` (
  `trainer_id` int(11) NOT NULL,
  `address_id` int(11) NOT NULL,
  PRIMARY KEY (`trainer_id`,`address_id`),
  KEY `address_id` (`address_id`),
  CONSTRAINT `trainers_addresses_ibfk_1` FOREIGN KEY (`trainer_id`) REFERENCES `trainers` (`trainer_id`),
  CONSTRAINT `trainers_addresses_ibfk_2` FOREIGN KEY (`address_id`) REFERENCES `addresses` (`address_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trainers_addresses`
--

LOCK TABLES `trainers_addresses` WRITE;
/*!40000 ALTER TABLE `trainers_addresses` DISABLE KEYS */;
INSERT INTO `trainers_addresses` VALUES (1,1),(2,1),(3,1),(4,1),(5,1),(6,1),(7,1),(8,1),(9,1),(10,1);
/*!40000 ALTER TABLE `trainers_addresses` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-10-27 14:26:24
