/*
  Warnings:

  - Added the required column `qty` to the `recipe_ingredient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `unit` to the `recipe_ingredient` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `recipe_ingredient` ADD COLUMN `qty` DOUBLE NOT NULL,
    ADD COLUMN `unit` INTEGER NOT NULL;
