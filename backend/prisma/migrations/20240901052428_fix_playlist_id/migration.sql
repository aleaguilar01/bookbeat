/*
  Warnings:

  - You are about to drop the column `name` on the `Playlist` table. All the data in the column will be lost.
  - You are about to drop the column `picture` on the `Playlist` table. All the data in the column will be lost.
  - You are about to drop the column `playlistId` on the `UserBook` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[playlistId]` on the table `Playlist` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `playlist` to the `Playlist` table without a default value. This is not possible if the table is not empty.
  - Added the required column `playlistId` to the `Playlist` table without a default value. This is not possible if the table is not empty.
  - Added the required column `uri` to the `Playlist` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Playlist" DROP CONSTRAINT "Playlist_id_fkey";

-- AlterTable
ALTER TABLE "Playlist" DROP COLUMN "name",
DROP COLUMN "picture",
ADD COLUMN     "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "image" TEXT,
ADD COLUMN     "playlist" TEXT NOT NULL,
ADD COLUMN     "playlistId" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3),
ADD COLUMN     "uri" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "UserBook" DROP COLUMN "playlistId";

-- CreateTable
CREATE TABLE "UserBookPlaylist" (
    "id" TEXT NOT NULL,
    "userBookId" TEXT NOT NULL,
    "playlistId" TEXT NOT NULL,
    "isFavorite" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "UserBookPlaylist_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Playlist_playlistId_key" ON "Playlist"("playlistId");

-- AddForeignKey
ALTER TABLE "UserBookPlaylist" ADD CONSTRAINT "UserBookPlaylist_userBookId_fkey" FOREIGN KEY ("userBookId") REFERENCES "UserBook"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserBookPlaylist" ADD CONSTRAINT "UserBookPlaylist_playlistId_fkey" FOREIGN KEY ("playlistId") REFERENCES "Playlist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
