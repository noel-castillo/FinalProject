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
  PRIMARY KEY (`id`))
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
  `profile_pic_id` INT NOT NULL,
  `address_id` INT NOT NULL,
  `email` VARCHAR(45) NULL,
  `phone` VARCHAR(45) NULL,
  `registration_date` DATE NULL,
  `user_id` INT NOT NULL,
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
  `description` VARCHAR(255) NULL,
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
  `description` VARCHAR(400) NULL,
  `activity_level` VARCHAR(200) NULL,
  `includes` VARCHAR(200) NULL,
  `price` DOUBLE NULL,
  `enabled` TINYINT NULL,
  `itinerary` VARCHAR(200) NULL,
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
  `sender_id` INT NULL,
  `receiver_id` INT NULL,
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
-- Data for table `user`
-- -----------------------------------------------------
START TRANSACTION;
USE `caravandb`;
INSERT INTO `user` (`id`, `username`, `password`, `role`, `enabled`) VALUES (1, 'userface', '$2a$10$KzG5DFbaZeuvJoCif7PHTe7d.2obaHYg44nOwaEvFQeOFieX7Mfa2', NULL, 1);
INSERT INTO `user` (`id`, `username`, `password`, `role`, `enabled`) VALUES (2, 'user2', '$2y$10$XDWoLVCP69pKoNt62pNmxupUKNZCaC7mM7aIAX5GBZDrNbBiDTbrO\n', NULL, 1);
INSERT INTO `user` (`id`, `username`, `password`, `role`, `enabled`) VALUES (3, 'shaun', '$2a$10$4SMKDcs9jT18dbFxqtIqDeLEynC7MUrCEUbv1a/bhO.x9an9WGPvm', NULL, 1);

COMMIT;


-- -----------------------------------------------------
-- Data for table `image`
-- -----------------------------------------------------
START TRANSACTION;
USE `caravandb`;
INSERT INTO `image` (`id`, `url`) VALUES (1, 'https://i.imgur.com/KPILGym.png');
INSERT INTO `image` (`id`, `url`) VALUES (2, 'https://imgur.com/2DmETHE');

COMMIT;


-- -----------------------------------------------------
-- Data for table `address`
-- -----------------------------------------------------
START TRANSACTION;
USE `caravandb`;
INSERT INTO `address` (`id`, `street`, `city`, `state`, `zip`, `latitude`, `longitude`) VALUES (1, '456 Fake Avenue', 'Faketown', 'CO', 80220, '39.7', '105.0');
INSERT INTO `address` (`id`, `street`, `city`, `state`, `zip`, `latitude`, `longitude`) VALUES (2, '3764 Elvis Presley Boulevard', 'Memphis', 'TN', 38116, '35.15', '90.05');
INSERT INTO `address` (`id`, `street`, `city`, `state`, `zip`, `latitude`, `longitude`) VALUES (3, '987 Shaun Street', 'Shauntown', 'CO', 80116, '39.62', '104.87');
INSERT INTO `address` (`id`, `street`, `city`, `state`, `zip`, `latitude`, `longitude`) VALUES (4, '314 S Park St,', 'Kalamazoo', 'MI', 49007, NULL, NULL);

COMMIT;


-- -----------------------------------------------------
-- Data for table `user_profile`
-- -----------------------------------------------------
START TRANSACTION;
USE `caravandb`;
INSERT INTO `user_profile` (`id`, `first_name`, `last_name`, `bio`, `mileage_points`, `profile_pic_id`, `address_id`, `email`, `phone`, `registration_date`, `user_id`) VALUES (1, 'user', 'face', 'i\'m a user face', 25, 1, 1, 'userface@usermail.com', '555-555-9876', '2017-06-15', 1);
INSERT INTO `user_profile` (`id`, `first_name`, `last_name`, `bio`, `mileage_points`, `profile_pic_id`, `address_id`, `email`, `phone`, `registration_date`, `user_id`) VALUES (2, 'user', '2', 'i\'m user 2!', 300, 2, 2, 'user2@user2mail.com', '555-555-6789', '2019-04-30', 2);
INSERT INTO `user_profile` (`id`, `first_name`, `last_name`, `bio`, `mileage_points`, `profile_pic_id`, `address_id`, `email`, `phone`, `registration_date`, `user_id`) VALUES (3, 'shaun', 'mcshaun', 'Hi, my name is Shaun. I like to go on trips and stuff.', 250, 2, 2, 'shaun@shaunmail.com', '555-234-1239', '2019-12-18', 3);

