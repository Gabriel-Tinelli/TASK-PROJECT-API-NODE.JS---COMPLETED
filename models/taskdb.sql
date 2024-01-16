CREATE TABLE
    `tasktb` (
        `task_id` INT NOT NULL AUTO_INCREMENT,
        `task_title` VARCHAR(30) NOT NULL,
        `task_description` TEXT NULL,
        `task_completed` VARCHAR(10),
        `task_created` DATE,
        `task_updated` DATE,
        PRIMARY KEY (`task_id`)
    ) ENGINE = InnoDB;