-- CreateTable
CREATE TABLE "BookComment" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "bookId" TEXT NOT NULL,
    "comment" TEXT NOT NULL,

    CONSTRAINT "BookComment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "BookComment" ADD CONSTRAINT "BookComment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookComment" ADD CONSTRAINT "BookComment_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("isbn") ON DELETE RESTRICT ON UPDATE CASCADE;
