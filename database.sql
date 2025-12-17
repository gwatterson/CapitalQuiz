-- Progettazione Web 
DROP DATABASE if exists database; 
CREATE DATABASE database; 
USE database; 
-- MySQL dump 10.13  Distrib 5.7.28, for Win64 (x86_64)
--
-- Host: localhost    Database: database
-- ------------------------------------------------------
-- Server version	8.0.28

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
-- Table structure for table `record`
--

DROP TABLE IF EXISTS `record`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `record` (
  `utente` varchar(20) NOT NULL,
  `modalita` varchar(20) NOT NULL,
  `punteggio` int NOT NULL,
  PRIMARY KEY (`utente`,`modalita`),
  CONSTRAINT `fk_record_utente` FOREIGN KEY (`utente`) REFERENCES `utente` (`username`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `record`
--

LOCK TABLES `record` WRITE;
/*!40000 ALTER TABLE `record` DISABLE KEYS */;
INSERT INTO `record` VALUES ('admin','countdown',200),('admin','sopravvivenza',250);
/*!40000 ALTER TABLE `record` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `salvate`
--

DROP TABLE IF EXISTS `salvate`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `salvate` (
  `idPartita` int NOT NULL AUTO_INCREMENT,
  `username` varchar(20) NOT NULL,
  `data` varchar(20) NOT NULL,
  `punteggio` int NOT NULL,
  `modalita` varchar(20) NOT NULL,
  PRIMARY KEY (`idPartita`),
  UNIQUE KEY `idPartita_UNIQUE` (`idPartita`),
  KEY `fk_salvate_utente1_idx` (`username`),
  CONSTRAINT `fk_salvate_utente1` FOREIGN KEY (`username`) REFERENCES `utente` (`username`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `salvate`
--

LOCK TABLES `salvate` WRITE;
/*!40000 ALTER TABLE `salvate` DISABLE KEYS */;
INSERT INTO `salvate` VALUES (1,'admin','2025-01-15',100,'countdown'),(2,'admin','2025-01-16',200,'countdown'),(3,'admin','2025-01-15',150,'sopravvivenza'),(4,'admin','2025-01-16',250,'sopravvivenza');
/*!40000 ALTER TABLE `salvate` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `utente`
--

DROP TABLE IF EXISTS `utente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `utente` (
  `username` varchar(20) NOT NULL,
  `mail` varchar(30) NOT NULL,
  `password` varchar(255) NOT NULL,
  `domanda` varchar(30) NOT NULL,
  `risposta` varchar(255) NOT NULL,
  PRIMARY KEY (`username`),
  UNIQUE KEY `username_UNIQUE` (`username`),
  UNIQUE KEY `mail_UNIQUE` (`mail`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `utente`
--

LOCK TABLES `utente` WRITE;
/*!40000 ALTER TABLE `utente` DISABLE KEYS */;
INSERT INTO `utente` VALUES ('admin','admin@admin.it','$2y$10$AEYpSeR3OeDriPEKWH3FnO9uja5wReUvw2dFmspI5xB4CQxew6tia','auto','$2y$10$qoluUbYPiPHFpGgOHCpbvOWZvEmVmpsWFsHT2jHCIC/vkLMF1zKwm'),('watterson','watterson@prova.it','$2y$10$pEVGK9rRy5ljS7LYyCTKn.Ltg7QnFHg/PEQXrjck3JVfStq8NNvci','data','$2y$10$7LoIcTaHkOt7kCgQbQU90.AV1QgnWPtMArAXJ5yfVoXVvD1daQg9W');
/*!40000 ALTER TABLE `utente` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-02-10 15:10:45
