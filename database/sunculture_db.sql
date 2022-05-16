-- MySQL dump 10.13  Distrib 8.0.29, for Linux (x86_64)
--
-- Host: localhost    Database: sunculture_db
-- ------------------------------------------------------
-- Server version	8.0.29-0ubuntu0.20.04.3

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `SequelizeMeta`
--

DROP TABLE IF EXISTS `SequelizeMeta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `SequelizeMeta` (
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `SequelizeMeta`
--

LOCK TABLES `SequelizeMeta` WRITE;
/*!40000 ALTER TABLE `SequelizeMeta` DISABLE KEYS */;
INSERT INTO `SequelizeMeta` VALUES ('dbcdr.migration.js'),('logging.migration.js'),('otp.migration.js');
/*!40000 ALTER TABLE `SequelizeMeta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dbcdr`
--

DROP TABLE IF EXISTS `dbcdr`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dbcdr` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `cost` varchar(255) NOT NULL,
  `messageId` varchar(255) NOT NULL,
  `messageParts` varchar(10) NOT NULL,
  `number` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL,
  `statusCode` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dbcdr`
--

LOCK TABLES `dbcdr` WRITE;
/*!40000 ALTER TABLE `dbcdr` DISABLE KEYS */;
INSERT INTO `dbcdr` VALUES (1,'KES 0.4000','ATXid_0f0dd8d42690e94c0d6265eeefe1dc49','1','+254713132819','Success','101','2022-05-12 11:34:24','2022-05-12 11:34:24'),(2,'KES 0.4000','ATXid_3c29bf0434dcd7a3fb56578cd3e9ea44','1','+254713132819','Success','101','2022-05-12 11:39:31','2022-05-12 11:39:31'),(3,'KES 0.4000','ATXid_20d2718151fe4d7669b1d80c686a981b','1','+254713132819','Success','101','2022-05-12 13:21:08','2022-05-12 13:21:08'),(4,'KES 0.4000','ATXid_eadd197e43ff2376b8ce4f82192f3304','1','+254713132819','Success','101','2022-05-12 13:24:56','2022-05-12 13:24:56'),(5,'KES 0.4000','ATXid_c1264c64ae17a0776ef4c8114dc94af3','1','+254115359964','Success','101','2022-05-16 09:11:00','2022-05-16 09:11:00'),(6,'KES 0.4000','ATXid_57a747480f53f174b00d9becb5ec1b36','1','+254115359964','Success','101','2022-05-16 09:14:10','2022-05-16 09:14:10'),(7,'KES 0.4000','ATXid_bcddfd8f2c9d23cbf41f39bb216e9d56','1','+254115359964','Success','101','2022-05-16 09:30:18','2022-05-16 09:30:18'),(8,'KES 0.4000','ATXid_60c266ff10777e866335f673d534ef82','1','+254115359964','Success','101','2022-05-16 09:35:13','2022-05-16 09:35:13'),(9,'KES 0.4000','ATXid_b6a691d99dae1332b82a18e54bb98a12','1','+254115359964','Success','101','2022-05-16 15:37:05','2022-05-16 15:37:05'),(10,'KES 0.4000','ATXid_9daa511acbce8b3998b0b59c319a79be','1','+254115359964','Success','101','2022-05-16 15:37:25','2022-05-16 15:37:25');
/*!40000 ALTER TABLE `dbcdr` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `logs`
--

DROP TABLE IF EXISTS `logs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `logs` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `otpId` varchar(255) NOT NULL,
  `requestId` varchar(255) NOT NULL,
  `actorType` varchar(255) NOT NULL,
  `actorId` varchar(255) NOT NULL,
  `channel` varchar(255) NOT NULL,
  `action` varchar(255) NOT NULL,
  `desc` varchar(255) NOT NULL,
  `userAgent` varchar(255) NOT NULL DEFAULT '0',
  `ip` varchar(255) NOT NULL,
  `resourceType` enum('api','engine','webhook') NOT NULL,
  `resourcePath` varchar(255) NOT NULL,
  `method` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `logs`
--

LOCK TABLES `logs` WRITE;
/*!40000 ALTER TABLE `logs` DISABLE KEYS */;
/*!40000 ALTER TABLE `logs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `otp`
--

DROP TABLE IF EXISTS `otp`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `otp` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `otpId` varchar(255) NOT NULL,
  `phoneNumber` varchar(255) DEFAULT NULL,
  `nationalID` varchar(255) DEFAULT NULL,
  `code` varchar(10) NOT NULL,
  `expiry` varchar(255) NOT NULL,
  `status` enum('0','1','2') NOT NULL DEFAULT '0' COMMENT '0 - unverified, 1- verified, 2 - expired',
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `otpId` (`otpId`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `otp`
--

LOCK TABLES `otp` WRITE;
/*!40000 ALTER TABLE `otp` DISABLE KEYS */;
INSERT INTO `otp` VALUES (1,'cc6adcf9-7f2b-4bb2-99e8-dd48f286cf12','254115359964',NULL,'5522','10 minutes','0','2022-05-12 08:19:11','2022-05-12 08:19:11');
/*!40000 ALTER TABLE `otp` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-05-16 22:29:38
