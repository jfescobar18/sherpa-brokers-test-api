CREATE DATABASE IF NOT EXISTS `sherpa-brokers-test-db`;
USE `sherpa-brokers-test-db`;

CREATE TABLE IF NOT EXISTS `Categories` (
	`CategoryId` INT NOT NULL AUTO_INCREMENT,
    `CategoryName` VARCHAR(255) NOT NULL,
    PRIMARY KEY ( `CategoryId` )
);

INSERT INTO `Categories` (`CategoryId`, `CategoryName`)
SELECT NULL, "Beverages"  FROM DUAL
WHERE NOT EXISTS (SELECT `CategoryName` 
                    FROM `Categories` 
                    WHERE `CategoryName` = "Beverages" LIMIT 1);

INSERT INTO `Categories` (`CategoryId`, `CategoryName`)
SELECT NULL, "Fruits"  FROM DUAL
WHERE NOT EXISTS (SELECT `CategoryName` 
                    FROM `Categories` 
                    WHERE `CategoryName` = "Fruits" LIMIT 1);

INSERT INTO `Categories` (`CategoryId`, `CategoryName`)
SELECT NULL, "Fresh Food"  FROM DUAL
WHERE NOT EXISTS (SELECT `CategoryName` 
                    FROM `Categories` 
                    WHERE `CategoryName` = "Fresh Food" LIMIT 1);

CREATE TABLE IF NOT EXISTS `Products` (
    `ProductId` INT NOT NULL AUTO_INCREMENT,
    `ProductName` VARCHAR(255) NOT NULL,
    `ProductPrice` DECIMAL(6,2),
    `CategoryId` INT NOT NULL,
    PRIMARY KEY ( `ProductId` ),
    CONSTRAINT `CategoryId_FK`
        FOREIGN KEY ( `CategoryId` ) 
        REFERENCES `Categories`( `CategoryId` )
        ON DELETE NO ACTION
        ON UPDATE NO ACTION
);

INSERT INTO `Products` (`ProductId`, `ProductName`, `ProductPrice`. `CategoryId`)
SELECT NULL, "Coffee", "1", 1 FROM DUAL
WHERE NOT EXISTS (SELECT `ProductName` 
                    FROM `Products` 
                    WHERE `ProductName` = "Coffee" LIMIT 1);

INSERT INTO `Products` (`ProductId`, `ProductName`, `ProductPrice`. `CategoryId`)
SELECT NULL, "Banana", "1", 2 FROM DUAL
WHERE NOT EXISTS (SELECT `ProductName` 
                    FROM `Products` 
                    WHERE `ProductName` = "Banana" LIMIT 1);

INSERT INTO `Products` (`ProductId`, `ProductName`, `ProductPrice`. `CategoryId`)
SELECT NULL, "Beef", "8", 3 FROM DUAL
WHERE NOT EXISTS (SELECT `ProductName` 
                    FROM `Products` 
                    WHERE `ProductName` = "Beef" LIMIT 1);

CREATE TABLE IF NOT EXISTS `Admins` (
    `AdminId` INT NOT NULL AUTO_INCREMENT,
    `AdminUsername` VARCHAR(255) NOT NULL,
    `AdminPassword` VARCHAR(255) NOT NULL,
    `CreationDate` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`AdminId`)
);

-- Se@d0gs4rena --
INSERT INTO `Admins` (`AdminId`, `AdminUsername`, `AdminPassword`)
SELECT NULL, "jfescobar18@icloud.com", "$2b$10$pEbe5m2e6i2LqvmbLs7H7.wlgN84l5LmIWBbVbG1kXfRTIVFopqnC" FROM DUAL
WHERE NOT EXISTS (SELECT `AdminUsername`
                    FROM `Admins`
                    WHERE `AdminUsername` = "soundmaker" LIMIT 1);

CREATE TABLE IF NOT EXISTS `ProductsChangeLog` (
    `ProductsChangeLogId` INT NOT NULL AUTO_INCREMENT,
    `ProductsChangeLogDetails` TEXT NOT NULL,
    PRIMARY KEY (`ProductsChangeLogId`);

CREATE TABLE IF NOT EXISTS `ProductsChangeLog` (
    `ProductsChangeLogId` INT NOT NULL AUTO_INCREMENT,
    `ProductsChangeLogDetails` TEXT NOT NULL,
    PRIMARY KEY (`ProductsChangeLogId`);