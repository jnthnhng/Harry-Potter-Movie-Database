
-- Requirement 1 -----------------SELECT------------------------

-- Characters table

SELECT character_id as id, first_name, last_name,  name as house, gender_type as gender, blood_type as race FROM Characters as c LEFT JOIN Houses as h ON c.house = h.house_id LEFT JOIN Genders as g ON c.gender = g.gender_id LEFT JOIN Races as r ON c.race = r.race_id;

-- Character_Movie_Appearances table

SELECT CONCAT(c.first_name, ' ', c.last_name) as full_name, m.title as movie_title, cma.cid as cid, cma.mid as mid FROM Character_Movie_Appearances as cma LEFT JOIN Characters as c ON cma.cid = c.character_id LEFT JOIN Movies as m ON cma.mid = m.movie_id;

-- Genders table

SELECT gender_id as id, gender_type FROM Genders;

SELECT gender_id as id, gender_type FROM Genders WHERE gender_id = :genderId;

-- Houses table

SELECT house_id as id, h.name as name, m.name as mascot FROM Houses as h LEFT JOIN Mascots as m ON h.mascot = m.mascot_id;

SELECT house_id as id, name, mascot FROM Houses WHERE house_id = :hidFromForm;

-- Locations_in_Movies table

SELECT m.title as movie_title, l.name as location_name, m.movie_id as mid, l.location_id as lid FROM Locations_in_Movies as lim LEFT JOIN Locations as l ON lim.lid = l.location_id LEFT JOIN Movies as m ON lim.mid = m.movie_id;

-- Locations_Types table

SELECT location_type_id as id, type FROM Locations_Types;
SELECT location_type_id as id, type FROM Locations_Types WHERE location_type_id = :locationIdFromForm;

-- Locations table


SELECT location_type_id as id, type FROM Locations_Types;

SELECT location_id as id, l.name as name, lt.type as type FROM Locations as l LEFT JOIN Locations_Types as lt ON l.location_id = lt.location_type_id;


-- Mascots table

SELECT mascot_id as id, name FROM Mascots;

SELECT mascot_id as id, name FROM Mascots WHERE mascot_id = :mascotIdFromForm;

-- Movies table

SELECT movie_id as id, title, director, runtime, release_date FROM Movies;

-- Races table

SELECT race_id as id, blood_type FROM Races;
SELECT race_id as id, blood_type FROM Races WHERE race_id = :raceIdFromForm;


-- Requirement 2 -----------------UPDATE------------------------

-- UPDATE -- Characters 

UPDATE `Characters` 
SET `first_name` = :fnameInput, `last_name` = :lnameInput, `gender` = :genderFromDropdown, `house` = :houseFromDropdown, `race` = :raceFromDropdown 
WHERE `character_id` = :characterId;


-- UPDATE -- Character_Movie_Appearances

UPDATE `Character_Movie_Appearances`
SET `cid` = :newCharacterId, `mid` = :newMovieId
WHERE `cid` = :oldCharacterId AND `mid` = :oldMovieId

-- UPDATE -- Genders

UPDATE `Genders`
SET `gender_type` = :genderTypeInput 
WHERE `gender_id` = :genderId;

-- UPDATE -- Houses

UPDATE `Houses`
SET `name` = :nameInput 
WHERE `house_id` = :houseId;

-- UPDATE -- Locations_in_Movies

UPDATE `Locations_in_Movies`
SET `mid` = :newMovieId, `lid` = :newLocationId
WHERE `mid` = :oldMovieId AND `lid` = :oldLocationId

-- UPDATE -- Locations_Types

UPDATE `Locations_Types`
SET `type` = :typeInput
WHERE `location_type_id` = :locationTypeId;

-- UPDATE -- Locations

UPDATE `Locations`
SET `name` = :nameInput, `type` = :typeFromDropdown
WHERE `location_id` = :locationId;

-- UPDATE -- Mascots

UPDATE `Mascots`
SET `name` = :nameInput
WHERE `mascot_id` = :mascotId;

-- UPDATE -- Movies

UPDATE `Movies`
SET `title` = :titleInput, `director` = :directorInput, `runtime` = runtimeInput, `release_date` = releaseDateInput
WHERE `movie_id` = :movieId;

