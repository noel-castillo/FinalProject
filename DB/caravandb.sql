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
  `id` INT NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(45) NULL,
  `last_name` VARCHAR(45) NULL,
  `bio` VARCHAR(300) NULL,
  `mileage_points` INT NULL,
  `profile_pic_id` INT NULL,
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
  `total_cost` DOUBLE NULL,
  `miles` DOUBLE NULL,
  `vehicle_id` INT NULL,
  `depart_address_id` INT NULL,
  `destination_address_id` INT NULL,
  `host_id` INT NULL,
  `title` VARCHAR(150) NULL,
  `feature_image` VARCHAR(200) NULL,
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
-- Table `trip_traveler_review_of_host`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `trip_traveler_review_of_host` ;

CREATE TABLE IF NOT EXISTS `trip_traveler_review_of_host` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `rating` DOUBLE NULL,
  `review` VARCHAR(400) NULL,
  `contribution_pledged` DOUBLE NULL,
  `attended` TINYINT NULL,
  `contribution_actual` DOUBLE NULL,
  `trip_id` INT NOT NULL,
  `user_profile_id` INT NOT NULL,
  `approved` TINYINT NULL DEFAULT 0,
  `traveler_status` VARCHAR(35) NULL,
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
INSERT INTO `user` (`id`, `username`, `password`, `role`, `enabled`) VALUES (1, 'userface', '$2a$10$KzG5DFbaZeuvJoCif7PHTe7d.2obaHYg44nOwaEvFQeOFieX7Mfa2', 'admin', 1);
INSERT INTO `user` (`id`, `username`, `password`, `role`, `enabled`) VALUES (2, 'user2', '$2a$10$Tsz6Wn6fBbMYoEPPNCyuxusUqP1bnduB8tej9jR4m4NODWSWodmp2', NULL, 1);
INSERT INTO `user` (`id`, `username`, `password`, `role`, `enabled`) VALUES (3, 'shaun', '$2a$10$4SMKDcs9jT18dbFxqtIqDeLEynC7MUrCEUbv1a/bhO.x9an9WGPvm', NULL, 1);
INSERT INTO `user` (`id`, `username`, `password`, `role`, `enabled`) VALUES (4, 'johnson', 'johnson', NULL, 1);
INSERT INTO `user` (`id`, `username`, `password`, `role`, `enabled`) VALUES (5, 'frank', 'frank', NULL, 1);
INSERT INTO `user` (`id`, `username`, `password`, `role`, `enabled`) VALUES (6, 'jimbob', 'jimbob', NULL, 1);

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

COMMIT;


-- -----------------------------------------------------
-- Data for table `address`
-- -----------------------------------------------------
START TRANSACTION;
USE `caravandb`;
INSERT INTO `address` (`id`, `street`, `city`, `state`, `zip`, `latitude`, `longitude`) VALUES (1, '456 Fake Avenue', 'Faketown', 'CO', 80220, '39.7', '-105.0');
INSERT INTO `address` (`id`, `street`, `city`, `state`, `zip`, `latitude`, `longitude`) VALUES (2, '3764 Elvis Presley Boulevard', 'Memphis', 'TN', 38116, '35.15', '-90.05');
INSERT INTO `address` (`id`, `street`, `city`, `state`, `zip`, `latitude`, `longitude`) VALUES (3, '987 Shaun Street', 'Shauntown', 'CO', 80116, '39.62', '-104.87');
INSERT INTO `address` (`id`, `street`, `city`, `state`, `zip`, `latitude`, `longitude`) VALUES (4, '314 S Park St', 'Kalamazoo', 'MI', 49007, '42.29', '-85.59');
INSERT INTO `address` (`id`, `street`, `city`, `state`, `zip`, `latitude`, `longitude`) VALUES (5, '2530 Arlene Ave', 'Lincoln', 'NE', 68502, '40.78', '-96.69');
INSERT INTO `address` (`id`, `street`, `city`, `state`, `zip`, `latitude`, `longitude`) VALUES (6, 'W 99th Street', 'Chicago', 'IL', 60655, '41.71', '-87.72');
INSERT INTO `address` (`id`, `street`, `city`, `state`, `zip`, `latitude`, `longitude`) VALUES (7, '7857 Texhoma Ave', 'Los Angeles', 'CA', 91325, '34.21', '-118.52');
INSERT INTO `address` (`id`, `street`, `city`, `state`, `zip`, `latitude`, `longitude`) VALUES (8, '3235 76 Country Blvd & Hwy 165', 'Branson', 'MO', 65616, '36.64', '-93.28');
INSERT INTO `address` (`id`, `street`, `city`, `state`, `zip`, `latitude`, `longitude`) VALUES (9, '88 River Road', 'Gatlinburg', 'TN', 37738, '35.71', '-83.51');
INSERT INTO `address` (`id`, `street`, `city`, `state`, `zip`, `latitude`, `longitude`) VALUES (10, '915 Westgate Resorts Rd', 'Gatlinburg', 'TN', 37738, '35.71', '-83.51');

