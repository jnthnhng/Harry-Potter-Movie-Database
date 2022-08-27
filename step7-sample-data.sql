
-- -------------------------------------------------------------
-- Group 29: Evan Maher & Jonathan Hang
-- -------------------------------------------------------------
-- Project: Harry Potter Movies Database
-- -------------------------------------------------------------
-- Sample data for the Harry Potter Movies Database
-- -------------------------------------------------------------

-- Mascots - 

INSERT INTO `Mascots` (`name`) VALUES 
  ('Lion'),
  ('Badger'),
  ('Eagle'),
  ('Snake')
;

-- Races - 

INSERT INTO `Races` (`blood_type`) VALUES 
  ('Muggle'),
  ('Half-blood'),
  ('Pure-blood'),
  ('Squib'),
  ('Half-breed')
;

-- Genders - 

INSERT INTO `Genders` (`gender_type`) VALUES 
  ('Male'),
  ('Female');

-- Locations - 

INSERT INTO `Locations` (`name`, `type`) VALUES 
  ('The Burrow', 1), 
  ('Hogwarts', 2),
  ('Magical Menagerie', 3),
  ('Honeydukes', 4),
  ('Azkaban', 5)
;

-- Locations_Types - 

INSERT INTO `Locations_Types` (`type`) VALUES 
  ('Dwellings'),
  ('Schools'),
  ('Diagon Alley'),
  ('Hogsmeade'),
  ('Government-affiliated locales')
;

-- Characters - 

INSERT INTO `Characters` (`first_name`, `last_name`, `house`, `gender`, `race`) VALUES 
  ('Harry', 'Potter', 1, 1, 2),
  ('Ron', 'Weasley', 1, 1, 3),
  ('Rubeus', 'Hagrid', NULL, 1, 2)
;

-- Movies - 

INSERT INTO `Movies` (`title`, `director`, `runtime`, `release_date`) VALUES 
  ("Sorcerer's Stone", 'Chris Columbus', 152, '2001-11-14'),
  ('Chamber of Secrets', 'Chris Columbus', 161, '2002-11-14'),
  ('Prisoner of Askaban', 'Alfonso Cuarón', 139, '2004-06-04')
;

-- Houses - 

INSERT INTO `Houses` (`name`,`mascot`) VALUES 
  ('Gryffindor', 1), 
  ('Hufflepuff', 2), 
  ('Ravenclaw', 3), 
  ('Slytherin', 4)
;

-- Character_Movie_Appearances - 

INSERT INTO `Character_Movie_Appearances` (`cid`, `mid`) VALUES 
  (2, 1),
  (1, 3),
  (3, 2)
;

-- Locations_in_Movies -- 

INSERT INTO `Locations_in_Movies` (`mid`, `lid`) VALUES 
  (1, 3),
  (3, 1),
  (2, 2)
;

