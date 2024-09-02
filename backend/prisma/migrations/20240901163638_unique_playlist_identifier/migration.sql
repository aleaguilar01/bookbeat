/*
  Warnings:

  - A unique constraint covering the columns `[playlistId,userBookId]` on the table `UserBookPlaylist` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "UserBookPlaylist_playlistId_userBookId_key" ON "UserBookPlaylist"("playlistId", "userBookId");
