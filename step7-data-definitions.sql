
-- -------------------------------------------------------------
-- Group 29 - Evan Maher & Jonathan Hang
-- --------------------------------------------------------------
-- Project: Harry Potter Movies Database
-- --------------------------------------------------------------

-- -----------------------------------------------------
-- Schema HarryPotterMovies
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `HarryPotterMovies` DEFAULT CHARACTER SET utf8 ;
-- -----------------------------------------------------
-- Schema cs340_db
-- -----------------------------------------------------
USE `HarryPotterMovies` ;


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


-- Mascots

DROP TABLE IF EXISTS `Mascots`;

CREATE TABLE IF NOT EXISTS `Mascots` (
 `mascot_id` INT NOT NULL AUTO_INCREMENT UNIQUE,
 `name` VARCHAR(45) NOT NULL,
 PRIMARY KEY (`mascot_id`)
)
ENGINE = InnoDB;

-- Races
DROP TABLE IF EXISTS `Races`;

CREATE TABLE IF NOT EXISTS `Races` (
 `race_id` INT NOT NULL AUTO_INCREMENT UNIQUE,
 `blood_type` VARCHAR(45) NOT NULL,
 PRIMARY KEY (`race_id`)
)
ENGINE = InnoDB;

-- Genders - 

DROP TABLE IF EXISTS `Genders`;

CREATE TABLE IF NOT EXISTS `Genders` (
 `gender_id` INT NOT NULL AUTO_INCREMENT UNIQUE,
 `gender_type` VARCHAR(45) NOT NULL,
 PRIMARY KEY (`gender_id`)
)
ENGINE = InnoDB;

-- Movies
DROP TABLE IF EXISTS `Movies`;

CREATE TABLE IF NOT EXISTS `Movies` (
 `movie_id` INT NOT NULL AUTO_INCREMENT UNIQUE,
 `title` VARCHAR(45) NOT NULL,
 `director` VARCHAR(45) NOT NULL,
 `runtime` INT NOT NULL,
 `release_date` DATE NOT NULL,
 PRIMARY KEY (`movie_id`)
 )
ENGINE = InnoDB;

-- Locations_Types

DROP TABLE IF EXISTS `Locations_Types`;

CREATE TABLE IF NOT EXISTS `Locations_Types` (
 `location_type_id` INT NOT NULL AUTO_INCREMENT UNIQUE,
 `type` VARCHAR(45) NOT NULL,
 PRIMARY KEY (`location_type_id`)
 )
ENGINE = InnoDB;

-- Houses
DROP TABLE IF EXISTS `Houses`;

CREATE TABLE IF NOT EXISTS `Houses` (
 `house_id` INT NOT NULL AUTO_INCREMENT UNIQUE,
 `name` varchar(45) NOT NULL,
 `mascot` INT DEFAULT NULL,
 PRIMARY KEY (`house_id`),
 KEY `mascot` (`mascot`),
 CONSTRAINT `fk_Houses_Mascots`
  FOREIGN KEY (`mascot`)
  REFERENCES `Mascots` (`mascot_id`)
  ON DELETE SET NULL
  ON UPDATE CASCADE
)
ENGINE = InnoDB;

-- Locations

DROP TABLE IF EXISTS `Locations`;

CREATE TABLE IF NOT EXISTS `Locations` (
 `location_id` INT NOT NULL AUTO_INCREMENT UNIQUE,
 `name` VARCHAR(45) NOT NULL,
 `type` INT DEFAULT NULL,
 PRIMARY KEY (`location_id`),
 KEY `type` (`type`),
 CONSTRAINT `fk_Locations_Types1`
  FOREIGN KEY (`type`)
  REFERENCES `Locations_Types` (`location_type_id`)
  ON DELETE SET NULL
  ON UPDATE CASCADE
  )
ENGINE = InnoDB;

-- Locations_in_Movies

DROP TABLE IF EXISTS `Locations_in_Movies`;

CREATE TABLE IF NOT EXISTS `Locations_in_Movies` (
 `mid` INT DEFAULT NULL,
 `lid` INT DEFAULT NULL,
 -- PRIMARY KEY (`mid`, `lid`),
 KEY `mid` (`mid`),
 KEY `lid` (`lid`),
 CONSTRAINT `fk_Locations_in_Movies_mid`
  FOREIGN KEY (`mid`)
  REFERENCES `Movies` (`movie_id`)
  ON DELETE SET NULL
  ON UPDATE CASCADE,
 CONSTRAINT `fk_Locations_in_Movies_lid`
  FOREIGN KEY (`lid`)
  REFERENCES `Locations` (`location_id`)
  ON DELETE SET NULL
  ON UPDATE CASCADE
  )
ENGINE = InnoDB;


-- Characters - 

DROP TABLE IF EXISTS `Characters`;

CREATE TABLE IF NOT EXISTS `Characters` (
 `character_id` INT NOT NULL AUTO_INCREMENT UNIQUE,
 `first_name` VARCHAR(45) NOT NULL,
 `last_name` VARCHAR(45) NOT NULL,
 `house` INT DEFAULT NULL,
 `gender` INT DEFAULT NULL,
 `race` INT DEFAULT NULL,
 PRIMARY KEY (`character_id`),
 KEY `house` (`house`),
 KEY `gender` (`gender`),
 KEY `race` (`race`),
 CONSTRAINT `fk_Characters_Houses1`
  FOREIGN KEY (`house`)
  REFERENCES `Houses` (`house_id`)
  ON DELETE SET NULL
  ON UPDATE CASCADE,
 CONSTRAINT `fk_Characters_Genders1`
  FOREIGN KEY (`gender`)
  REFERENCES `Genders` (`gender_id`)
  ON DELETE SET NULL
  ON UPDATE CASCADE,
 CONSTRAINT `fk_Characters_Races1`
  FOREIGN KEY (`race`)
  REFERENCES `Races` (`race_id`)
  ON DELETE SET NULL
  ON UPDATE CASCADE
  )
ENGINE = InnoDB;


-- Characters_Appearances
DROP TABLE IF EXISTS `Character_Movie_Appearances`;

CREATE TABLE IF NOT EXISTS `Character_Movie_Appearances` (
 `cid` INT DEFAULT NULL,
 `mid` INT DEFAULT NULL,
 -- PRIMARY KEY (`cid`, `mid`), 
 KEY `cid` (`cid`),
 KEY `mid` (`mid`),
 CONSTRAINT `fk_Characters_has_Movies_Characters1`
  FOREIGN KEY (`cid`)
  REFERENCES `Characters` (`character_id`)
  ON DELETE SET NULL
  ON UPDATE CASCADE,
 CONSTRAINT `fk_Characters_has_Movies_Movies1`
  FOREIGN KEY (`mid`)
  REFERENCES `Movies` (`movie_id`)
  ON DELETE SET NULL
  ON UPDATE CASCADE
  )
ENGINE = InnoDB;

