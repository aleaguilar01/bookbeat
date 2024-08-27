import axios, {AxiosInstance} from "axios";
import dotenv from "dotenv";


const openLibraryApi: AxiosInstance = axios.create({
  baseURL: "https://openlibrary.org/search.json",
});

interface BookResponse {
  title: string;
  author: Array<string>;
  published_year: number;
  publisher: Array<string>;
  isbn: Array<string>;
  language: Array<string>;
  number_of_pages: number;
  cover_url?: string;
  ratings_count?: any;
  fist_sentence?: Array<string>;
}
export const getBooksByTitle = async (
  title: string
): Promise<Array<BookResponse> | undefined> => {
  try {
    const { data } = await openLibraryApi.get(`/`, {
      params: { title, limit: 15 },
    });
    return data.docs
      .filter((book: any) => book.isbn && book.author_name)
      .map((book: any) => {
        return {
          title: book.title,
          author: book.author_name,
          published_year: book.first_publish_year,
          publisher: book.publisher,
          isbn: book?.isbn?.[0],
          language: book.language,
          number_of_pages: book.number_of_pages_median,
          ...(book.cover_i
            ? {
                cover_url: `https://covers.openlibrary.org/b/ID/${book.cover_i}-M.jpg`,
              }
            : {}),
          ratings: book.ratings_average,
          subjects: book.subject,
          first_sentence: book.first_sentence?.[0],
        } as BookResponse;
      });
  } catch (error) {
    console.error(`Error: ${error}`);
  }
};
