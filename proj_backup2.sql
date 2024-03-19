-- MySQL dump 10.13  Distrib 5.7.24, for osx11.1 (x86_64)
--
-- Host: localhost    Database: proj
-- ------------------------------------------------------
-- Server version	8.3.0

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
-- Table structure for table `ADMIN`
--

DROP TABLE IF EXISTS `ADMIN`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ADMIN` (
  `Admin_id` int NOT NULL,
  `Name` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`Admin_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ADMIN`
--

LOCK TABLES `ADMIN` WRITE;
/*!40000 ALTER TABLE `ADMIN` DISABLE KEYS */;
INSERT INTO `ADMIN` VALUES (1,'John Smith'),(2,'Jane Doe'),(3,'Michael Johnson'),(4,'Emily Brown'),(5,'David Wilson'),(6,'Olivia Taylor'),(7,'William Davis'),(8,'Sophia Anderson'),(9,'James Martinez'),(10,'Ava Thomas');
/*!40000 ALTER TABLE `ADMIN` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `CHIEF_GUEST`
--

DROP TABLE IF EXISTS `CHIEF_GUEST`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `CHIEF_GUEST` (
  `EC_ID` int NOT NULL,
  `Admin_id` int NOT NULL,
  `C_id` int NOT NULL,
  `Guest_name` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`EC_ID`,`Admin_id`,`C_id`),
  CONSTRAINT `chief_guest_ibfk_1` FOREIGN KEY (`EC_ID`, `Admin_id`, `C_id`) REFERENCES `COMPETETION` (`EC_ID`, `Admin_id`, `C_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `CHIEF_GUEST`
--

