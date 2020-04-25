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
-- Table structure for table `django_migrations`
--

DROP TABLE IF EXISTS `django_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_migrations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `app` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `applied` datetime(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_migrations`
--

LOCK TABLES `django_migrations` WRITE;
/*!40000 ALTER TABLE `django_migrations` DISABLE KEYS */;
INSERT INTO `django_migrations` VALUES (1,'contenttypes','0001_initial','2020-03-12 14:07:12.142493'),(2,'auth','0001_initial','2020-03-12 14:07:14.334577'),(3,'admin','0001_initial','2020-03-12 14:07:21.215751'),(4,'admin','0002_logentry_remove_auto_add','2020-03-12 14:07:22.876717'),(5,'admin','0003_logentry_add_action_flag_choices','2020-03-12 14:07:22.908665'),(6,'contenttypes','0002_remove_content_type_name','2020-03-12 14:07:23.970082'),(7,'auth','0002_alter_permission_name_max_length','2020-03-12 14:07:24.967713'),(8,'auth','0003_alter_user_email_max_length','2020-03-12 14:07:25.799970'),(9,'auth','0004_alter_user_username_opts','2020-03-12 14:07:25.837117'),(10,'auth','0005_alter_user_last_login_null','2020-03-12 14:07:26.321800'),(11,'auth','0006_require_contenttypes_0002','2020-03-12 14:07:26.373466'),(12,'auth','0007_alter_validators_add_error_messages','2020-03-12 14:07:26.449573'),(13,'auth','0008_alter_user_username_max_length','2020-03-12 14:07:27.142329'),(14,'auth','0009_alter_user_last_name_max_length','2020-03-12 14:07:27.974376'),(15,'auth','0010_alter_group_name_max_length','2020-03-12 14:07:29.050686'),(16,'auth','0011_update_proxy_permissions','2020-03-12 14:07:29.087422'),(17,'sessions','0001_initial','2020-03-12 14:07:29.599555'),(18,'MyApp','0001_initial','2020-03-12 16:12:09.460255'),(19,'MyApp','0002_delete_midyear_population','2020-03-12 18:20:55.179263'),(20,'MyApp','0003_midyear_population','2020-03-12 18:22:17.965981'),(21,'MyApp','0004_delete_midyear_population','2020-03-12 18:46:09.684545'),(22,'MyApp','0005_midyear_population','2020-03-12 18:46:38.698839'),(23,'MyApp','0006_delete_midyear_population','2020-03-12 18:47:47.336903'),(24,'MyApp','0007_midyear_population','2020-03-12 18:59:44.534483'),(25,'MyApp','0008_delete_midyear_population','2020-03-12 19:49:31.551029'),(26,'MyApp','0009_midyear_population','2020-03-12 19:50:27.389267'),(27,'MyApp','0010_midyear_population2','2020-03-12 23:33:24.946886'),(28,'MyApp','0011_countrypopulation','2020-03-13 02:20:23.416790'),(29,'MyApp','0012_delete_countrypopulation','2020-03-13 02:21:37.156215'),(30,'MyApp','0013_countrypopulation','2020-03-13 02:25:04.810531'),(31,'MyApp','0014_countryareacontinent','2020-03-13 02:40:41.811189'),(32,'MyApp','0015_auto_20200312_2249','2020-03-13 02:49:41.025225'),(33,'MyApp','0016_continentpopulation','2020-03-13 03:11:49.965213'),(34,'MyApp','0017_delete_continentpopulation','2020-03-13 03:11:50.196643'),(35,'MyApp','0018_continentpopulation','2020-03-13 03:12:02.632846'),(36,'MyApp','0019_worldpopulation','2020-03-13 05:00:38.348252'),(37,'MyApp','0020_auto_20200313_0313','2020-03-13 07:13:04.326036'),(38,'MyApp','0021_birthdeathgrowthrates','2020-03-19 13:57:47.271086'),(39,'MyApp','0022_auto_20200319_0957','2020-03-19 13:59:38.388422'),(40,'MyApp','0023_delete_birthdeathgrowthrates','2020-03-19 13:59:38.497748'),(41,'MyApp','0024_birthdeathgrowthrates','2020-03-19 13:59:38.796475'),(42,'MyApp','0025_agespecificfertilityrates','2020-03-19 15:44:29.923276'),(43,'MyApp','0026_midyearpopulation','2020-03-19 16:03:02.314606'),(44,'MyApp','0027_midyearpopulationagesex','2020-03-19 16:46:40.549650'),(45,'MyApp','0028_delete_midyearpopulationagesex','2020-03-19 16:50:26.996872'),(46,'MyApp','0029_midyearpopulationagesex','2020-03-19 16:50:53.220844'),(47,'MyApp','0030_mortalitylifeexpectancy','2020-03-22 23:18:29.332356'),(48,'MyApp','0031_delete_countryareacontinent','2020-03-27 21:07:34.236950'),(49,'MyApp','0032_countryareacontinent','2020-03-27 21:07:55.322029');
/*!40000 ALTER TABLE `django_migrations` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-04-02 14:45:13
