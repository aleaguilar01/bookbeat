-- AlterTable
ALTER TABLE "Book" ADD COLUMN     "imageUrl" TEXT;

-- AlterTable
ALTER TABLE "UserBook" ADD COLUMN     "isFavorite" BOOLEAN DEFAULT false;

-- AlterTable
ALTER TABLE "UserBook" ADD COLUMN     "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3);