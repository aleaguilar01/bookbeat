/*
  Warnings:

  - The primary key for the `UserBook` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `isbn` on the `UserBook` table. All the data in the column will be lost.
  - Added the required column `bookId` to the `UserBook` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `UserBook` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Playlist" DROP CONSTRAINT "Playlist_id_fkey";

-- AlterTable
ALTER TABLE "UserBook" DROP CONSTRAINT "UserBook_pkey",
DROP COLUMN "isbn",
ADD COLUMN     "bookId" TEXT NOT NULL,
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "UserBook_pkey" PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "Book" (
    "isbn" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "rating" DOUBLE PRECISION,
    "publishedYear" INTEGER,
    "numberOfPages" INTEGER,
    "firstSentence" TEXT,

    CONSTRAINT "Book_pkey" PRIMARY KEY ("isbn")
);

-- AddForeignKey
ALTER TABLE "Playlist" ADD CONSTRAINT "Playlist_id_fkey" FOREIGN KEY ("id") REFERENCES "UserBook"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserBook" ADD CONSTRAINT "UserBook_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("isbn") ON DELETE RESTRICT ON UPDATE CASCADE;
