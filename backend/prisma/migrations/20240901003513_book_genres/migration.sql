CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- CreateTable
CREATE TABLE "BookGenres" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BookGenres_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_BookToGenre" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "BookGenres_name_key" ON "BookGenres"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_BookToGenre_AB_unique" ON "_BookToGenre"("A", "B");

-- CreateIndex
CREATE INDEX "_BookToGenre_B_index" ON "_BookToGenre"("B");

-- AddForeignKey
ALTER TABLE "_BookToGenre" ADD CONSTRAINT "_BookToGenre_A_fkey" FOREIGN KEY ("A") REFERENCES "Book"("isbn") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BookToGenre" ADD CONSTRAINT "_BookToGenre_B_fkey" FOREIGN KEY ("B") REFERENCES "BookGenres"("id") ON DELETE CASCADE ON UPDATE CASCADE;

INSERT INTO "BookGenres" (id, name, "updatedAt") VALUES 
(uuid_generate_v4(), '2SLGBTQ+', CURRENT_TIMESTAMP),
(uuid_generate_v4(), 'Adult', CURRENT_TIMESTAMP),
(uuid_generate_v4(), 'Art', CURRENT_TIMESTAMP),
(uuid_generate_v4(), 'Biography', CURRENT_TIMESTAMP),
(uuid_generate_v4(), 'Business', CURRENT_TIMESTAMP),
(uuid_generate_v4(), 'Children''s', CURRENT_TIMESTAMP),
(uuid_generate_v4(), 'Classics', CURRENT_TIMESTAMP),
(uuid_generate_v4(), 'Comics', CURRENT_TIMESTAMP),
(uuid_generate_v4(), 'Contemporary', CURRENT_TIMESTAMP),
(uuid_generate_v4(), 'Cookbooks', CURRENT_TIMESTAMP),
(uuid_generate_v4(), 'Crime', CURRENT_TIMESTAMP),
(uuid_generate_v4(), 'Graphic Novels', CURRENT_TIMESTAMP),
(uuid_generate_v4(), 'Fantasy', CURRENT_TIMESTAMP),
(uuid_generate_v4(), 'Fiction', CURRENT_TIMESTAMP),
(uuid_generate_v4(), 'Historical Fiction', CURRENT_TIMESTAMP),
(uuid_generate_v4(), 'History', CURRENT_TIMESTAMP),
(uuid_generate_v4(), 'Horror', CURRENT_TIMESTAMP),
(uuid_generate_v4(), 'Humor and Comedy', CURRENT_TIMESTAMP),
(uuid_generate_v4(), 'Manga', CURRENT_TIMESTAMP),
(uuid_generate_v4(), 'Memoir', CURRENT_TIMESTAMP),
(uuid_generate_v4(), 'Music', CURRENT_TIMESTAMP),
(uuid_generate_v4(), 'Mystery', CURRENT_TIMESTAMP),
(uuid_generate_v4(), 'New Adult', CURRENT_TIMESTAMP),
(uuid_generate_v4(), 'Nonfiction', CURRENT_TIMESTAMP),
(uuid_generate_v4(), 'Paranormal', CURRENT_TIMESTAMP),
(uuid_generate_v4(), 'Philosophy', CURRENT_TIMESTAMP),
(uuid_generate_v4(), 'Poetry', CURRENT_TIMESTAMP),
(uuid_generate_v4(), 'Psychology', CURRENT_TIMESTAMP),
(uuid_generate_v4(), 'Religion', CURRENT_TIMESTAMP),
(uuid_generate_v4(), 'Romance', CURRENT_TIMESTAMP),
(uuid_generate_v4(), 'Romantasy', CURRENT_TIMESTAMP),
(uuid_generate_v4(), 'Science', CURRENT_TIMESTAMP),
(uuid_generate_v4(), 'Science Fiction', CURRENT_TIMESTAMP),
(uuid_generate_v4(), 'Self Help', CURRENT_TIMESTAMP),
(uuid_generate_v4(), 'Suspense', CURRENT_TIMESTAMP),
(uuid_generate_v4(), 'Spirituality', CURRENT_TIMESTAMP),
(uuid_generate_v4(), 'Sports', CURRENT_TIMESTAMP),
(uuid_generate_v4(), 'Thriller', CURRENT_TIMESTAMP),
(uuid_generate_v4(), 'Travel', CURRENT_TIMESTAMP),
(uuid_generate_v4(), 'Young Adult', CURRENT_TIMESTAMP);