LOCK TABLES `CHIEF_GUEST` WRITE;
/*!40000 ALTER TABLE `CHIEF_GUEST` DISABLE KEYS */;
INSERT INTO `CHIEF_GUEST` VALUES (1,1,1,'Mark Zuckerberg'),(2,1,2,'Satya Nadella'),(3,2,1,'Serena Williams'),(4,3,1,'Elon Musk'),(5,4,1,'Meryl Streep'),(6,5,1,'Pablo Picasso'),(7,6,1,'Lionel Messi'),(8,7,1,'Beyonce Knowles'),(9,8,1,'Maya Angelou'),(10,9,1,'Steve Jobs');
/*!40000 ALTER TABLE `CHIEF_GUEST` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `COLLEGE`
--

DROP TABLE IF EXISTS `COLLEGE`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `COLLEGE` (
  `COrg_id` int NOT NULL,
  `ECol_id` int NOT NULL,
  `College_id` int NOT NULL,
  `Col_name` varchar(30) DEFAULT NULL,
  `Department` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`COrg_id`,`ECol_id`,`College_id`),
  CONSTRAINT `college_ibfk_1` FOREIGN KEY (`COrg_id`, `ECol_id`) REFERENCES `ORGANISATION` (`Org_id`, `EO_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `COLLEGE`
--

LOCK TABLES `COLLEGE` WRITE;
/*!40000 ALTER TABLE `COLLEGE` DISABLE KEYS */;
INSERT INTO `COLLEGE` VALUES (1,1,1,'ABC University','Computer Science'),(1,1,2,'XYZ College','Electrical Engineering'),(2,2,1,'PQR Institute','Business Administration'),(3,3,1,'LMN University','Arts and Design'),(4,4,1,'EFG College','Mechanical Engineering'),(5,5,1,'HIJ Institute','Civil Engineering'),(6,6,1,'KLM University','Biomedical Engineering'),(7,7,1,'NOP College','Chemical Engineering'),(8,8,1,'QRS Institute','Environmental Science'),(9,9,1,'TUV University','Aerospace Engineering');
/*!40000 ALTER TABLE `COLLEGE` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Company`
--

DROP TABLE IF EXISTS `Company`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Company` (
  `ComOrg_id` int NOT NULL,
  `UniqueID` int NOT NULL,
  `Company_id` int NOT NULL,
  `Company_name` varchar(30) DEFAULT NULL,
  `Years_of_Estb` int DEFAULT NULL,
  PRIMARY KEY (`ComOrg_id`,`UniqueID`,`Company_id`),
  CONSTRAINT `company_ibfk_1` FOREIGN KEY (`ComOrg_id`, `UniqueID`) REFERENCES `ORGANISATION` (`Org_id`, `EO_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Company`
--

LOCK TABLES `Company` WRITE;
/*!40000 ALTER TABLE `Company` DISABLE KEYS */;
INSERT INTO `Company` VALUES (1,1,1,'Apple Inc.',45),(2,2,1,'Google LLC',24),(10,10,1,'Acme Corp',25),(10,10,2,'Globex Inc',15),(10,10,3,'Stark Industries',40),(10,10,4,'Wayne Enterprises',30),(10,10,5,'Oscorp',20),(10,10,6,'LexCorp',35),(10,10,7,'Cyberdyne Systems',15),(10,10,8,'Omni Consumer Products',25),(10,10,9,'Virtucon',10),(10,10,10,'Skynet',5);
/*!40000 ALTER TABLE `Company` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `COMPETETION`
--

DROP TABLE IF EXISTS `COMPETETION`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `COMPETETION` (
  `EC_ID` int NOT NULL,
  `Admin_id` int NOT NULL,
  `C_ID` int NOT NULL,
  PRIMARY KEY (`EC_ID`,`Admin_id`,`C_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `COMPETETION`
--

LOCK TABLES `COMPETETION` WRITE;
/*!40000 ALTER TABLE `COMPETETION` DISABLE KEYS */;
INSERT INTO `COMPETETION` VALUES (1,1,1),(2,1,2),(3,2,1),(4,3,1),(5,4,1),(6,5,1),(7,6,1),(8,7,1),(9,8,1),(10,9,1);
/*!40000 ALTER TABLE `COMPETETION` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `CONFERENCE`
--

DROP TABLE IF EXISTS `CONFERENCE`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `CONFERENCE` (
  `EC_ID` int NOT NULL,
  `Admin_id` int NOT NULL,
  `Conference_id` int NOT NULL,
  `Duration` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`EC_ID`,`Admin_id`,`Conference_id`),
  CONSTRAINT `conference_ibfk_1` FOREIGN KEY (`EC_ID`, `Admin_id`) REFERENCES `EVENT` (`E_ID`, `Admin_id`),
  CONSTRAINT `conference_ibfk_2` FOREIGN KEY (`EC_ID`, `Admin_id`, `Conference_id`) REFERENCES `JUDGES` (`EC_ID`, `Admin_id`, `UniqueID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `CONFERENCE`
--

LOCK TABLES `CONFERENCE` WRITE;
/*!40000 ALTER TABLE `CONFERENCE` DISABLE KEYS */;
/*!40000 ALTER TABLE `CONFERENCE` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `EVENT`
--

DROP TABLE IF EXISTS `EVENT`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `EVENT` (
  `E_ID` int NOT NULL,
  `Admin_id` int NOT NULL,
  `Date` date DEFAULT NULL,
  `Venue` varchar(30) DEFAULT NULL,
  `Event_name` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`E_ID`,`Admin_id`),
  KEY `Admin_id` (`Admin_id`),
  CONSTRAINT `event_ibfk_1` FOREIGN KEY (`Admin_id`) REFERENCES `ADMIN` (`Admin_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `EVENT`
--

LOCK TABLES `EVENT` WRITE;
/*!40000 ALTER TABLE `EVENT` DISABLE KEYS */;
INSERT INTO `EVENT` VALUES (1,1,'2024-05-01','Main Auditorium','Tech Conference'),(2,2,'2024-06-15','Sports Complex','Annual Sports Fest'),(3,3,'2024-09-01','Convention Center','Business Summit'),(4,4,'2024-10-15','Theater Hall','Drama Festival'),(5,5,'2024-11-01','Art Gallery','Art Exhibition'),(6,6,'2024-12-01','Main Stadium','Football Tournament'),(7,7,'2025-02-01','Music Hall','Music Concert'),(8,8,'2025-03-15','Outdoor Theater','Poetry Slam'),(9,9,'2025-04-01','Convention Center','Marketing Summit'),(10,10,'2025-05-15','Auditorium','Dance Competition');
/*!40000 ALTER TABLE `EVENT` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `FACULTY`
--

DROP TABLE IF EXISTS `FACULTY`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `FACULTY` (
  `UF_ID` int NOT NULL,
  `Staff_id` int NOT NULL,
  `College_name` varchar(30) NOT NULL,
  `Department` varchar(30) DEFAULT NULL,
  `Experience` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`UF_ID`,`Staff_id`),
  KEY `idx_staff_id` (`Staff_id`),
  CONSTRAINT `faculty_ibfk_1` FOREIGN KEY (`UF_ID`) REFERENCES `USER` (`U_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `FACULTY`
--

LOCK TABLES `FACULTY` WRITE;
/*!40000 ALTER TABLE `FACULTY` DISABLE KEYS */;
INSERT INTO `FACULTY` VALUES (1,1001,'Stanford University','Computer Science','10 years'),(2,1002,'Harvard University','Electrical Engineering','8 years');
/*!40000 ALTER TABLE `FACULTY` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `FEST`
--

DROP TABLE IF EXISTS `FEST`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `FEST` (
  `EF_ID` int NOT NULL,
  `Admin_id` int NOT NULL,
  `FEST_ID` int NOT NULL,
  PRIMARY KEY (`EF_ID`,`Admin_id`,`FEST_ID`),
  KEY `Admin_id` (`Admin_id`,`EF_ID`),
  CONSTRAINT `fest_ibfk_1` FOREIGN KEY (`Admin_id`, `EF_ID`) REFERENCES `EVENT` (`Admin_id`, `E_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `FEST`
--

LOCK TABLES `FEST` WRITE;
/*!40000 ALTER TABLE `FEST` DISABLE KEYS */;
INSERT INTO `FEST` VALUES (1,1,1),(2,2,1),(2,2,2),(6,6,2),(7,7,3),(8,8,4),(9,9,5),(10,10,6);
/*!40000 ALTER TABLE `FEST` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Government`
--

DROP TABLE IF EXISTS `Government`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Government` (
  `GOrg_id` int NOT NULL,
  `EG_id` int NOT NULL,
  `Policy_no` int NOT NULL,
  `Ministry` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`GOrg_id`,`EG_id`,`Policy_no`),
  CONSTRAINT `government_ibfk_1` FOREIGN KEY (`GOrg_id`, `EG_id`) REFERENCES `ORGANISATION` (`Org_id`, `EO_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Government`
--

LOCK TABLES `Government` WRITE;
/*!40000 ALTER TABLE `Government` DISABLE KEYS */;
INSERT INTO `Government` VALUES (1,1,1001,'Ministry of Education'),(2,2,1,'Education Ministry'),(2,2,2,'Health Ministry'),(2,2,3,'Environment Ministry'),(2,2,4,'Finance Ministry'),(2,2,5,'Defense Ministry'),(2,2,6,'Agriculture Ministry'),(2,2,7,'Energy Ministry'),(2,2,8,'Transportation Ministry'),(2,2,9,'Science and Technology'),(2,2,10,'Foreign Affairs'),(2,2,1002,'Ministry of Science');
/*!40000 ALTER TABLE `Government` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `JUDGES`
--

DROP TABLE IF EXISTS `JUDGES`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `JUDGES` (
  `EC_ID` int NOT NULL,
  `UniqueID` int NOT NULL,
  `Admin_id` int NOT NULL,
  `Judge_name` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`EC_ID`,`UniqueID`,`Admin_id`),
  KEY `idx_judges_reference` (`EC_ID`,`Admin_id`,`UniqueID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `JUDGES`
--

LOCK TABLES `JUDGES` WRITE;
/*!40000 ALTER TABLE `JUDGES` DISABLE KEYS */;
INSERT INTO `JUDGES` VALUES (1,1,1,'Linus Torvalds'),(2,2,1,'Bjarne Stroustrup'),(3,1,2,'Roger Federer'),(4,2,3,'Oprah Winfrey'),(5,3,4,'Steven Spielberg'),(6,4,5,'Pablo Picasso'),(7,5,6,'Lionel Messi'),(8,6,7,'Beyonce Knowles'),(9,7,8,'Maya Angelou'),(10,8,9,'Neil deGrasse Tyson');
/*!40000 ALTER TABLE `JUDGES` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `MENTORED_BY`
--

DROP TABLE IF EXISTS `MENTORED_BY`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `MENTORED_BY` (
  `Roll_no` int NOT NULL,
  `Mentor_id` int NOT NULL,
  `UniqueID` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`Roll_no`,`Mentor_id`),
  KEY `Mentor_id` (`Mentor_id`),
  CONSTRAINT `mentored_by_ibfk_1` FOREIGN KEY (`Mentor_id`) REFERENCES `FACULTY` (`Staff_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `MENTORED_BY`
--

LOCK TABLES `MENTORED_BY` WRITE;
/*!40000 ALTER TABLE `MENTORED_BY` DISABLE KEYS */;
INSERT INTO `MENTORED_BY` VALUES (1001,1001,'001'),(1002,1002,'002');
/*!40000 ALTER TABLE `MENTORED_BY` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ORGANISATION`
--

DROP TABLE IF EXISTS `ORGANISATION`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ORGANISATION` (
  `Org_id` int NOT NULL,
  `EO_id` int NOT NULL,
  PRIMARY KEY (`Org_id`,`EO_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ORGANISATION`
--

LOCK TABLES `ORGANISATION` WRITE;
/*!40000 ALTER TABLE `ORGANISATION` DISABLE KEYS */;
INSERT INTO `ORGANISATION` VALUES (1,1),(2,2),(3,3),(4,4),(5,5),(6,6),(7,7),(8,8),(9,9),(10,10);
/*!40000 ALTER TABLE `ORGANISATION` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `PARTICIPATE_IN`
--

DROP TABLE IF EXISTS `PARTICIPATE_IN`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `PARTICIPATE_IN` (
  `U_ID` int NOT NULL,
  `E_ID` int NOT NULL,
  PRIMARY KEY (`U_ID`,`E_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `PARTICIPATE_IN`
--

LOCK TABLES `PARTICIPATE_IN` WRITE;
/*!40000 ALTER TABLE `PARTICIPATE_IN` DISABLE KEYS */;
INSERT INTO `PARTICIPATE_IN` VALUES (1,1),(2,1),(3,2),(4,3),(5,4),(6,5),(7,6),(8,7),(9,8),(10,9);
/*!40000 ALTER TABLE `PARTICIPATE_IN` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `PERFORMER`
--

DROP TABLE IF EXISTS `PERFORMER`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `PERFORMER` (
  `EF_id` int NOT NULL,
  `Admin_id` int NOT NULL,
  `Fest_id` int NOT NULL,
  `Performer_name` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`EF_id`,`Admin_id`,`Fest_id`),
  CONSTRAINT `performer_ibfk_1` FOREIGN KEY (`EF_id`, `Admin_id`, `Fest_id`) REFERENCES `FEST` (`EF_ID`, `Admin_id`, `FEST_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `PERFORMER`
--

LOCK TABLES `PERFORMER` WRITE;
/*!40000 ALTER TABLE `PERFORMER` DISABLE KEYS */;
INSERT INTO `PERFORMER` VALUES (1,1,1,'The Rock Band'),(2,2,1,'Coldplay'),(2,2,2,'Standup Comedian'),(6,6,2,'Maroon 5'),(7,7,3,'Taylor Swift'),(8,8,4,'Justin Bieber'),(9,9,5,'Lady Gaga'),(10,10,6,'Ed Sheeran');
/*!40000 ALTER TABLE `PERFORMER` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `PRIZE`
--

DROP TABLE IF EXISTS `PRIZE`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `PRIZE` (
  `EC_ID` int NOT NULL,
  `Admin_id` int NOT NULL,
  `C_id` int NOT NULL,
  `Prize_type` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`EC_ID`,`Admin_id`,`C_id`),
  CONSTRAINT `prize_ibfk_1` FOREIGN KEY (`EC_ID`, `Admin_id`, `C_id`) REFERENCES `COMPETETION` (`EC_ID`, `Admin_id`, `C_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `PRIZE`
--

LOCK TABLES `PRIZE` WRITE;
/*!40000 ALTER TABLE `PRIZE` DISABLE KEYS */;
/*!40000 ALTER TABLE `PRIZE` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `STUDENT`
--

DROP TABLE IF EXISTS `STUDENT`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `STUDENT` (
  `US_ID` int NOT NULL,
  `Roll_no` int NOT NULL,
  `College_name` varchar(30) DEFAULT NULL,
  `Degree` varchar(30) DEFAULT NULL,
  `Year` year DEFAULT NULL,
  `Major` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`US_ID`,`Roll_no`),
  KEY `Roll_no` (`Roll_no`),
  CONSTRAINT `student_ibfk_1` FOREIGN KEY (`Roll_no`) REFERENCES `MENTORED_BY` (`Roll_no`),
  CONSTRAINT `student_ibfk_2` FOREIGN KEY (`US_ID`) REFERENCES `USER` (`U_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `STUDENT`
--

LOCK TABLES `STUDENT` WRITE;
/*!40000 ALTER TABLE `STUDENT` DISABLE KEYS */;
INSERT INTO `STUDENT` VALUES (1,1001,'University of California','Bachelor of Science',2024,'Computer Science'),(2,1002,'MIT','Bachelor of Engineering',2025,'Electrical Engineering');
/*!40000 ALTER TABLE `STUDENT` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `USER`
--

DROP TABLE IF EXISTS `USER`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `USER` (
  `U_ID` int NOT NULL,
  `Phone_number` bigint unsigned DEFAULT NULL,
  `Email` varchar(30) DEFAULT NULL,
  `Country` varchar(30) DEFAULT NULL,
  `State` varchar(30) DEFAULT NULL,
  `City` varchar(30) DEFAULT NULL,
  `Pincode` int DEFAULT NULL,
  `First_name` varchar(30) DEFAULT NULL,
  `Last_name` varchar(30) DEFAULT NULL,
  `Gender` varchar(3) DEFAULT NULL,
  PRIMARY KEY (`U_ID`),
  CONSTRAINT `user_ibfk_1` FOREIGN KEY (`U_ID`) REFERENCES `PARTICIPATE_IN` (`U_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `USER`
--

LOCK TABLES `USER` WRITE;
/*!40000 ALTER TABLE `USER` DISABLE KEYS */;
INSERT INTO `USER` VALUES (1,1234567890,'user1@example.com','USA','California','San Francisco',94102,'John','Doe','M'),(2,9876543210,'user2@example.com','Canada','Ontario','Toronto',123456,'Jane','Smith','F'),(3,5555555555,'user3@example.com','India','Maharashtra','Mumbai',400001,'Rahul','Sharma','M'),(4,1112223333,'user4@example.com','UK','England','London',567890,'Emma','Watson','F'),(5,4445556666,'user5@example.com','Australia','New South Wales','Sydney',200001,'Michael','Johnson','M'),(6,7778889999,'user6@example.com','Germany','Bavaria','Munich',123456,'Sophie','Müller','F'),(7,2223334444,'user7@example.com','France','Île-de-France','Paris',789012,'Pierre','Dubois','M'),(8,6667778888,'user8@example.com','Japan','Tokyo','Tokyo',100001,'Akiko','Yamamoto','F'),(9,9999988888,'user9@example.com','Brazil','São Paulo','São Paulo',456789,'Pedro','Silva','M'),(10,8888877777,'user10@example.com','Spain','Catalonia','Barcelona',234567,'Maria','Garcia','F');
/*!40000 ALTER TABLE `USER` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-03-19 18:46:13