COMMIT;


-- -----------------------------------------------------
-- Data for table `user_profile`
-- -----------------------------------------------------
START TRANSACTION;
USE `caravandb`;
INSERT INTO `user_profile` (`id`, `first_name`, `last_name`, `bio`, `mileage_points`, `profile_pic_id`, `address_id`, `email`, `phone`, `registration_date`, `user_id`) VALUES (1, 'user', 'face', 'i\'m a user face', 25, 2, 1, 'userface@usermail.com', '555-555-9876', '2017-06-15', 1);
INSERT INTO `user_profile` (`id`, `first_name`, `last_name`, `bio`, `mileage_points`, `profile_pic_id`, `address_id`, `email`, `phone`, `registration_date`, `user_id`) VALUES (2, 'user', '2', 'i\'m user 2!', 300, 3, 2, 'user2@user2mail.com', '555-555-6789', '2019-04-30', 2);
INSERT INTO `user_profile` (`id`, `first_name`, `last_name`, `bio`, `mileage_points`, `profile_pic_id`, `address_id`, `email`, `phone`, `registration_date`, `user_id`) VALUES (3, 'shaun', 'mcshaun', 'Hi, my name is Shaun. I like to go on trips and stuff.', 250, 4, 2, 'shaun@shaunmail.com', '555-234-1239', '2019-12-18', 3);
INSERT INTO `user_profile` (`id`, `first_name`, `last_name`, `bio`, `mileage_points`, `profile_pic_id`, `address_id`, `email`, `phone`, `registration_date`, `user_id`) VALUES (4, 'johnson', 'mcjohnson', 'Hello, I am Johnson McJohnson! Let\'s go road tripping together :D', 14, 5, 5, 'johnson@johnson.com', '555-234-1238', '2019-12-19', 4);
INSERT INTO `user_profile` (`id`, `first_name`, `last_name`, `bio`, `mileage_points`, `profile_pic_id`, `address_id`, `email`, `phone`, `registration_date`, `user_id`) VALUES (5, 'frank', 'mcfrank', 'Hi. I\'m Frank, and boy do I like to go on road trips.', 1000, 6, 6, 'frank@frank.com', '555-234-1237', '2019-12-20', 5);
INSERT INTO `user_profile` (`id`, `first_name`, `last_name`, `bio`, `mileage_points`, `profile_pic_id`, `address_id`, `email`, `phone`, `registration_date`, `user_id`) VALUES (6, 'jimbob', 'mcjimbob', 'Howdy thar! Come a-travelin\' with me, Jimbob McJimbob', 750, 7, 7, 'jimbob@jimbob.com', '555-234-1236', '2019-12-21', 6);

COMMIT;


-- -----------------------------------------------------
-- Data for table `vehicle`
-- -----------------------------------------------------
START TRANSACTION;
USE `caravandb`;
INSERT INTO `vehicle` (`id`, `make`, `model`, `manufacture_year`, `capacity`, `seats_available`, `interior_description`, `user_profile_id`) VALUES (1, 'Toyota', 'Corolla', 1996, 40, 3, 'very nice', 1);
INSERT INTO `vehicle` (`id`, `make`, `model`, `manufacture_year`, `capacity`, `seats_available`, `interior_description`, `user_profile_id`) VALUES (2, 'Honda', 'Accord', 1993, 38, 4, 'kinda old looking', 3);
INSERT INTO `vehicle` (`id`, `make`, `model`, `manufacture_year`, `capacity`, `seats_available`, `interior_description`, `user_profile_id`) VALUES (3, 'GMC', 'Yukon', 2012, 37, 5, 'Very nice and clean.', 4);
INSERT INTO `vehicle` (`id`, `make`, `model`, `manufacture_year`, `capacity`, `seats_available`, `interior_description`, `user_profile_id`) VALUES (4, 'Chevrolet', 'Tahoe', 2010, 30, 4, 'Lots of room to stretch out.', 5);
INSERT INTO `vehicle` (`id`, `make`, `model`, `manufacture_year`, `capacity`, `seats_available`, `interior_description`, `user_profile_id`) VALUES (5, 'Ford', 'Mustag', 1999, 25, 1, 'Sporty, so not a lot of room inside.', 6);

