/*
  Warnings:

  - You are about to drop the column `createdAt` on the `sale` table. All the data in the column will be lost.
  - You are about to drop the column `total_price` on the `sale` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `sale` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `sale` DROP FOREIGN KEY `Sale_userId_fkey`;

-- DropIndex
DROP INDEX `Sale_userId_fkey` ON `sale`;

-- AlterTable
ALTER TABLE `sale` DROP COLUMN `createdAt`,
    DROP COLUMN `total_price`,
    DROP COLUMN `updatedAt`,
    MODIFY `userId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Sale` ADD CONSTRAINT `Sale_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id_user`) ON DELETE SET NULL ON UPDATE CASCADE;
