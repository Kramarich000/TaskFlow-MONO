/*
  Warnings:

  - You are about to drop the `RefreshToken` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "RefreshToken" DROP CONSTRAINT "RefreshToken_userId_fkey";

-- AlterTable
ALTER TABLE "boards" ADD COLUMN     "isPinned" BOOLEAN NOT NULL DEFAULT false;

-- DropTable
DROP TABLE "RefreshToken";
