/*
  Warnings:

  - You are about to drop the column `image` on the `car` table. All the data in the column will be lost.
  - Added the required column `carPicture` to the `Car` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `car` DROP COLUMN `image`,
    ADD COLUMN `carPicture` VARCHAR(191) NOT NULL;
