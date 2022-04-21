/*
  Warnings:

  - A unique constraint covering the columns `[user_id]` on the table `user` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `user` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `blog` MODIFY `title` VARCHAR(50) NOT NULL;

-- CreateTable
CREATE TABLE `comment` (
    `comment_id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `blog_id` INTEGER NOT NULL,
    `comment` VARCHAR(500) NOT NULL,
    `created_time` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `deleted_time` DATETIME(3) NULL,

    UNIQUE INDEX `comment_comment_id_key`(`comment_id`),
    PRIMARY KEY (`comment_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `user_user_id_key` ON `user`(`user_id`);

-- CreateIndex
CREATE UNIQUE INDEX `user_email_key` ON `user`(`email`);