COMMIT;


-- -----------------------------------------------------
-- Data for table `vehicle`
-- -----------------------------------------------------
START TRANSACTION;
USE `caravandb`;
INSERT INTO `vehicle` (`id`, `make`, `model`, `manufacture_year`, `capacity`, `seats_available`, `interior_description`, `user_profile_id`) VALUES (1, 'toyota', 'corolla', 1996, 40, 3, 'very nice', 1);
INSERT INTO `vehicle` (`id`, `make`, `model`, `manufacture_year`, `capacity`, `seats_available`, `interior_description`, `user_profile_id`) VALUES (2, 'honda', 'accord', 1993, 38, 4, 'kinda old looking', 3);

COMMIT;


-- -----------------------------------------------------
-- Data for table `trip`
-- -----------------------------------------------------
START TRANSACTION;
USE `caravandb`;
INSERT INTO `trip` (`id`, `description`, `seats_available`, `cargo_capacity`, `create_date`, `enabled`, `total_cost`, `miles`, `vehicle_id`, `depart_address_id`, `destination_address_id`, `host_id`) VALUES (1, 'Goin to Graceland!', 4, 50, '2017-08-29', 1, 300, 600, 1, 1, 2, 1);
INSERT INTO `trip` (`id`, `description`, `seats_available`, `cargo_capacity`, `create_date`, `enabled`, `total_cost`, `miles`, `vehicle_id`, `depart_address_id`, `destination_address_id`, `host_id`) VALUES (2, 'Let\'s go to Kalamazoo Institue of Arts for their annual ', 2, 36, '2019-12-29', 1, 25, 750, 2, 3, 4, 3);

COMMIT;


-- -----------------------------------------------------
-- Data for table `trip_host`
-- -----------------------------------------------------
START TRANSACTION;
USE `caravandb`;
INSERT INTO `trip_host` (`id`, `user_profile_id`, `rating`, `review`, `trip_id`) VALUES (1, 2, 5, 'Coolest Host ever.', 1);
INSERT INTO `trip_host` (`id`, `user_profile_id`, `rating`, `review`, `trip_id`) VALUES (2, 3, 5, 'Super cool host', 2);

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
INSERT INTO `adventure` (`id`, `title`, `description`, `activity_level`, `includes`, `price`, `enabled`, `itinerary`, `address_id`, `host_id`) VALUES (1, 'Grand Canyon', 'Taking a week-long trip to the grand canyon with my pup Sally!', 'high', 'bed and breakfast', 250, 1, 'day one: see the canyon. day two: see more of the canyone. day three: see a little more canyone', 1, 1);

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
-- Data for table `trip_traveler`
-- -----------------------------------------------------
START TRANSACTION;
USE `caravandb`;
INSERT INTO `trip_traveler` (`id`, `rating`, `review`, `contribution_pledged`, `attended`, `contribution_actual`, `trip_id`, `user_profile_id`) VALUES (1, 5, 'fantastic', 10, 1, 10, 1, 1);

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
INSERT INTO `trip_calendar` (`id`, `start_date`, `end_date`, `availability`, `trip_id`) VALUES (1, '2017-07-18', '2017-07-20', 'available', 1);

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
INSERT INTO `dm` (`id`, `sender_id`, `receiver_id`, `content`, `date_posted`, `user_profile_id`) VALUES (1, 1, 2, 'Hey. You\'re a cool guy.', '2017-09-30', 1);

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

