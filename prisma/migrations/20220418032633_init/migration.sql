/*
  Warnings:

  - You are about to drop the column `deletedTime` on the `blog` table. All the data in the column will be lost.
  - You are about to drop the column `updated_time` on the `blog` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `blog` DROP COLUMN `deletedTime`,
    DROP COLUMN `updated_time`,
    ADD COLUMN `deleted_time` DATETIME(3) NULL,
    ADD COLUMN `updatae_time` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6);
