-- CreateTable
CREATE TABLE "CommentLikes" (
    "userId" TEXT NOT NULL,
    "commentId" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "CommentLikes_userId_commentId_key" ON "CommentLikes"("userId", "commentId");

-- AddForeignKey
ALTER TABLE "CommentLikes" ADD CONSTRAINT "CommentLikes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommentLikes" ADD CONSTRAINT "CommentLikes_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "Comments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
