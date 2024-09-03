import { Prisma, UserBook, Book } from "@prisma/client";

type UserBookWithBook = Prisma.UserBookGetPayload<{
  include: {
    book: true;
  };
}>;

type FlattenedUserBooks = Omit<UserBook, "rating"> &
  Book & { myRating: number | null };

export interface ScoredBook {
    author: string,
    title: string,
    score: number
}
export const getFlattenedBooks = (
  books: Array<UserBookWithBook>
): Array<FlattenedUserBooks> => {
  return books.map(({ book, rating, ...rest }) => {
    return {
      myRating: rating,
      ...book,
      ...rest,
    };
  });
};

export const getScoredBooks = (books: Array<FlattenedUserBooks>): Array<ScoredBook> => {
  const today = new Date();
  return books.map(
    ({
      isFavorite,
      updatedAt,
      createdAt,
      title,
      author,
      readingStatus,
      myRating,
    }) => {
      let score = 0;
      // favorite book
      if (isFavorite) score += 20;
      // Recent activity on a book suggests higher engagement. Points could be assigned based on how recently the book was updated
      if (updatedAt) {
        const activityTimeDifference = today.getTime() - updatedAt.getTime();
        const activityDaysDifference =
          activityTimeDifference / (1000 * 3600 * 24);
        if (activityDaysDifference <= 7) {
          score += 8;
        } else if (activityDaysDifference <= 30) {
          score += 5;
        } else if (activityDaysDifference <= 180) {
          score += 3;
        } else {
          score += 0;
        }
      }
      // Newer acquisitions might be given slightly higher points to reflect recent interest.
      if (createdAt) {
        const acquisitionTimeDifference = today.getTime() - createdAt.getTime();
        const acquisitionDaysDifference =
          acquisitionTimeDifference / (1000 * 3600 * 24);
        if (acquisitionDaysDifference <= 30) {
          score += 5;
        } else if (acquisitionDaysDifference <= 180) {
          score += 3;
        } else {
          score += 0;
        }
      }
      switch (readingStatus) {
        case "WANT_TO_READ":
          score += 3;
        case "DID_NOT_FINISH":
          score -= 10;
        case "RE_READING":
          score += 15;
        case "READ":
          score += 10;
        case "READING":
          score += 8;
      }

      if (myRating) {
        if (myRating >= 1 && myRating < 2) {
          score += -10 + (myRating - 1) * 5; // Interpolates between -10 and -5
        } else if (myRating >= 2 && myRating < 3) {
          score += -5 + (myRating - 2) * 5; // Interpolates between -5 and 0
        } else if (myRating >= 3 && myRating < 4) {
          score += 0 + (myRating - 3) * 5; // Interpolates between 0 and +5
        } else if (myRating >= 4 && myRating < 5) {
          score += 5 + (myRating - 4) * 5; // Interpolates between +5 and +10
        } else if (myRating === 5) {
          score += 10; // Exact match for rating 5
        }
      }
      return {
        title: title,
        author: author,
        score,
      };
    }
  );
};
