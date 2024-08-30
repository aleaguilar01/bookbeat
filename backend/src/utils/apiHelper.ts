import axios, { AxiosInstance } from "axios";

const openLibraryApi: AxiosInstance = axios.create({
  baseURL: "https://openlibrary.org/search.json",
});

interface BookResponse {
  title: string;
  author: Array<string>;
  published_year: number;
  publisher?: Array<string>;
  isbn: string;
  language?: Array<string>;
  number_of_pages: number;
  cover_url?: string;
  ratings_count?: any;
  ratings?: any;
  fist_sentence?: Array<string>;
}

export const getBooks = async (
  query: string, limit: number = 4
): Promise<Array<BookResponse>> => {
  try {
    return openLibraryApi.get(`/`, {
      params: { q: query, limit },
    }).then(({data})=> bookApiMapper(data));
  } catch (err) {
    console.log("OpenLibrary failed for :", query)
    return []
  }
};
export const getBooksByTitle = async (
  title: string
): Promise<Array<BookResponse> | undefined> => {
  try {
    const { data } = await openLibraryApi.get(`/`, {
      params: { title, limit: 5 },
    });
    return bookApiMapper(data)
  } catch (error) {
    console.error(`Error: ${error}`);
  }
};

const bookApiMapper = (data: any) => {
  return data.docs
  .filter((book: any) => book.isbn && book.author_name)
  .map((book: any) => {
    return {
      title: book.title,
      author: book.author_name,
      published_year: book.first_publish_year,
      // publisher: book.publisher,
      isbn: book?.isbn?.[0],
      //language: book.language,
      number_of_pages: book.number_of_pages_median,
      ...(book.cover_i
        ? {
            cover_url: `https://covers.openlibrary.org/b/ID/${book.cover_i}-M.jpg`,
          }
        : {}),
      ratings: book.ratings_average,
      //subjects: book.subject,
      first_sentence: book.first_sentence?.[0],
    } as BookResponse;
  });
}
