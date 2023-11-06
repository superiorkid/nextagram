-- AlterTable
ALTER TABLE "Stories" ALTER COLUMN "expiresAt" SET DEFAULT NOW() + interval '1 DAYS';
