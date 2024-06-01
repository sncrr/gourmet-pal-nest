/*
  Warnings:

  - You are about to alter the column `qty` on the `recipe_ingredient` table. The data in that column could be lost. The data in that column will be cast from `Double` to `VarChar(191)`.

*/
-- AlterTable
ALTER TABLE `recipe_ingredient` MODIFY `qty` VARCHAR(191) NOT NULL;
