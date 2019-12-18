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
  `id` INT NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(45) NULL,
  `last_name` VARCHAR(45) NULL,
  `bio` VARCHAR(300) NULL,
  `mileage_points` INT NULL,
  `profile_pic_id` INT NOT NULL,
  `address_id` INT NOT NULL,
  `email` VARCHAR(45) NULL,
  `phone` VARCHAR(45) NULL,
  `registration_date` DATE NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_user_profile_image1_idx` (`profile_pic_id` ASC),
  INDEX `fk_user_profile_address1_idx` (`address_id` ASC),
  CONSTRAINT `fk_user_profile_image1`
    FOREIGN KEY (`profile_pic_id`)
    REFERENCES `image` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_user_profile_address1`
    FOREIGN KEY (`address_id`)
    REFERENCES `address` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `user` ;

CREATE TABLE IF NOT EXISTS `user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(45) NULL,
  `password` VARCHAR(45) NULL,
  `role` VARCHAR(45) NULL,
  `enabled` TINYINT NOT NULL DEFAULT 1,
  `user_profile_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_user_user_profile1_idx` (`user_profile_id` ASC),
  CONSTRAINT `fk_user_user_profile1`
    FOREIGN KEY (`user_profile_id`)
    REFERENCES `user_profile` (`id`)
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
  `capactiy` INT NULL,
  `seats available` INT NULL,
  `interior_description` VARCHAR(45) NULL,
  `user_profile_id` INT NOT NULL,
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
  `description` VARCHAR(45) NULL,
  `seats_available` INT NULL,
  `cargo_capacity` DOUBLE NULL,
  `create_date` DATE NULL,
  `enabled` TINYINT NULL,
  `total_cost` DOUBLE NULL,
  `miles` DOUBLE NULL,
  `vehicle_id` INT NOT NULL,
  `depart_address_id` INT NOT NULL,
  `destination_address_id` INT NOT NULL,
  `host_id` INT NOT NULL,
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
-- Table `trip_host`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `trip_host` ;

CREATE TABLE IF NOT EXISTS `trip_host` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_profile_id` INT NOT NULL,
  `rating` DOUBLE NULL,
  `review` VARCHAR(400) NULL,
  `trip_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_trip_host_user_profile1_idx` (`user_profile_id` ASC),
  INDEX `fk_trip_host_trip1_idx` (`trip_id` ASC),
  CONSTRAINT `fk_trip_host_user_profile1`
    FOREIGN KEY (`user_profile_id`)
    REFERENCES `user_profile` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_trip_host_trip1`
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
  `description` VARCHAR(45) NULL,
  `activity_level` VARCHAR(45) NULL,
  `includes` VARCHAR(45) NULL,
  `price` DOUBLE NULL,
  `enabled` TINYINT NULL,
  `itinerary` VARCHAR(45) NULL,
  `address_id` INT NOT NULL,
  `host_id` INT NOT NULL,
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
-- Table `vehicle_image`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `vehicle_image` ;

CREATE TABLE IF NOT EXISTS `vehicle_image` (
  `vehicle_id` INT NOT NULL,
  `image_id` INT NOT NULL,
  INDEX `fk_vehicle_image_vehicle1_idx` (`vehicle_id` ASC),
  INDEX `fk_vehicle_image_image1_idx` (`image_id` ASC),
  CONSTRAINT `fk_vehicle_image_vehicle1`
    FOREIGN KEY (`vehicle_id`)
    REFERENCES `vehicle` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_vehicle_image_image1`
    FOREIGN KEY (`image_id`)
    REFERENCES `image` (`id`)
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
-- Table `trip_traveler`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `trip_traveler` ;

CREATE TABLE IF NOT EXISTS `trip_traveler` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `rating` DOUBLE NULL,
  `review` VARCHAR(400) NULL,
  `contribution_pledged` DOUBLE NULL,
  `attended` TINYINT NULL,
  `contribution_actual` DOUBLE NULL,
  `trip_id` INT NOT NULL,
  `user_profile_id` INT NOT NULL,
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
  `trip_id` INT NOT NULL,
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
  `adventure_id` INT NOT NULL,
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
    REFERENCES `trip_traveler` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `dm`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `dm` ;

CREATE TABLE IF NOT EXISTS `dm` (
  `id` INT NOT NULL,
  `sender_id` VARCHAR(45) NULL,
  `receiver_id` VARCHAR(45) NULL,
  `content` VARCHAR(45) NULL,
  `date_posted` VARCHAR(45) NULL,
  `user_profile_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_dm_user_profile1_idx` (`user_profile_id` ASC),
  CONSTRAINT `fk_dm_user_profile1`
    FOREIGN KEY (`user_profile_id`)
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
    REFERENCES `trip_host` (`id`)
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

SET SQL_MODE = '';
DROP USER IF EXISTS caravan@localhost;
SET SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';
CREATE USER 'caravan'@'localhost' IDENTIFIED BY 'caravan';

GRANT SELECT, INSERT, TRIGGER, UPDATE, DELETE ON TABLE * TO 'caravan'@'localhost';

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- Data for table `image`
-- -----------------------------------------------------
START TRANSACTION;
USE `caravandb`;
INSERT INTO `image` (`id`, `url`) VALUES (1, 'https://i.imgur.com/KPILGym.png');

COMMIT;


-- -----------------------------------------------------
-- Data for table `address`
-- -----------------------------------------------------
START TRANSACTION;
USE `caravandb`;
INSERT INTO `address` (`id`, `street`, `city`, `state`, `zip`, `latitude`, `longitude`) VALUES (1, '456 Fake Avenue', 'Faketown', 'CO', 80220, NULL, NULL);

COMMIT;


-- -----------------------------------------------------
-- Data for table `user_profile`
-- -----------------------------------------------------
START TRANSACTION;
USE `caravandb`;
INSERT INTO `user_profile` (`id`, `first_name`, `last_name`, `bio`, `mileage_points`, `profile_pic_id`, `address_id`, `email`, `phone`, `registration_date`) VALUES (1, 'user', 'face', 'i\'m a user face', 25, 1, 1, NULL, NULL, NULL);

COMMIT;


-- -----------------------------------------------------
-- Data for table `user`
-- -----------------------------------------------------
START TRANSACTION;
USE `caravandb`;
INSERT INTO `user` (`id`, `username`, `password`, `role`, `enabled`, `user_profile_id`) VALUES (1, 'userface', 'userface', 'rider', DEFAULT, 1);

COMMIT;

