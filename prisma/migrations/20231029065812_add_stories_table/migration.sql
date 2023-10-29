-- AlterTable
ALTER TABLE "User" ADD COLUMN     "storyViewsId" TEXT;

-- CreateTable
CREATE TABLE "Stories" (
    "id" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "media_url" TEXT NOT NULL,
    "postedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP(3) NOT NULL DEFAULT NOW() + interval '1 day',
    "caption" TEXT,

    CONSTRAINT "Stories_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_storyViewsId_fkey" FOREIGN KEY ("storyViewsId") REFERENCES "Stories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Stories" ADD CONSTRAINT "Stories_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
