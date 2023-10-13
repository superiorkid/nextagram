/*
  Warnings:

  - The primary key for the `Comments` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[postId,userId]` on the table `Comments` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Comments" DROP CONSTRAINT "Comments_pkey";

-- CreateIndex
CREATE UNIQUE INDEX "Comments_postId_userId_key" ON "Comments"("postId", "userId");
