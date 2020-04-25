-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: localhost    Database: mydatabase
-- ------------------------------------------------------
-- Server version	5.7.28-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `auth_permission`
--

DROP TABLE IF EXISTS `auth_permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_permission` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `content_type_id` int(11) NOT NULL,
  `codename` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_permission_content_type_id_codename_01ab375a_uniq` (`content_type_id`,`codename`),
  CONSTRAINT `auth_permission_content_type_id_2f476e4b_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=69 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_permission`
--

LOCK TABLES `auth_permission` WRITE;
/*!40000 ALTER TABLE `auth_permission` DISABLE KEYS */;
INSERT INTO `auth_permission` VALUES (1,'Can add log entry',1,'add_logentry'),(2,'Can change log entry',1,'change_logentry'),(3,'Can delete log entry',1,'delete_logentry'),(4,'Can view log entry',1,'view_logentry'),(5,'Can add permission',2,'add_permission'),(6,'Can change permission',2,'change_permission'),(7,'Can delete permission',2,'delete_permission'),(8,'Can view permission',2,'view_permission'),(9,'Can add group',3,'add_group'),(10,'Can change group',3,'change_group'),(11,'Can delete group',3,'delete_group'),(12,'Can view group',3,'view_group'),(13,'Can add user',4,'add_user'),(14,'Can change user',4,'change_user'),(15,'Can delete user',4,'delete_user'),(16,'Can view user',4,'view_user'),(17,'Can add content type',5,'add_contenttype'),(18,'Can change content type',5,'change_contenttype'),(19,'Can delete content type',5,'delete_contenttype'),(20,'Can view content type',5,'view_contenttype'),(21,'Can add session',6,'add_session'),(22,'Can change session',6,'change_session'),(23,'Can delete session',6,'delete_session'),(24,'Can view session',6,'view_session'),(25,'Can add midyear_population',7,'add_midyear_population'),(26,'Can change midyear_population',7,'change_midyear_population'),(27,'Can delete midyear_population',7,'delete_midyear_population'),(28,'Can view midyear_population',7,'view_midyear_population'),(29,'Can add midyear_population2',8,'add_midyear_population2'),(30,'Can change midyear_population2',8,'change_midyear_population2'),(31,'Can delete midyear_population2',8,'delete_midyear_population2'),(32,'Can view midyear_population2',8,'view_midyear_population2'),(33,'Can add country population',9,'add_countrypopulation'),(34,'Can change country population',9,'change_countrypopulation'),(35,'Can delete country population',9,'delete_countrypopulation'),(36,'Can view country population',9,'view_countrypopulation'),(37,'Can add country area continent',10,'add_countryareacontinent'),(38,'Can change country area continent',10,'change_countryareacontinent'),(39,'Can delete country area continent',10,'delete_countryareacontinent'),(40,'Can view country area continent',10,'view_countryareacontinent'),(41,'Can add continent population',11,'add_continentpopulation'),(42,'Can change continent population',11,'change_continentpopulation'),(43,'Can delete continent population',11,'delete_continentpopulation'),(44,'Can view continent population',11,'view_continentpopulation'),(45,'Can add world population',12,'add_worldpopulation'),(46,'Can change world population',12,'change_worldpopulation'),(47,'Can delete world population',12,'delete_worldpopulation'),(48,'Can view world population',12,'view_worldpopulation'),(49,'Can add birth death growth rates',13,'add_birthdeathgrowthrates'),(50,'Can change birth death growth rates',13,'change_birthdeathgrowthrates'),(51,'Can delete birth death growth rates',13,'delete_birthdeathgrowthrates'),(52,'Can view birth death growth rates',13,'view_birthdeathgrowthrates'),(53,'Can add age specific fertility rates',14,'add_agespecificfertilityrates'),(54,'Can change age specific fertility rates',14,'change_agespecificfertilityrates'),(55,'Can delete age specific fertility rates',14,'delete_agespecificfertilityrates'),(56,'Can view age specific fertility rates',14,'view_agespecificfertilityrates'),(57,'Can add midyear population',15,'add_midyearpopulation'),(58,'Can change midyear population',15,'change_midyearpopulation'),(59,'Can delete midyear population',15,'delete_midyearpopulation'),(60,'Can view midyear population',15,'view_midyearpopulation'),(61,'Can add midyear population age sex',16,'add_midyearpopulationagesex'),(62,'Can change midyear population age sex',16,'change_midyearpopulationagesex'),(63,'Can delete midyear population age sex',16,'delete_midyearpopulationagesex'),(64,'Can view midyear population age sex',16,'view_midyearpopulationagesex'),(65,'Can add mortality life expectancy',17,'add_mortalitylifeexpectancy'),(66,'Can change mortality life expectancy',17,'change_mortalitylifeexpectancy'),(67,'Can delete mortality life expectancy',17,'delete_mortalitylifeexpectancy'),(68,'Can view mortality life expectancy',17,'view_mortalitylifeexpectancy');
/*!40000 ALTER TABLE `auth_permission` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-04-02 14:45:12
