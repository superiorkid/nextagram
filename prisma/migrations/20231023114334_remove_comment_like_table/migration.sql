/*
  Warnings:

  - You are about to drop the `CommentLikes` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CommentLikes" DROP CONSTRAINT "CommentLikes_commentId_fkey";

-- DropForeignKey
ALTER TABLE "CommentLikes" DROP CONSTRAINT "CommentLikes_userId_fkey";

-- DropTable
DROP TABLE "CommentLikes";
