/*
  Warnings:

  - You are about to drop the `userfollower` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `userfollower` DROP FOREIGN KEY `UserFollower_followed_id_fkey`;

-- DropForeignKey
ALTER TABLE `userfollower` DROP FOREIGN KEY `UserFollower_user_id_fkey`;

-- DropTable
DROP TABLE `userfollower`;

-- CreateTable
CREATE TABLE `user_follower` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `followed_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `user_follower` ADD CONSTRAINT `user_follower_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_follower` ADD CONSTRAINT `user_follower_followed_id_fkey` FOREIGN KEY (`followed_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