-- UPDATE -- Races

UPDATE `Races`
SET `blood_type` = :bloodTypeInput
WHERE `race_id` = :raceId;

-- -----------------------DELETE--------------------------------


-- DELETE -- Characters

DELETE FROM `Character_Movie_Appearances`
WHERE `cid` = :oldCharacterId AND `mid` = :oldMovieId

-- DELETE -- Genders

DELETE FROM `Genders`
WHERE `gender_id` = :genderId;

-- DELETE -- Houses

DELETE FROM `Houses`
WHERE `house_id` = :houseId;

-- DELETE -- Locations_in_Movies

DELETE FROM `Locations_in_Movies`
WHERE `mid` = :oldMovieId AND `lid` = :oldLocationId

-- DELETE -- Locations_Types

DELETE FROM `Locations_Types`
WHERE `location_type_id` = :locationTypeId;

-- DELETE -- Locations

DELETE FROM `Locations`
WHERE `location_id` = :locationId;

-- DELETE -- Mascots

DELETE FROM `Mascots`
WHERE `mascot_id` = :mascotId;

-- DELETE -- Movies

DELETE FROM `Movies`
WHERE `movie_id` = :movieId;

-- DELETE -- Races

DELETE FROM `Races`
WHERE `race_id` = :raceId;

-- Requirement 3
-- -------------Add/Remove from ONE m-to-m ----------------------
-- * See INSERT and DELETE sections *


-- Requirement 4
-- --------------INSERT functionalities -------------------------

-- Characters table
-- Query to add a new character functionality with colon : character being used to 
-- denote the variables that will have data from the backend programming language

INSERT INTO `Characters` (`first_name`, `last_name`, `house`, `gender`, `Races_race_id`) VALUES 
  (:fnameInput, :lnameInput, :houseFromDropdown, :genderFromDropdown, :raceFromDropdown)  
;

-- Character_Movie_Appearances table
-- Query to add a new character movie appearance functionality with colon : character being used to 
-- denote the variables that will have data from the backend programming language

INSERT INTO `Character_Movie_Appearances` (`cid`, `mid`) VALUES 
  (:characterIdFromDropdown, :movieIdFromDropdown)
;

-- Genders table
-- Query to add a new gender functionality with colon : character being used to 
-- denote the variables that will have data from the backend programming language

INSERT INTO `Genders` (`gender_type`) VALUES 
  (:genderTypeInput)
;

-- Houses table
-- Query to add a new house functionality with colon : character being used to 
-- denote the variables that will have data from the backend programming language

INSERT INTO `Houses` (`name`) VALUES 
  (:nameInput)
;

-- Locations_in_Movies table
-- Query to add a new location in movie functionality with colon : character being used to 
-- denote the variables that will have data from the backend programming language

INSERT INTO `Locations_in_Movies` (`mid`, `lid`) VALUES 
  (:movieIdFromDropdown, :locationIdFromDropdown)
;

-- Locations_Types table
-- Query to add a new location type functionality with colon : character being used to 
-- denote the variables that will have data from the backend programming language

INSERT INTO `Locations_Types` (`type`) VALUES 
  (:typeInput)
;

-- Locations table
-- Query to add a new location functionality with colon : character being used to 
-- denote the variables that will have data from the backend programming language

INSERT INTO `Locations` (`name`, `type`) VALUES 
  (:nameInput, :typeFromDropdown)
;

-- Mascots table
-- Query to add a new mascot functionality with colon : character being used to 
-- denote the variables that will have data from the backend programming language

INSERT INTO `Mascots` (`name`) VALUES 
  (:nameInput)
;

-- Movies table
-- Query to add a new movie functionality with colon : character being used to 
-- denote the variables that will have data from the backend programming language

INSERT INTO `Movies` (`title`, `director`, `runtime`, `release_date`) VALUES 
  (:titleInput, :directorInput, :runtimeInput,:releaseDateInput)
;

-- Races table
-- Query to add a new race functionality with colon : character being used to 
-- denote the variables that will have data from the backend programming language

INSERT INTO `Races` (`blood_type`) VALUES 
  (:bloodTypeInput)
;

-- Requirement 5
-- DELETE for a m-to-m -----------------------------
-- * See DELETE section *





