/*
  Warnings:

  - You are about to drop the column `metadata` on the `Image` table. All the data in the column will be lost.
  - You are about to drop the column `pathOrder` on the `Image` table. All the data in the column will be lost.
  - You are about to drop the column `size` on the `Image` table. All the data in the column will be lost.
  - You are about to drop the column `url` on the `Image` table. All the data in the column will be lost.
  - Made the column `path` on table `Image` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Image" DROP COLUMN "metadata",
DROP COLUMN "pathOrder",
DROP COLUMN "size",
DROP COLUMN "url",
ALTER COLUMN "path" SET NOT NULL;
