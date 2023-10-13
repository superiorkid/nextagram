-- DropIndex
DROP INDEX "Comments_postId_userId_key";

-- AlterTable
ALTER TABLE "Comments" ADD CONSTRAINT "Comments_pkey" PRIMARY KEY ("postId", "userId");
