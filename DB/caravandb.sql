-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema caravandb
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `caravandb` ;

-- -----------------------------------------------------
-- Schema caravandb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `caravandb` ;
USE `caravandb` ;

-- -----------------------------------------------------
-- Table `user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `user` ;

CREATE TABLE IF NOT EXISTS `user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(45) NULL,
  `password` VARCHAR(150) NULL,
  `role` VARCHAR(45) NULL,
  `enabled` TINYINT NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `username_UNIQUE` (`username` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `image`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `image` ;

CREATE TABLE IF NOT EXISTS `image` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `url` VARCHAR(45) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `address`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `address` ;

CREATE TABLE IF NOT EXISTS `address` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `street` VARCHAR(45) NULL,
  `city` VARCHAR(45) NULL,
  `state` VARCHAR(45) NULL,
  `zip` INT NULL,
  `latitude` VARCHAR(45) NULL,
  `longitude` VARCHAR(45) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `user_profile`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `user_profile` ;

CREATE TABLE IF NOT EXISTS `user_profile` (
  `id` INT NOT NULL,
  `first_name` VARCHAR(45) NULL,
  `last_name` VARCHAR(45) NULL,
  `bio` VARCHAR(300) NULL,
  `mileage_points` INT NULL,
  `profile_pic_id` INT NULL DEFAULT 10,
  `address_id` INT NULL,
  `email` VARCHAR(45) NULL,
  `phone` VARCHAR(45) NULL,
  `registration_date` DATE NULL,
  `user_id` INT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_user_profile_image1_idx` (`profile_pic_id` ASC),
  INDEX `fk_user_profile_address1_idx` (`address_id` ASC),
  INDEX `fk_user_profile_user1_idx` (`user_id` ASC),
  CONSTRAINT `fk_user_profile_image1`
    FOREIGN KEY (`profile_pic_id`)
    REFERENCES `image` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_user_profile_address1`
    FOREIGN KEY (`address_id`)
    REFERENCES `address` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_user_profile_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `vehicle`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `vehicle` ;

CREATE TABLE IF NOT EXISTS `vehicle` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `make` VARCHAR(45) NULL,
  `model` VARCHAR(45) NULL,
  `manufacture_year` INT NULL,
  `capacity` INT NULL,
  `seats_available` INT NULL,
  `interior_description` VARCHAR(400) NULL,
  `user_profile_id` INT NULL,
  `enabled` TINYINT NULL DEFAULT 1,
  `imageURL` VARCHAR(200) NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_vehicle_user_profile1_idx` (`user_profile_id` ASC),
  CONSTRAINT `fk_vehicle_user_profile1`
    FOREIGN KEY (`user_profile_id`)
    REFERENCES `user_profile` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `trip`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `trip` ;

CREATE TABLE IF NOT EXISTS `trip` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `description` VARCHAR(255) NULL,
  `seats_available` INT NULL,
  `cargo_capacity` DOUBLE NULL,
  `create_date` DATE NULL,
  `enabled` TINYINT NULL DEFAULT 1,
  `total_cost` VARCHAR(200) NULL,
  `miles` DOUBLE NULL,
  `vehicle_id` INT NULL,
  `depart_address_id` INT NULL,
  `destination_address_id` INT NULL,
  `host_id` INT NULL,
  `title` VARCHAR(150) NULL,
  `feature_image` VARCHAR(200) NULL DEFAULT 'https://i.imgur.com/5ByV04j.png',
  PRIMARY KEY (`id`),
  INDEX `fk_trip_vehicle1_idx` (`vehicle_id` ASC),
  INDEX `fk_trip_address1_idx` (`depart_address_id` ASC),
  INDEX `fk_trip_address2_idx` (`destination_address_id` ASC),
  INDEX `fk_trip_user_profile1_idx` (`host_id` ASC),
  CONSTRAINT `fk_trip_vehicle1`
    FOREIGN KEY (`vehicle_id`)
    REFERENCES `vehicle` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_trip_address1`
    FOREIGN KEY (`depart_address_id`)
    REFERENCES `address` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_trip_address2`
    FOREIGN KEY (`destination_address_id`)
    REFERENCES `address` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_trip_user_profile1`
    FOREIGN KEY (`host_id`)
    REFERENCES `user_profile` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `trip_host_review_of_passenger`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `trip_host_review_of_passenger` ;

CREATE TABLE IF NOT EXISTS `trip_host_review_of_passenger` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_profile_id` INT NOT NULL,
  `rating` DOUBLE NULL,
  `review` VARCHAR(400) NULL,
  `trip_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_trip_host_user_profile1_idx` (`user_profile_id` ASC),
  INDEX `fk_trip_host_review_of_passenger_trip1_idx` (`trip_id` ASC),
  CONSTRAINT `fk_trip_host_user_profile1`
    FOREIGN KEY (`user_profile_id`)
    REFERENCES `user_profile` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_trip_host_review_of_passenger_trip1`
    FOREIGN KEY (`trip_id`)
    REFERENCES `trip` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `category`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `category` ;

CREATE TABLE IF NOT EXISTS `category` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `adventure`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `adventure` ;

CREATE TABLE IF NOT EXISTS `adventure` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(45) NULL,
  `description` VARCHAR(400) NULL,
  `activity_level` VARCHAR(200) NULL,
  `includes` VARCHAR(200) NULL,
  `price` DOUBLE NULL,
  `enabled` TINYINT NULL,
  `itinerary` VARCHAR(200) NULL,
  `address_id` INT NOT NULL,
  `host_id` INT NOT NULL,
  `feature_image` VARCHAR(200) NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_adventure_address1_idx` (`address_id` ASC),
  INDEX `fk_adventure_user_profile1_idx` (`host_id` ASC),
  CONSTRAINT `fk_adventure_address1`
    FOREIGN KEY (`address_id`)
    REFERENCES `address` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_adventure_user_profile1`
    FOREIGN KEY (`host_id`)
    REFERENCES `user_profile` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `adventure_category`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `adventure_category` ;

CREATE TABLE IF NOT EXISTS `adventure_category` (
  `category_id` INT NOT NULL,
  `adventure_id` INT NOT NULL,
  INDEX `fk_adventure_category_category1_idx` (`category_id` ASC),
  INDEX `fk_adventure_category_adventure1_idx` (`adventure_id` ASC),
  CONSTRAINT `fk_adventure_category_category1`
    FOREIGN KEY (`category_id`)
    REFERENCES `category` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_adventure_category_adventure1`
    FOREIGN KEY (`adventure_id`)
    REFERENCES `adventure` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `trip_category`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `trip_category` ;

CREATE TABLE IF NOT EXISTS `trip_category` (
  `trip_id` INT NOT NULL,
  `category_id` INT NOT NULL,
  INDEX `fk_trip_category_trip1_idx` (`trip_id` ASC),
  INDEX `fk_trip_category_category1_idx` (`category_id` ASC),
  CONSTRAINT `fk_trip_category_trip1`
    FOREIGN KEY (`trip_id`)
    REFERENCES `trip` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_trip_category_category1`
    FOREIGN KEY (`category_id`)
    REFERENCES `category` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `trip_traveler_review_of_host`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `trip_traveler_review_of_host` ;

CREATE TABLE IF NOT EXISTS `trip_traveler_review_of_host` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `rating` VARCHAR(10) NULL,
  `review` VARCHAR(400) NULL,
  `contribution_pledged` DOUBLE NULL,
  `attended` TINYINT NULL,
  `contribution_actual` DOUBLE NULL,
  `trip_id` INT NOT NULL,
  `user_profile_id` INT NOT NULL,
  `approved` TINYINT NULL DEFAULT 0,
  `traveler_status` VARCHAR(35) NULL DEFAULT 'Pending',
  PRIMARY KEY (`id`),
  INDEX `fk_trip_traveler_trip1_idx` (`trip_id` ASC),
  INDEX `fk_trip_traveler_user_profile1_idx` (`user_profile_id` ASC),
  CONSTRAINT `fk_trip_traveler_trip1`
    FOREIGN KEY (`trip_id`)
    REFERENCES `trip` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_trip_traveler_user_profile1`
    FOREIGN KEY (`user_profile_id`)
    REFERENCES `user_profile` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `trip_message`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `trip_message` ;

CREATE TABLE IF NOT EXISTS `trip_message` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `date_posted` DATETIME NULL,
  `content` VARCHAR(45) NULL,
  `reply_to_id` VARCHAR(45) NULL,
  `trip_id` INT NOT NULL,
  `user_profile_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_trip_message_trip1_idx` (`trip_id` ASC),
  INDEX `fk_trip_message_user_profile1_idx` (`user_profile_id` ASC),
  CONSTRAINT `fk_trip_message_trip1`
    FOREIGN KEY (`trip_id`)
    REFERENCES `trip` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_trip_message_user_profile1`
    FOREIGN KEY (`user_profile_id`)
    REFERENCES `user_profile` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `trip_calendar`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `trip_calendar` ;

CREATE TABLE IF NOT EXISTS `trip_calendar` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `start_date` DATE NULL,
  `end_date` DATE NULL,
  `availability` VARCHAR(45) NULL,
  `trip_id` INT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_trip_calendar_trip1_idx` (`trip_id` ASC),
  CONSTRAINT `fk_trip_calendar_trip1`
    FOREIGN KEY (`trip_id`)
    REFERENCES `trip` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `adventure_calendar`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `adventure_calendar` ;

CREATE TABLE IF NOT EXISTS `adventure_calendar` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `start_date` DATE NULL,
  `end_date` DATE NULL,
  `availability` VARCHAR(45) NULL,
  `adventure_id` INT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_adventure_calendar_adventure1_idx` (`adventure_id` ASC),
  CONSTRAINT `fk_adventure_calendar_adventure1`
    FOREIGN KEY (`adventure_id`)
    REFERENCES `adventure` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `trip_traveler_img`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `trip_traveler_img` ;

CREATE TABLE IF NOT EXISTS `trip_traveler_img` (
  `image_id` INT NOT NULL,
  `trip_traveler_id` INT NOT NULL,
  INDEX `fk_trip_traveler_img_image1_idx` (`image_id` ASC),
  INDEX `fk_trip_traveler_img_trip_traveler1_idx` (`trip_traveler_id` ASC),
  CONSTRAINT `fk_trip_traveler_img_image1`
    FOREIGN KEY (`image_id`)
    REFERENCES `image` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_trip_traveler_img_trip_traveler1`
    FOREIGN KEY (`trip_traveler_id`)
    REFERENCES `trip_traveler_review_of_host` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `dm`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `dm` ;

CREATE TABLE IF NOT EXISTS `dm` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `date_posted` DATETIME NULL,
  `my_id` INT NOT NULL,
  `friend_id` INT NOT NULL,
  `message` VARCHAR(1500) NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_dm_user_profile1_idx` (`my_id` ASC),
  INDEX `fk_dm_user_profile2_idx` (`friend_id` ASC),
  CONSTRAINT `fk_dm_user_profile1`
    FOREIGN KEY (`my_id`)
    REFERENCES `user_profile` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_dm_user_profile2`
    FOREIGN KEY (`friend_id`)
    REFERENCES `user_profile` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `trip_host_img`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `trip_host_img` ;

CREATE TABLE IF NOT EXISTS `trip_host_img` (
  `trip_host_id` INT NOT NULL,
  `image_id` INT NOT NULL,
  INDEX `fk_trip_host_img_trip_host1_idx` (`trip_host_id` ASC),
  INDEX `fk_trip_host_img_image1_idx` (`image_id` ASC),
  CONSTRAINT `fk_trip_host_img_trip_host1`
    FOREIGN KEY (`trip_host_id`)
    REFERENCES `trip_host_review_of_passenger` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_trip_host_img_image1`
    FOREIGN KEY (`image_id`)
    REFERENCES `image` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `adventure_img`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `adventure_img` ;

CREATE TABLE IF NOT EXISTS `adventure_img` (
  `adventure_id` INT NOT NULL,
  `image_id` INT NOT NULL,
  INDEX `fk_adventure_img_adventure1_idx` (`adventure_id` ASC),
  INDEX `fk_adventure_img_image1_idx` (`image_id` ASC),
  CONSTRAINT `fk_adventure_img_adventure1`
    FOREIGN KEY (`adventure_id`)
    REFERENCES `adventure` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_adventure_img_image1`
    FOREIGN KEY (`image_id`)
    REFERENCES `image` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `adventure_traveler_review_of_host`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `adventure_traveler_review_of_host` ;

CREATE TABLE IF NOT EXISTS `adventure_traveler_review_of_host` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `rating` INT NULL,
  `review` VARCHAR(4000) NULL,
  `attended` TINYINT NULL,
  `traveler_status` VARCHAR(35) NULL,
  `adventure_id` INT NOT NULL,
  `user_profile_id` INT NOT NULL,
  `approved` TINYINT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_adventure_traveler_review_of_host_adventure1_idx` (`adventure_id` ASC),
  INDEX `fk_adventure_traveler_review_of_host_user_profile1_idx` (`user_profile_id` ASC),
  CONSTRAINT `fk_adventure_traveler_review_of_host_adventure1`
    FOREIGN KEY (`adventure_id`)
    REFERENCES `adventure` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_adventure_traveler_review_of_host_user_profile1`
    FOREIGN KEY (`user_profile_id`)
    REFERENCES `user_profile` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `adventure_host_review_of_traveler`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `adventure_host_review_of_traveler` ;

CREATE TABLE IF NOT EXISTS `adventure_host_review_of_traveler` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `rating` DOUBLE NULL,
  `review` VARCHAR(1000) NULL,
  `user_profile_id` INT NOT NULL,
  `adventure_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_adventure_host_review_of_traveler_user_profile1_idx` (`user_profile_id` ASC),
  INDEX `fk_adventure_host_review_of_traveler_adventure1_idx` (`adventure_id` ASC),
  CONSTRAINT `fk_adventure_host_review_of_traveler_user_profile1`
    FOREIGN KEY (`user_profile_id`)
    REFERENCES `user_profile` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_adventure_host_review_of_traveler_adventure1`
    FOREIGN KEY (`adventure_id`)
    REFERENCES `adventure` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `adventure_message`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `adventure_message` ;

CREATE TABLE IF NOT EXISTS `adventure_message` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `date_posted` DATETIME NULL,
  `content` VARCHAR(45) NULL,
  `reply_to_id` VARCHAR(45) NULL,
  `adventure_id` INT NOT NULL,
  `user_profile_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_adventure_message_adventure1_idx` (`adventure_id` ASC),
  INDEX `fk_adventure_message_user_profile1_idx` (`user_profile_id` ASC),
  CONSTRAINT `fk_adventure_message_adventure1`
    FOREIGN KEY (`adventure_id`)
    REFERENCES `adventure` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_adventure_message_user_profile1`
    FOREIGN KEY (`user_profile_id`)
    REFERENCES `user_profile` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

SET SQL_MODE = '';
DROP USER IF EXISTS caravan@localhost;
SET SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';
CREATE USER 'caravan'@'localhost' IDENTIFIED BY 'caravan';

GRANT SELECT, INSERT, TRIGGER, UPDATE, DELETE ON TABLE * TO 'caravan'@'localhost';

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- Data for table `user`
-- -----------------------------------------------------
START TRANSACTION;
USE `caravandb`;
INSERT INTO `user` (`id`, `username`, `password`, `role`, `enabled`) VALUES (1, 'larryl', '$2a$10$4SMKDcs9jT18dbFxqtIqDeLEynC7MUrCEUbv1a/bhO.x9an9WGPvm', 'admin', 1);
INSERT INTO `user` (`id`, `username`, `password`, `role`, `enabled`) VALUES (2, 'harryh', '$2a$10$4SMKDcs9jT18dbFxqtIqDeLEynC7MUrCEUbv1a/bhO.x9an9WGPvm', NULL, 1);
INSERT INTO `user` (`id`, `username`, `password`, `role`, `enabled`) VALUES (3, 'shaun', '$2a$10$4SMKDcs9jT18dbFxqtIqDeLEynC7MUrCEUbv1a/bhO.x9an9WGPvm', NULL, 1);
INSERT INTO `user` (`id`, `username`, `password`, `role`, `enabled`) VALUES (4, 'john', '$2a$10$4SMKDcs9jT18dbFxqtIqDeLEynC7MUrCEUbv1a/bhO.x9an9WGPvm', NULL, 1);
INSERT INTO `user` (`id`, `username`, `password`, `role`, `enabled`) VALUES (5, 'frank', '$2a$10$4SMKDcs9jT18dbFxqtIqDeLEynC7MUrCEUbv1a/bhO.x9an9WGPvm', NULL, 1);
INSERT INTO `user` (`id`, `username`, `password`, `role`, `enabled`) VALUES (6, 'jimmy', '$2a$10$4SMKDcs9jT18dbFxqtIqDeLEynC7MUrCEUbv1a/bhO.x9an9WGPvm', NULL, 1);
INSERT INTO `user` (`id`, `username`, `password`, `role`, `enabled`) VALUES (7, 'joanne', '$2a$10$4SMKDcs9jT18dbFxqtIqDeLEynC7MUrCEUbv1a/bhO.x9an9WGPvm', NULL, 1);
INSERT INTO `user` (`id`, `username`, `password`, `role`, `enabled`) VALUES (8, 'geneveve', '$2a$10$4SMKDcs9jT18dbFxqtIqDeLEynC7MUrCEUbv1a/bhO.x9an9WGPvm', NULL, 1);
INSERT INTO `user` (`id`, `username`, `password`, `role`, `enabled`) VALUES (9, 'tiffany', '$2a$10$4SMKDcs9jT18dbFxqtIqDeLEynC7MUrCEUbv1a/bhO.x9an9WGPvm', NULL, 1);
INSERT INTO `user` (`id`, `username`, `password`, `role`, `enabled`) VALUES (10, 'heather', '$2a$10$4SMKDcs9jT18dbFxqtIqDeLEynC7MUrCEUbv1a/bhO.x9an9WGPvm', NULL, 1);
INSERT INTO `user` (`id`, `username`, `password`, `role`, `enabled`) VALUES (11, 'johnnyu', '$2a$10$4SMKDcs9jT18dbFxqtIqDeLEynC7MUrCEUbv1a/bhO.x9an9WGPvm', NULL, 1);
INSERT INTO `user` (`id`, `username`, `password`, `role`, `enabled`) VALUES (12, 'francise', '$2a$10$4SMKDcs9jT18dbFxqtIqDeLEynC7MUrCEUbv1a/bhO.x9an9WGPvm', NULL, 1);

COMMIT;


-- -----------------------------------------------------
-- Data for table `image`
-- -----------------------------------------------------
START TRANSACTION;
USE `caravandb`;
INSERT INTO `image` (`id`, `url`) VALUES (1, 'https://i.imgur.com/Iy01VVJ.jpg');
INSERT INTO `image` (`id`, `url`) VALUES (2, 'https://i.imgur.com/Itd3eOv.jpg');
INSERT INTO `image` (`id`, `url`) VALUES (3, 'https://i.imgur.com/bMUu7B4.jpg');
INSERT INTO `image` (`id`, `url`) VALUES (4, 'https://i.imgur.com/F4sjmjX.jpg');
INSERT INTO `image` (`id`, `url`) VALUES (5, 'https://i.imgur.com/Nu5wzNg.jpg');
INSERT INTO `image` (`id`, `url`) VALUES (6, 'https://i.imgur.com/vyHrClk.jpg');
INSERT INTO `image` (`id`, `url`) VALUES (7, 'https://i.imgur.com/p8OnkzQ.jpg');
INSERT INTO `image` (`id`, `url`) VALUES (8, 'https://i.imgur.com/BAlRD4j.jpg');
INSERT INTO `image` (`id`, `url`) VALUES (9, 'https://i.imgur.com/mnKY0Wb.jpg');
INSERT INTO `image` (`id`, `url`) VALUES (10, 'https://i.imgur.com/Gcs2dQc.png');
INSERT INTO `image` (`id`, `url`) VALUES (11, 'https://i.imgur.com/VvfsILd.jpg');
INSERT INTO `image` (`id`, `url`) VALUES (12, 'https://i.imgur.com/dyYXsV7.jpg');
INSERT INTO `image` (`id`, `url`) VALUES (13, 'https://i.imgur.com/SOyJZvJ.jpg');
INSERT INTO `image` (`id`, `url`) VALUES (14, 'https://i.imgur.com/e4sGTr9.jpg');
INSERT INTO `image` (`id`, `url`) VALUES (15, 'https://i.imgur.com/HeKw7Gx.jpg');
INSERT INTO `image` (`id`, `url`) VALUES (16, 'https://i.imgur.com/MwXmSCr.jpg');
INSERT INTO `image` (`id`, `url`) VALUES (17, 'https://i.imgur.com/5ByV04j.png');

COMMIT;


-- -----------------------------------------------------
-- Data for table `address`
-- -----------------------------------------------------
START TRANSACTION;
USE `caravandb`;
INSERT INTO `address` (`id`, `street`, `city`, `state`, `zip`, `latitude`, `longitude`) VALUES (1, '456 Fake Avenue', 'Eugene', 'OR', 80220, '39.7', '-105.0');
INSERT INTO `address` (`id`, `street`, `city`, `state`, `zip`, `latitude`, `longitude`) VALUES (2, '3764 Elvis Presley Boulevard', 'Memphis', 'TN', 38116, '35.15', '-90.05');
INSERT INTO `address` (`id`, `street`, `city`, `state`, `zip`, `latitude`, `longitude`) VALUES (3, '987 Shaun Street', 'Grand Junction', 'CO', 80116, '39.62', '-104.87');
INSERT INTO `address` (`id`, `street`, `city`, `state`, `zip`, `latitude`, `longitude`) VALUES (4, '314 S Park St', 'Kalamazoo', 'MI', 49007, '42.29', '-85.59');
INSERT INTO `address` (`id`, `street`, `city`, `state`, `zip`, `latitude`, `longitude`) VALUES (5, '2530 Arlene Ave', 'Lincoln', 'NE', 68502, '40.78', '-96.69');
INSERT INTO `address` (`id`, `street`, `city`, `state`, `zip`, `latitude`, `longitude`) VALUES (6, 'W 99th Street', 'Chicago', 'IL', 60655, '41.71', '-87.72');
INSERT INTO `address` (`id`, `street`, `city`, `state`, `zip`, `latitude`, `longitude`) VALUES (7, '7857 Texhoma Ave', 'Los Angeles', 'CA', 91325, '34.21', '-118.52');
INSERT INTO `address` (`id`, `street`, `city`, `state`, `zip`, `latitude`, `longitude`) VALUES (8, '3235 76 Country Blvd & Hwy 165', 'Branson', 'MO', 65616, '36.64', '-93.28');
INSERT INTO `address` (`id`, `street`, `city`, `state`, `zip`, `latitude`, `longitude`) VALUES (9, '88 River Road', 'Gatlinburg', 'TN', 37738, '35.71', '-83.51');
INSERT INTO `address` (`id`, `street`, `city`, `state`, `zip`, `latitude`, `longitude`) VALUES (10, '915 Westgate Resorts Rd', 'Gatlinburg', 'TN', 37738, '35.71', '-83.51');
INSERT INTO `address` (`id`, `street`, `city`, `state`, `zip`, `latitude`, `longitude`) VALUES (11, '797 Tacoma Ave', 'Seattle', 'WA', 98105, NULL, NULL);
INSERT INTO `address` (`id`, `street`, `city`, `state`, `zip`, `latitude`, `longitude`) VALUES (12, '7857 Texhoma Ave', 'Fort Collins', 'CO', 80523, NULL, NULL);
INSERT INTO `address` (`id`, `street`, `city`, `state`, `zip`, `latitude`, `longitude`) VALUES (13, '7857 Texhoma Ave', 'Grand Junction', 'CO', 81501, NULL, NULL);
INSERT INTO `address` (`id`, `street`, `city`, `state`, `zip`, `latitude`, `longitude`) VALUES (14, '7857 Texhoma Ave', 'Kansas City', 'MO', 37738, NULL, NULL);
INSERT INTO `address` (`id`, `street`, `city`, `state`, `zip`, `latitude`, `longitude`) VALUES (15, '7857 Texhoma Ave', 'Denver', 'CO', 80118, NULL, NULL);
INSERT INTO `address` (`id`, `street`, `city`, `state`, `zip`, `latitude`, `longitude`) VALUES (16, '2150 S Franklin St', 'Denver', 'CO', 80111, NULL, NULL);
INSERT INTO `address` (`id`, `street`, `city`, `state`, `zip`, `latitude`, `longitude`) VALUES (24, '250 W Eagle Lane', 'Boulder', 'CO', 82222, NULL, NULL);
INSERT INTO `address` (`id`, `street`, `city`, `state`, `zip`, `latitude`, `longitude`) VALUES (17, '1476 Beach Way', 'Miami', 'FL', 33129, NULL, NULL);
INSERT INTO `address` (`id`, `street`, `city`, `state`, `zip`, `latitude`, `longitude`) VALUES (18, '2546 Palm Blvd', 'Miami', 'FL', 33125, NULL, NULL);
INSERT INTO `address` (`id`, `street`, `city`, `state`, `zip`, `latitude`, `longitude`) VALUES (19, '1300 Leaf Street', 'Seattle', 'WA', 98105, NULL, NULL);
INSERT INTO `address` (`id`, `street`, `city`, `state`, `zip`, `latitude`, `longitude`) VALUES (20, '256 Buffalo Lane', 'Colorado Springs', 'CO', 80911, NULL, NULL);
INSERT INTO `address` (`id`, `street`, `city`, `state`, `zip`, `latitude`, `longitude`) VALUES (21, '876 John Smith Ave', 'Provo', 'UT', 84601, NULL, NULL);
INSERT INTO `address` (`id`, `street`, `city`, `state`, `zip`, `latitude`, `longitude`) VALUES (22, '922 Navajo Lane', 'Pueblo', 'CO', 81001, NULL, NULL);
INSERT INTO `address` (`id`, `street`, `city`, `state`, `zip`, `latitude`, `longitude`) VALUES (23, '1200 Broomstick St', 'Wichita', 'KS', 67052, NULL, NULL);

COMMIT;


-- -----------------------------------------------------
-- Data for table `user_profile`
-- -----------------------------------------------------
START TRANSACTION;
USE `caravandb`;
INSERT INTO `user_profile` (`id`, `first_name`, `last_name`, `bio`, `mileage_points`, `profile_pic_id`, `address_id`, `email`, `phone`, `registration_date`, `user_id`) VALUES (1, 'Larry', 'Linus', 'My name is Larry and I\'m here to say I like road trips in a major way!', 25, 2, 16, 'larryl@larrymail.com', '555-555-9876', '2017-06-15', 1);
INSERT INTO `user_profile` (`id`, `first_name`, `last_name`, `bio`, `mileage_points`, `profile_pic_id`, `address_id`, `email`, `phone`, `registration_date`, `user_id`) VALUES (2, 'Harry', 'McCullough', 'Hey everybody. My name is Harry. I travel a lot for my work business, and I love having company on the long road trips I often have to take. Let\'s ride together!', 300, 3, 1, 'harrym@harrymail.com', '555-555-6789', '2019-04-30', 2);
INSERT INTO `user_profile` (`id`, `first_name`, `last_name`, `bio`, `mileage_points`, `profile_pic_id`, `address_id`, `email`, `phone`, `registration_date`, `user_id`) VALUES (3, 'Shaun', 'McCallister', 'Hi, my name is Shaun. I like to go on trips and stuff.', 250, 4, 3, 'shaun@shaunmail.com', '555-234-1239', '2019-12-18', 3);
INSERT INTO `user_profile` (`id`, `first_name`, `last_name`, `bio`, `mileage_points`, `profile_pic_id`, `address_id`, `email`, `phone`, `registration_date`, `user_id`) VALUES (4, 'John', 'Richardson', 'Hello, I am Johnson McJohnson! Let\'s go road tripping together :D', 14, 5, 5, 'john@johnson.com', '555-234-1238', '2019-12-19', 4);
INSERT INTO `user_profile` (`id`, `first_name`, `last_name`, `bio`, `mileage_points`, `profile_pic_id`, `address_id`, `email`, `phone`, `registration_date`, `user_id`) VALUES (5, 'Frank', 'Grimes', 'Hi. I\'m Frank, and boy do I like to go on road trips.', 1000, 6, 6, 'frank@frank.com', '555-234-1237', '2019-12-20', 5);
INSERT INTO `user_profile` (`id`, `first_name`, `last_name`, `bio`, `mileage_points`, `profile_pic_id`, `address_id`, `email`, `phone`, `registration_date`, `user_id`) VALUES (6, 'Jimmy', 'Franklin', 'Howdy thar! Come a-travelin\' with me, Jimbob McJimbob', 750, 7, 7, 'jimmy@jimmy.com', '555-234-1236', '2019-12-21', 6);
INSERT INTO `user_profile` (`id`, `first_name`, `last_name`, `bio`, `mileage_points`, `profile_pic_id`, `address_id`, `email`, `phone`, `registration_date`, `user_id`) VALUES (7, 'Joanne', 'Yeltsin', 'Hi everyone! I\'m Joanne, and I do a lot of road trips for work. I\'m a vacuum sales person. So you know how it goes. Let\'s take some trips together!', 340, 11, 11, 'joanne@joannemail.com', '555-234-1235', '2019-12-13', 7);
INSERT INTO `user_profile` (`id`, `first_name`, `last_name`, `bio`, `mileage_points`, `profile_pic_id`, `address_id`, `email`, `phone`, `registration_date`, `user_id`) VALUES (8, 'Geneveve', 'Shelby', 'Hi. I\'m Geneveve. I\'m a trustafarian, and I love to go to festies! So I take a lot of road trips, especially in the summer. Let\'s connect!', 276, 12, 12, 'geneveves@genevevemail.com', '555-234-1234', '2019-12-20', 8);
INSERT INTO `user_profile` (`id`, `first_name`, `last_name`, `bio`, `mileage_points`, `profile_pic_id`, `address_id`, `email`, `phone`, `registration_date`, `user_id`) VALUES (9, 'Tiffany', 'Peterson', 'Hey everybody. My name is Tiffany. I travel a lot for work. We should ride together :)', 5000, 13, 13, 'tiffanyp@tiffmail.com', '555-234-1233', '2019-12-12', 9);
INSERT INTO `user_profile` (`id`, `first_name`, `last_name`, `bio`, `mileage_points`, `profile_pic_id`, `address_id`, `email`, `phone`, `registration_date`, `user_id`) VALUES (10, 'Heather', 'Thomas', 'It\'s Heather, y\'all! Let\'s go on some adventures!! :D', 900, 14, 14, 'taylorb@taytaymail.com', '555-234-1232', '2019-12-15', 10);
INSERT INTO `user_profile` (`id`, `first_name`, `last_name`, `bio`, `mileage_points`, `profile_pic_id`, `address_id`, `email`, `phone`, `registration_date`, `user_id`) VALUES (11, 'Francis', 'Robertson', 'Hey everybody. It\'s Francis. Let\'s road trip together!', 450, 16, 16, 'francisr@francismail.com', '555-234-1230', '2019-12-14', 12);
INSERT INTO `user_profile` (`id`, `first_name`, `last_name`, `bio`, `mileage_points`, `profile_pic_id`, `address_id`, `email`, `phone`, `registration_date`, `user_id`) VALUES (12, 'Johnny', 'Utah', 'Hey guys. My name\'s Johnny. I love travelling and adventures more than most. Can\'t wait to go on some journeys with you all!', 450, 15, 15, 'johnnyu@johnnymail.com', '555-234-1231', '2019-12-13', 11);

COMMIT;


-- -----------------------------------------------------
-- Data for table `vehicle`
-- -----------------------------------------------------
START TRANSACTION;
USE `caravandb`;
INSERT INTO `vehicle` (`id`, `make`, `model`, `manufacture_year`, `capacity`, `seats_available`, `interior_description`, `user_profile_id`, `enabled`, `imageURL`) VALUES (1, 'Toyota', 'Corolla', 1996, 40, 3, 'very nice', 1, 1, 'https://i.imgur.com/WsYvbDj.jpg');
INSERT INTO `vehicle` (`id`, `make`, `model`, `manufacture_year`, `capacity`, `seats_available`, `interior_description`, `user_profile_id`, `enabled`, `imageURL`) VALUES (2, 'Honda', 'Accord', 1993, 38, 4, 'kinda old looking', 3, 1, 'https://i.imgur.com/DPgR8Kk.jpg');
INSERT INTO `vehicle` (`id`, `make`, `model`, `manufacture_year`, `capacity`, `seats_available`, `interior_description`, `user_profile_id`, `enabled`, `imageURL`) VALUES (3, 'GMC', 'Yukon', 2012, 37, 5, 'Very nice and clean.', 4, 1, 'https://i.imgur.com/WtM2fXV.jpg');
INSERT INTO `vehicle` (`id`, `make`, `model`, `manufacture_year`, `capacity`, `seats_available`, `interior_description`, `user_profile_id`, `enabled`, `imageURL`) VALUES (4, 'Chevrolet', 'Tahoe', 2010, 30, 4, 'Lots of room to stretch out.', 5, 1, 'https://i.imgur.com/XdhBKlT.jpg');
INSERT INTO `vehicle` (`id`, `make`, `model`, `manufacture_year`, `capacity`, `seats_available`, `interior_description`, `user_profile_id`, `enabled`, `imageURL`) VALUES (5, 'Ford', 'Mustang', 1999, 25, 1, 'Sporty, so not a lot of room inside.', 6, 1, 'https://i.imgur.com/KkJlcOm.jpg');
INSERT INTO `vehicle` (`id`, `make`, `model`, `manufacture_year`, `capacity`, `seats_available`, `interior_description`, `user_profile_id`, `enabled`, `imageURL`) VALUES (6, 'Subaru', 'Forester', 2011, 80, 3, 'My Forrester is pretty roomy. I like to keep it clean, too.', 7, 1, 'https://i.imgur.com/tXuIHFM.jpg');
INSERT INTO `vehicle` (`id`, `make`, `model`, `manufacture_year`, `capacity`, `seats_available`, `interior_description`, `user_profile_id`, `enabled`, `imageURL`) VALUES (7, 'Subaru', 'Legacy', 2013, 50, 2, 'I\'m a bit of a neat freak. Please help me keep my car clean :)', 8, 1, 'https://i.imgur.com/YlGaYsJ.jpg');
INSERT INTO `vehicle` (`id`, `make`, `model`, `manufacture_year`, `capacity`, `seats_available`, `interior_description`, `user_profile_id`, `enabled`, `imageURL`) VALUES (8, 'Ford', 'Explorer', 2003, 45, 4, 'Got a lot of room in here. I\'m not a slob, but I\'m not a clean freak either.', 9, 1, 'https://i.imgur.com/yaGKgNv.jpg');
INSERT INTO `vehicle` (`id`, `make`, `model`, `manufacture_year`, `capacity`, `seats_available`, `interior_description`, `user_profile_id`, `enabled`, `imageURL`) VALUES (9, 'Toyota', 'Camry', 2009, 41, 2, 'Clean interior. Pretty comfy too.', 10, 1, 'https://i.imgur.com/Fm8eY72.jpg');
INSERT INTO `vehicle` (`id`, `make`, `model`, `manufacture_year`, `capacity`, `seats_available`, `interior_description`, `user_profile_id`, `enabled`, `imageURL`) VALUES (10, 'Ford', 'Escape', 2010, 80, 3, 'There a few stains here and there. Otherwise clean. Non smoker.', 2, 1, 'https://i.imgur.com/uCUmz4t.jpg');

COMMIT;


-- -----------------------------------------------------
-- Data for table `trip`
-- -----------------------------------------------------
START TRANSACTION;
USE `caravandb`;
INSERT INTO `trip` (`id`, `description`, `seats_available`, `cargo_capacity`, `create_date`, `enabled`, `total_cost`, `miles`, `vehicle_id`, `depart_address_id`, `destination_address_id`, `host_id`, `title`, `feature_image`) VALUES (1, 'I\'ve always wanted to see Graceland, so we\'re goin\'! Hmu if you want to come along and see where the King lived!', 4, 50, '2017-08-29', 1, '500', 600, 1, 1, 2, 3, 'Goin\' to Graceland', 'https://i.imgur.com/5ByV04j.png');
INSERT INTO `trip` (`id`, `description`, `seats_available`, `cargo_capacity`, `create_date`, `enabled`, `total_cost`, `miles`, `vehicle_id`, `depart_address_id`, `destination_address_id`, `host_id`, `title`, `feature_image`) VALUES (2, 'Let\'s go to Kalamazoo Institue of Arts for their annual bake sale!', 2, 36, '2019-12-29', 1, '250', 750, 2, 3, 4, 3, 'Kalamazoo', 'https://i.imgur.com/5ByV04j.png');
INSERT INTO `trip` (`id`, `description`, `seats_available`, `cargo_capacity`, `create_date`, `enabled`, `total_cost`, `miles`, `vehicle_id`, `depart_address_id`, `destination_address_id`, `host_id`, `title`, `feature_image`) VALUES (3, 'I am going to the Titanic Museum in Branson, Missouri. Come along for the ride.', 3, 38, '2019-12-28', 1, '400', 800, 3, 5, 8, 4, 'Branson Titanic Museum', 'https://i.imgur.com/5ByV04j.png');
INSERT INTO `trip` (`id`, `description`, `seats_available`, `cargo_capacity`, `create_date`, `enabled`, `total_cost`, `miles`, `vehicle_id`, `depart_address_id`, `destination_address_id`, `host_id`, `title`, `feature_image`) VALUES (4, 'I\'m going to Gatlinburg. It\'s super sweet. You should come to!', 2, 30, '2019-12-27', 1, '275', 300, 4, 6, 9, 5, 'Gatlinburg Aquarium', 'https://i.imgur.com/5ByV04j.png');
INSERT INTO `trip` (`id`, `description`, `seats_available`, `cargo_capacity`, `create_date`, `enabled`, `total_cost`, `miles`, `vehicle_id`, `depart_address_id`, `destination_address_id`, `host_id`, `title`, `feature_image`) VALUES (5, 'I plan to go this really sweet indoor water park in Pigeon Forge, TN', 2, 40, '2019-12-26', 1, '1200', 3000, 5, 7, 10, 6, 'Pigeon Forge Indoor Water Park', 'https://i.imgur.com/5ByV04j.png');
INSERT INTO `trip` (`id`, `description`, `seats_available`, `cargo_capacity`, `create_date`, `enabled`, `total_cost`, `miles`, `vehicle_id`, `depart_address_id`, `destination_address_id`, `host_id`, `title`, `feature_image`) VALUES (6, 'I\'m driving to Miami for a family reunion. It\'s a super long drive, but I hate flying! So come along for the trip, help chip in with costs, and if you like, we can take shifts driving. Should be a fun trip!', 3, 100, '2020-01-05', 1, '1000', 3300, 1, 12, 18, 7, 'Miami for Family Reunion', 'https://i.imgur.com/XZa2ZlJ.jpg');
INSERT INTO `trip` (`id`, `description`, `seats_available`, `cargo_capacity`, `create_date`, `enabled`, `total_cost`, `miles`, `vehicle_id`, `depart_address_id`, `destination_address_id`, `host_id`, `title`, `feature_image`) VALUES (7, 'Hey guys. I\'m driving from my home in Fort Collins, CO all the way to Miami to for a business conference. Give me a shout if you want to tag along.', 2, 30, '2020-01-06', 1, '800', 2500, 2, 12, 17, 8, 'Going to Miami for business', 'https://i.imgur.com/5G6mUxP.jpg');
INSERT INTO `trip` (`id`, `description`, `seats_available`, `cargo_capacity`, `create_date`, `enabled`, `total_cost`, `miles`, `vehicle_id`, `depart_address_id`, `destination_address_id`, `host_id`, `title`, `feature_image`) VALUES (8, 'Going to Miami for vacation!! Super excited. Happy to share the ride with you!', 2, 40, '2020-01-05', 1, '600', 2500, 3, 21, 18, 9, 'Miami Vacation', 'https://i.imgur.com/YI84IYt.jpg');
INSERT INTO `trip` (`id`, `description`, `seats_available`, `cargo_capacity`, `create_date`, `enabled`, `total_cost`, `miles`, `vehicle_id`, `depart_address_id`, `destination_address_id`, `host_id`, `title`, `feature_image`) VALUES (9, 'My folks live in Miami, so I\'m driving down there to spend some time with them. Feel free to join my trip :)', 3, 50, '2020-01-05', 1, '700', 2500, 4, 21, 17, 10, 'Miami Trip', 'https://i.imgur.com/0CEQ1o8.jpg');
INSERT INTO `trip` (`id`, `description`, `seats_available`, `cargo_capacity`, `create_date`, `enabled`, `total_cost`, `miles`, `vehicle_id`, `depart_address_id`, `destination_address_id`, `host_id`, `title`, `feature_image`) VALUES (10, 'It\'s vacation time, baby! Miami, here I come! Come along for the ride if you like.', 3, 50, '2020-01-05', 1, '850', 2500, 5, 13, 18, 2, 'Vacation in Miami', 'https://i.imgur.com/3wNFvgR.jpg');
INSERT INTO `trip` (`id`, `description`, `seats_available`, `cargo_capacity`, `create_date`, `enabled`, `total_cost`, `miles`, `vehicle_id`, `depart_address_id`, `destination_address_id`, `host_id`, `title`, `feature_image`) VALUES (11, 'Going back home to Miami. Let me know if you\'d like to join the trip!', 3, 45, '2020-01-05', 1, '550', 2500, 6, 13, 17, 3, 'Back home to FL', 'https://i.imgur.com/u6xhFvR.jpg');
INSERT INTO `trip` (`id`, `description`, `seats_available`, `cargo_capacity`, `create_date`, `enabled`, `total_cost`, `miles`, `vehicle_id`, `depart_address_id`, `destination_address_id`, `host_id`, `title`, `feature_image`) VALUES (12, 'I\'m going on Vacay in Miami for a couple of weeks. I leave on the 15th.', 2, 34, '2020-01-05', 1, '475', 2250, 7, 15, 18, 4, 'Miami Vacay', 'https://i.imgur.com/WciIWr1.jpg');
INSERT INTO `trip` (`id`, `description`, `seats_available`, `cargo_capacity`, `create_date`, `enabled`, `total_cost`, `miles`, `vehicle_id`, `depart_address_id`, `destination_address_id`, `host_id`, `title`, `feature_image`) VALUES (13, 'I\'m moving to Miami and will be driving down there with a trailer of my stuff. Plz contact me if you want to join.', 4, 45, '2020-01-05', 1, '450', 2250, 8, 15, 17, 5, 'FL trip', 'https://i.imgur.com/QCYchJQ.jpg');
INSERT INTO `trip` (`id`, `description`, `seats_available`, `cargo_capacity`, `create_date`, `enabled`, `total_cost`, `miles`, `vehicle_id`, `depart_address_id`, `destination_address_id`, `host_id`, `title`, `feature_image`) VALUES (14, 'Going to Miami to see some family. Would love some travel companions for the long drive.', 3, 45, '2020-01-05', 1, '700', 2250, 9, 16, 18, 6, 'Trip to Miami', 'https://i.imgur.com/tXKPKXa.jpg');
INSERT INTO `trip` (`id`, `description`, `seats_available`, `cargo_capacity`, `create_date`, `enabled`, `total_cost`, `miles`, `vehicle_id`, `depart_address_id`, `destination_address_id`, `host_id`, `title`, `feature_image`) VALUES (15, 'Driving down to Miami for a much needed vacation. Message me for more info!', 2, 50, '2020-01-05', 1, '625', 2500, 10, 13, 17, 9, 'Miami Vacation', 'https://i.imgur.com/xktTzwh.jpg');
INSERT INTO `trip` (`id`, `description`, `seats_available`, `cargo_capacity`, `create_date`, `enabled`, `total_cost`, `miles`, `vehicle_id`, `depart_address_id`, `destination_address_id`, `host_id`, `title`, `feature_image`) VALUES (16, 'I\'m attending a conference in Seattle and would love a couple travel companions. Let me know!', 3, 23, '2020-01-05', 1, '550', 1400, 10, 20, 11, 11, 'Seattle Bound', 'https://i.imgur.com/DASQ1zs.jpg');
INSERT INTO `trip` (`id`, `description`, `seats_available`, `cargo_capacity`, `create_date`, `enabled`, `total_cost`, `miles`, `vehicle_id`, `depart_address_id`, `destination_address_id`, `host_id`, `title`, `feature_image`) VALUES (17, 'Hello, all. I\'ll be heading to Seattle for a week to see friends. Drop me a line if you\'re interested in joining!', 2, 43, '2020-01-05', 1, '475', 1600, 9, 22, 19, 10, 'Trip to Seattle', 'https://i.imgur.com/hH9OAv0.jpg');
INSERT INTO `trip` (`id`, `description`, `seats_available`, `cargo_capacity`, `create_date`, `enabled`, `total_cost`, `miles`, `vehicle_id`, `depart_address_id`, `destination_address_id`, `host_id`, `title`, `feature_image`) VALUES (18, 'I\'m relocating to the Seattle area and will be travelling cross country. Would love to share the trip with a couple people.', 3, 35, '2020-01-05', 1, '625', 1800, 8, 23, 11, 9, 'Seattle Move', 'https://i.imgur.com/lVkTd0S.jpg');
INSERT INTO `trip` (`id`, `description`, `seats_available`, `cargo_capacity`, `create_date`, `enabled`, `total_cost`, `miles`, `vehicle_id`, `depart_address_id`, `destination_address_id`, `host_id`, `title`, `feature_image`) VALUES (19, 'I have family in Seattle that I\'ll be visiting for a month or so. Am looking to find some nice people to come along for the ride.', 4, 56, '2020-01-05', 1, '350', 1300, 7, 24, 19, 8, 'Visiting Seattle', 'https://i.imgur.com/yuPqj2d.jpg');
INSERT INTO `trip` (`id`, `description`, `seats_available`, `cargo_capacity`, `create_date`, `enabled`, `total_cost`, `miles`, `vehicle_id`, `depart_address_id`, `destination_address_id`, `host_id`, `title`, `feature_image`) VALUES (20, 'I split my year between Wichita and Seattle. Am now driving back to Seattle in a week. Join the trip if you like!', 3, 34, '2020-01-05', 1, '470', 1800, 6, 23, 11, 7, 'Driving to Seattle', 'https://i.imgur.com/mog69ll.jpg');
INSERT INTO `trip` (`id`, `description`, `seats_available`, `cargo_capacity`, `create_date`, `enabled`, `total_cost`, `miles`, `vehicle_id`, `depart_address_id`, `destination_address_id`, `host_id`, `title`, `feature_image`) VALUES (21, 'Hey everybody. I have business to attend to in Seattle. Would appreciate the company on the long drive. Just let me know.', 2, 32, '2020-01-05', 1, '500', 1300, 5, 15, 19, 6, 'Denver to Seattle', 'https://i.imgur.com/oXdp1yL.jpg');
INSERT INTO `trip` (`id`, `description`, `seats_available`, `cargo_capacity`, `create_date`, `enabled`, `total_cost`, `miles`, `vehicle_id`, `depart_address_id`, `destination_address_id`, `host_id`, `title`, `feature_image`) VALUES (22, 'I\'m driving to Seattle to visit a sick relative for some time. It would be great to have some company for the trip.', 2, 21, '2020-01-05', 1, '495', 1800, 4, 23, 11, 5, 'Travel to Seattle', 'https://i.imgur.com/KNaQbkB.jpg');
INSERT INTO `trip` (`id`, `description`, `seats_available`, `cargo_capacity`, `create_date`, `enabled`, `total_cost`, `miles`, `vehicle_id`, `depart_address_id`, `destination_address_id`, `host_id`, `title`, `feature_image`) VALUES (23, 'Hi there! I\'m going on vacation in the Seattle area. I will have extra room in my car for a few passengers. Come and join!', 3, 234, '2020-01-05', 1, '350', 1600, 3, 22, 19, 4, 'Seattle Vaction', 'https://i.imgur.com/3Wg9kKZ.jpg');
INSERT INTO `trip` (`id`, `description`, `seats_available`, `cargo_capacity`, `create_date`, `enabled`, `total_cost`, `miles`, `vehicle_id`, `depart_address_id`, `destination_address_id`, `host_id`, `title`, `feature_image`) VALUES (24, 'I have a few weeks off from work, so I\'m going to stay with some friends in Seattle. Would be awesome to have you come join my road trip!', 3, 4334, '2020-01-05', 1, '250', 1400, 2, 20, 11, 3, 'Holiday in Seattle', 'https://i.imgur.com/XqFTs2P.jpg');

COMMIT;


-- -----------------------------------------------------
-- Data for table `trip_host_review_of_passenger`
-- -----------------------------------------------------
START TRANSACTION;
USE `caravandb`;
INSERT INTO `trip_host_review_of_passenger` (`id`, `user_profile_id`, `rating`, `review`, `trip_id`) VALUES (1, 2, 5, 'Coolest passenger ever.', 1);
INSERT INTO `trip_host_review_of_passenger` (`id`, `user_profile_id`, `rating`, `review`, `trip_id`) VALUES (2, 3, 5, 'Super cool passenger', 1);

COMMIT;


-- -----------------------------------------------------
-- Data for table `category`
-- -----------------------------------------------------
START TRANSACTION;
USE `caravandb`;
INSERT INTO `category` (`id`, `name`) VALUES (1, 'passenger trip');
INSERT INTO `category` (`id`, `name`) VALUES (2, 'cargo');

COMMIT;


-- -----------------------------------------------------
-- Data for table `adventure`
-- -----------------------------------------------------
START TRANSACTION;
USE `caravandb`;
INSERT INTO `adventure` (`id`, `title`, `description`, `activity_level`, `includes`, `price`, `enabled`, `itinerary`, `address_id`, `host_id`, `feature_image`) VALUES (1, 'Grand Canyon', 'Taking a week-long trip to the grand canyon with my pup Sally!', 'high', 'bed and breakfast', 250, 1, 'day one: see the canyon. day two: see more of the canyone. day three: see a little more canyone', 1, 1, NULL);

COMMIT;


-- -----------------------------------------------------
-- Data for table `adventure_category`
-- -----------------------------------------------------
START TRANSACTION;
USE `caravandb`;
INSERT INTO `adventure_category` (`category_id`, `adventure_id`) VALUES (1, 1);

COMMIT;


-- -----------------------------------------------------
-- Data for table `trip_category`
-- -----------------------------------------------------
START TRANSACTION;
USE `caravandb`;
INSERT INTO `trip_category` (`trip_id`, `category_id`) VALUES (1, 1);

COMMIT;


-- -----------------------------------------------------
-- Data for table `trip_traveler_review_of_host`
-- -----------------------------------------------------
START TRANSACTION;
USE `caravandb`;
INSERT INTO `trip_traveler_review_of_host` (`id`, `rating`, `review`, `contribution_pledged`, `attended`, `contribution_actual`, `trip_id`, `user_profile_id`, `approved`, `traveler_status`) VALUES (1, '5', 'I joined up with this trip in Missouri. Larry was a great host. Dropped me off where I needed. Great guy. Hope to do it again.', 50, 1, 50, 1, 2, 1, 'Approved');
INSERT INTO `trip_traveler_review_of_host` (`id`, `rating`, `review`, `contribution_pledged`, `attended`, `contribution_actual`, `trip_id`, `user_profile_id`, `approved`, `traveler_status`) VALUES (2, '5', 'Graceland was so cool! Thanks, Shaun! What a great trip :)', 35, 1, 35, 1, 3, 1, 'Approved');
INSERT INTO `trip_traveler_review_of_host` (`id`, `rating`, `review`, `contribution_pledged`, `attended`, `contribution_actual`, `trip_id`, `user_profile_id`, `approved`, `traveler_status`) VALUES (3, '4', 'I got car sick (sorry, Larry!), but otherwise was a good trip. I really liked seeing Elvis\' sequiny jump suits. Super cool.', 20, 1, 20, 2, 5, 1, 'Approved');

COMMIT;


-- -----------------------------------------------------
-- Data for table `trip_message`
-- -----------------------------------------------------
START TRANSACTION;
USE `caravandb`;
INSERT INTO `trip_message` (`id`, `date_posted`, `content`, `reply_to_id`, `trip_id`, `user_profile_id`) VALUES (1, '2019-09-09', 'This trip is super awesome.', '1', 1, 1);

COMMIT;


-- -----------------------------------------------------
-- Data for table `trip_calendar`
-- -----------------------------------------------------
START TRANSACTION;
USE `caravandb`;
INSERT INTO `trip_calendar` (`id`, `start_date`, `end_date`, `availability`, `trip_id`) VALUES (1, '2020-01-09', '2017-01-16', NULL, 1);
INSERT INTO `trip_calendar` (`id`, `start_date`, `end_date`, `availability`, `trip_id`) VALUES (2, '2020-01-20', '2020-01-25', NULL, 2);
INSERT INTO `trip_calendar` (`id`, `start_date`, `end_date`, `availability`, `trip_id`) VALUES (3, '2020-01-21', '2020-01-26', NULL, 3);
INSERT INTO `trip_calendar` (`id`, `start_date`, `end_date`, `availability`, `trip_id`) VALUES (4, '2020-01-22', '2020-01-27', NULL, 4);
INSERT INTO `trip_calendar` (`id`, `start_date`, `end_date`, `availability`, `trip_id`) VALUES (5, '2020-01-23', '2020-01-28', NULL, 5);
INSERT INTO `trip_calendar` (`id`, `start_date`, `end_date`, `availability`, `trip_id`) VALUES (6, '2020-01-23', '2020-01-28', NULL, 6);
INSERT INTO `trip_calendar` (`id`, `start_date`, `end_date`, `availability`, `trip_id`) VALUES (7, '2020-01-23', '2020-01-28', NULL, 7);
INSERT INTO `trip_calendar` (`id`, `start_date`, `end_date`, `availability`, `trip_id`) VALUES (8, '2020-01-23', '2020-01-28', NULL, 8);
INSERT INTO `trip_calendar` (`id`, `start_date`, `end_date`, `availability`, `trip_id`) VALUES (9, '2020-01-23', '2020-01-28', NULL, 9);
INSERT INTO `trip_calendar` (`id`, `start_date`, `end_date`, `availability`, `trip_id`) VALUES (10, '2020-01-23', '2020-01-28', NULL, 10);
INSERT INTO `trip_calendar` (`id`, `start_date`, `end_date`, `availability`, `trip_id`) VALUES (11, '2020-01-23', '2020-01-28', NULL, 11);
INSERT INTO `trip_calendar` (`id`, `start_date`, `end_date`, `availability`, `trip_id`) VALUES (12, '2020-01-23', '2020-01-28', NULL, 12);
INSERT INTO `trip_calendar` (`id`, `start_date`, `end_date`, `availability`, `trip_id`) VALUES (13, '2020-01-23', '2020-01-28', NULL, 13);
INSERT INTO `trip_calendar` (`id`, `start_date`, `end_date`, `availability`, `trip_id`) VALUES (14, '2020-01-23', '2020-01-28', NULL, 14);
INSERT INTO `trip_calendar` (`id`, `start_date`, `end_date`, `availability`, `trip_id`) VALUES (15, '2020-01-23', '2020-01-28', NULL, 15);
INSERT INTO `trip_calendar` (`id`, `start_date`, `end_date`, `availability`, `trip_id`) VALUES (16, '2020-01-23', '2020-01-28', NULL, 16);
INSERT INTO `trip_calendar` (`id`, `start_date`, `end_date`, `availability`, `trip_id`) VALUES (17, '2020-01-23', '2020-01-28', NULL, 17);
INSERT INTO `trip_calendar` (`id`, `start_date`, `end_date`, `availability`, `trip_id`) VALUES (18, '2020-01-23', '2020-01-28', NULL, 18);
INSERT INTO `trip_calendar` (`id`, `start_date`, `end_date`, `availability`, `trip_id`) VALUES (19, '2020-01-23', '2020-01-28', NULL, 19);
INSERT INTO `trip_calendar` (`id`, `start_date`, `end_date`, `availability`, `trip_id`) VALUES (20, '2020-01-23', '2020-01-28', NULL, 20);
INSERT INTO `trip_calendar` (`id`, `start_date`, `end_date`, `availability`, `trip_id`) VALUES (21, '2020-01-23', '2020-01-28', NULL, 21);
INSERT INTO `trip_calendar` (`id`, `start_date`, `end_date`, `availability`, `trip_id`) VALUES (22, '2020-01-23', '2020-01-28', NULL, 22);
INSERT INTO `trip_calendar` (`id`, `start_date`, `end_date`, `availability`, `trip_id`) VALUES (23, '2020-01-23', '2020-01-28', NULL, 23);
INSERT INTO `trip_calendar` (`id`, `start_date`, `end_date`, `availability`, `trip_id`) VALUES (24, '2020-01-23', '2020-01-28', NULL, 24);

COMMIT;


-- -----------------------------------------------------
-- Data for table `adventure_calendar`
-- -----------------------------------------------------
START TRANSACTION;
USE `caravandb`;
INSERT INTO `adventure_calendar` (`id`, `start_date`, `end_date`, `availability`, `adventure_id`) VALUES (1, '2019-10-15', '2019-10-25', 'yes', 1);

COMMIT;


-- -----------------------------------------------------
-- Data for table `trip_traveler_img`
-- -----------------------------------------------------
START TRANSACTION;
USE `caravandb`;
INSERT INTO `trip_traveler_img` (`image_id`, `trip_traveler_id`) VALUES (1, 1);

COMMIT;


-- -----------------------------------------------------
-- Data for table `dm`
-- -----------------------------------------------------
START TRANSACTION;
USE `caravandb`;
INSERT INTO `dm` (`id`, `date_posted`, `my_id`, `friend_id`, `message`) VALUES (1, '2019-12-29', 3, 2, 'Hey! Do you like road trip?');
INSERT INTO `dm` (`id`, `date_posted`, `my_id`, `friend_id`, `message`) VALUES (2, '2019-12-29', 2, 3, 'Oh, do I! Road trips are my life air!');
INSERT INTO `dm` (`id`, `date_posted`, `my_id`, `friend_id`, `message`) VALUES (3, '2019-12-29', 3, 2, 'Same bro. Let\'s road trip together.');
INSERT INTO `dm` (`id`, `date_posted`, `my_id`, `friend_id`, `message`) VALUES (4, '2019-12-29', 2, 3, 'Sounds amazing man. Let\'s do it!');
INSERT INTO `dm` (`id`, `date_posted`, `my_id`, `friend_id`, `message`) VALUES (10, '2019-12-30', 5, 3, 'Hi. I\'m Frank. I\'m trying to go to Branson. I see you\'re going to the Titanic museum there. Can I hitch along?');
INSERT INTO `dm` (`id`, `date_posted`, `my_id`, `friend_id`, `message`) VALUES (11, '2019-12-30', 3, 5, 'Hey wassup homie. Sure thing.');
INSERT INTO `dm` (`id`, `date_posted`, `my_id`, `friend_id`, `message`) VALUES (12, '2019-12-30', 5, 3, 'Perfect!');

COMMIT;


-- -----------------------------------------------------
-- Data for table `trip_host_img`
-- -----------------------------------------------------
START TRANSACTION;
USE `caravandb`;
INSERT INTO `trip_host_img` (`trip_host_id`, `image_id`) VALUES (1, 1);

COMMIT;


-- -----------------------------------------------------
-- Data for table `adventure_img`
-- -----------------------------------------------------
START TRANSACTION;
USE `caravandb`;
INSERT INTO `adventure_img` (`adventure_id`, `image_id`) VALUES (1, 2);

COMMIT;


-- -----------------------------------------------------
-- Data for table `adventure_traveler_review_of_host`
-- -----------------------------------------------------
START TRANSACTION;
USE `caravandb`;
INSERT INTO `adventure_traveler_review_of_host` (`id`, `rating`, `review`, `attended`, `traveler_status`, `adventure_id`, `user_profile_id`, `approved`) VALUES (1, 5, 'This was the greatest adventure of my entire life. Seeing the Grand Canyon fundamentally changed me as a human being. Now food tastes better, the air smells better, colors seem more bright and vivid. I love life and all that is within it. God bless the Grand Canyon, and God bless Mr. Userface. 10/10 would do again.', 1, 'finished', 1, 6, 1);

COMMIT;


-- -----------------------------------------------------
-- Data for table `adventure_host_review_of_traveler`
-- -----------------------------------------------------
START TRANSACTION;
USE `caravandb`;
INSERT INTO `adventure_host_review_of_traveler` (`id`, `rating`, `review`, `user_profile_id`, `adventure_id`) VALUES (1, 4, 'Mr. Jimbob was a great travelling companion. And who knew he would turn out to be the love of my life, as well. I love you, sweeheart.', 6, 1);

COMMIT;

