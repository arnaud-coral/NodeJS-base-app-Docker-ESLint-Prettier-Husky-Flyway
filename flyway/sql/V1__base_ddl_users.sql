CREATE TABLE IF NOT EXISTS `users` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `client` VARCHAR(128) NOT NULL,
    `service` VARCHAR(128) NOT NULL,
    `key` VARCHAR(128) NOT NULL,
    `pass` VARCHAR(128) NOT NULL,
    `createdAt` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `updatedAt` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`)
);
ALTER TABLE `users` CHARACTER SET = utf8 , COLLATE = utf8_unicode_ci ;

INSERT INTO `users` (`client`, `service`, `key`, `pass`) VALUES ('test-client', 'test-service', 'zfUyeg75XQNyFDS55xHQAZE9g', 'GNe7aYpykCj72XXvvNaTMkXDc');
