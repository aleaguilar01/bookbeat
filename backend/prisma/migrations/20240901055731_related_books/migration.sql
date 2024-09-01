-- CreateTable
CREATE TABLE "_RelatedBooks" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_RelatedBooks_AB_unique" ON "_RelatedBooks"("A", "B");

-- CreateIndex
CREATE INDEX "_RelatedBooks_B_index" ON "_RelatedBooks"("B");

-- AddForeignKey
ALTER TABLE "_RelatedBooks" ADD CONSTRAINT "_RelatedBooks_A_fkey" FOREIGN KEY ("A") REFERENCES "Book"("isbn") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RelatedBooks" ADD CONSTRAINT "_RelatedBooks_B_fkey" FOREIGN KEY ("B") REFERENCES "Book"("isbn") ON DELETE CASCADE ON UPDATE CASCADE;