COMMIT;


-- -----------------------------------------------------
-- Data for table `trip`
-- -----------------------------------------------------
START TRANSACTION;
USE `caravandb`;
INSERT INTO `trip` (`id`, `description`, `seats_available`, `cargo_capacity`, `create_date`, `enabled`, `total_cost`, `miles`, `vehicle_id`, `depart_address_id`, `destination_address_id`, `host_id`, `title`, `feature_image`) VALUES (1, 'Goin to Graceland!', 4, 50, '2017-08-29', 1, 300, 600, 1, 1, 2, 1, 'Goin to Graceland', 'https://i.imgur.com/Iy01VVJ.jpg');
INSERT INTO `trip` (`id`, `description`, `seats_available`, `cargo_capacity`, `create_date`, `enabled`, `total_cost`, `miles`, `vehicle_id`, `depart_address_id`, `destination_address_id`, `host_id`, `title`, `feature_image`) VALUES (2, 'Let\'s go to Kalamazoo Institue of Arts for their annual ', 2, 36, '2019-12-29', 1, 250, 750, 2, 3, 4, 3, 'Kalamazoo', 'https://i.imgur.com/Iy01VVJ.jpg');
INSERT INTO `trip` (`id`, `description`, `seats_available`, `cargo_capacity`, `create_date`, `enabled`, `total_cost`, `miles`, `vehicle_id`, `depart_address_id`, `destination_address_id`, `host_id`, `title`, `feature_image`) VALUES (3, 'I am going to the Titanic Museum in Branson, Missouri. Come along for the ride.', 3, 38, '2019-12-28', 1, 400, 800, 3, 5, 8, 4, 'Branson Titanic Museum', 'https://i.imgur.com/Iy01VVJ.jpg');
INSERT INTO `trip` (`id`, `description`, `seats_available`, `cargo_capacity`, `create_date`, `enabled`, `total_cost`, `miles`, `vehicle_id`, `depart_address_id`, `destination_address_id`, `host_id`, `title`, `feature_image`) VALUES (4, 'I\'m going to the awesome aquarium in Gatlinburg, TN', 2, 30, '2019-12-27', 1, 275, 300, 4, 6, 9, 5, 'Gatlinburg Aquarium', 'https://i.imgur.com/Iy01VVJ.jpg');
INSERT INTO `trip` (`id`, `description`, `seats_available`, `cargo_capacity`, `create_date`, `enabled`, `total_cost`, `miles`, `vehicle_id`, `depart_address_id`, `destination_address_id`, `host_id`, `title`, `feature_image`) VALUES (5, 'I plan to go this really sweet indoor water park in Pigeon Forge, TN', 2, 40, '2019-12-26', 1, 1200, 3000, 5, 7, 10, 6, 'Pigeon Forge Indoor Water Park', 'https://i.imgur.com/Iy01VVJ.jpg');

COMMIT;


-- -----------------------------------------------------
-- Data for table `trip_host_review_of_passenger`
-- -----------------------------------------------------
START TRANSACTION;
USE `caravandb`;
INSERT INTO `trip_host_review_of_passenger` (`id`, `user_profile_id`, `rating`, `review`, `trip_id`) VALUES (1, 2, 5, 'Coolest Host ever.', 1);
INSERT INTO `trip_host_review_of_passenger` (`id`, `user_profile_id`, `rating`, `review`, `trip_id`) VALUES (2, 3, 5, 'Super cool host', 1);

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
-- Data for table `vehicle_image`
-- -----------------------------------------------------
START TRANSACTION;
USE `caravandb`;
INSERT INTO `vehicle_image` (`vehicle_id`, `image_id`) VALUES (1, 2);
INSERT INTO `vehicle_image` (`vehicle_id`, `image_id`) VALUES (2, 1);

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
INSERT INTO `trip_traveler_review_of_host` (`id`, `rating`, `review`, `contribution_pledged`, `attended`, `contribution_actual`, `trip_id`, `user_profile_id`, `approved`, `traveler_status`) VALUES (1, 5, 'fantastic', 10, 1, 10, 1, 1, 0, NULL);

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
INSERT INTO `trip_calendar` (`id`, `start_date`, `end_date`, `availability`, `trip_id`) VALUES (1, '2020-02-18', '2017-07-20', NULL, 1);
INSERT INTO `trip_calendar` (`id`, `start_date`, `end_date`, `availability`, `trip_id`) VALUES (2, '2020-01-20', '2020-01-25', NULL, 2);
INSERT INTO `trip_calendar` (`id`, `start_date`, `end_date`, `availability`, `trip_id`) VALUES (3, '2020-01-21', '2020-01-26', NULL, 3);
INSERT INTO `trip_calendar` (`id`, `start_date`, `end_date`, `availability`, `trip_id`) VALUES (4, '2020-01-22', '2020-01-27', NULL, 4);
INSERT INTO `trip_calendar` (`id`, `start_date`, `end_date`, `availability`, `trip_id`) VALUES (5, '2020-01-23', '2020-01-28', NULL, 5);

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
INSERT INTO `dm` (`id`, `date_posted`, `my_id`, `friend_id`, `message`) VALUES (1, '2019-12-29', 3, 2, 'hey bb. wyd?');
INSERT INTO `dm` (`id`, `date_posted`, `my_id`, `friend_id`, `message`) VALUES (2, '2019-12-29', 2, 3, 'chillin bb');
INSERT INTO `dm` (`id`, `date_posted`, `my_id`, `friend_id`, `message`) VALUES (3, '2019-12-29', 3, 2, 'awesome. wanna hang l8r?');
INSERT INTO `dm` (`id`, `date_posted`, `my_id`, `friend_id`, `message`) VALUES (4, '2019-12-29', 2, 3, 'fo sho. can we watch the bachelorette?');
INSERT INTO `dm` (`id`, `date_posted`, `my_id`, `friend_id`, `message`) VALUES (5, '2019-12-29', 3, 2, 'ofc lol');
INSERT INTO `dm` (`id`, `date_posted`, `my_id`, `friend_id`, `message`) VALUES (6, '2019-12-29', 2, 3, 'perfect');
INSERT INTO `dm` (`id`, `date_posted`, `my_id`, `friend_id`, `message`) VALUES (7, '2019-12-29', 3, 2, 'hey did u get ur test results back');
INSERT INTO `dm` (`id`, `date_posted`, `my_id`, `friend_id`, `message`) VALUES (8, '2019-12-29', 3, 2, 'bb?');
INSERT INTO `dm` (`id`, `date_posted`, `my_id`, `friend_id`, `message`) VALUES (9, '2019-12-29', 3, 2, 'r u there?');
INSERT INTO `dm` (`id`, `date_posted`, `my_id`, `friend_id`, `message`) VALUES (10, '2019-12-30', 5, 3, 'Hi. I\'m Frank. I\'m trying to go to Branson. I see you\'re going to the Titanic museum there. Can I hitch along?');
INSERT INTO `dm` (`id`, `date_posted`, `my_id`, `friend_id`, `message`) VALUES (11, '2019-12-30', 3, 5, 'Hey wassup homie. Sure thing. As long as you don\'t have b.o.! lol');
INSERT INTO `dm` (`id`, `date_posted`, `my_id`, `friend_id`, `message`) VALUES (12, '2019-12-30', 5, 3, 'Actually I kind of do have a body odor problem lol. but srsly. maybe I can just sit in the back and roll a window down');
INSERT INTO `dm` (`id`, `date_posted`, `my_id`, `friend_id`, `message`) VALUES (13, '2019-12-30', 3, 5, 'Oh dang. Sorry. hope i didn\'t offend. like how bad, on a scale of 1-10?');
INSERT INTO `dm` (`id`, `date_posted`, `my_id`, `friend_id`, `message`) VALUES (14, '2019-12-30', 5, 3, 'well, i guess it depends. i\'d say a 6.');
INSERT INTO `dm` (`id`, `date_posted`, `my_id`, `friend_id`, `message`) VALUES (15, '2019-12-30', 5, 3, 'maybe 7');
INSERT INTO `dm` (`id`, `date_posted`, `my_id`, `friend_id`, `message`) VALUES (16, '2019-12-30', 3, 5, 'let me think about it. i\'ll hit you back soon');
INSERT INTO `dm` (`id`, `date_posted`, `my_id`, `friend_id`, `message`) VALUES (17, '2019-12-30', 5, 3, NULL);

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

