import React, { useState } from "react";
import { Select, Space, Image, Typography, Flex } from "antd";
import { AxiosInstance } from "axios";
import BookModal from "./BookModal";
import { useApi } from "../hooks/useApi";
import { IBook } from "../context/books-context";
const noImage = new URL("../../no-image.png", import.meta.url).href;
let timeout: ReturnType<typeof setTimeout> | null;
let currentValue: string;

export interface IBookResponse {
  isbn: string;
  author: string[];
  cover_url: string;
  value: string;
  title: string;
  published_year?: number;
  publisher?: string[];
  ratings?: number;
  first_sentence?: string;
  number_of_pages?: number;
}

interface IOption {
  data: IBook;
}
const { Text } = Typography;
const fetch = (
  value: string,
  callback: (data: { value: string; text: string }[]) => void,
  api: AxiosInstance
) => {
  if (timeout) {
    clearTimeout(timeout);
    timeout = null;
  }
  currentValue = value;

  const backendCall = () => {
    const url = encodeURI(`book/${value}`);
    api(url).then(({ data }) => {
      if (currentValue === value) {
        const mapdata: Array<IBook & { value: string; text: string }> = data
          .filter(
            (item: IBookResponse) =>
              !!item.author && item.isbn && item.isbn.length > 0
          )
          .map((item: IBookResponse) => ({
            value: item.isbn,
            isbn: item.isbn,
            author: item.author.join(", "),
            imageUrl: item.cover_url,
            title: item.title,
            publishedYear: item.published_year,
            publisher: item.publisher,
            numberOfPages: item.number_of_pages,
            firstSentence: item.first_sentence,
            rating: item.ratings,
          }));
        callback(mapdata);
      }
    });
  };
  if (value) {
    timeout = setTimeout(backendCall, 500);
  } else {
    callback([]);
  }
};

const SearchBar: React.FC<{
  placeholder: string;
  style: React.CSSProperties;
}> = ({ style, placeholder }) => {
  const [data, setData] = useState([]);
  const [value, setValue] = useState<any>();
  const api = useApi();
  const handleSearch = (newValue: string) => {
    fetch(newValue, setData, api);
  };

  const handleChange = (isbn: string) => {
    setValue(data.filter((book) => book.value === isbn)[0]);
  };

  return (
    <>
      <Select
        value={value}
        showSearch
        placeholder={placeholder}
        style={style}
        defaultActiveFirstOption={false}
        suffixIcon={null}
        filterOption={false}
        onSearch={handleSearch}
        onChange={handleChange}
        notFoundContent={null}
        options={data}
        optionRender={(option: IOption) => (
          <Space>
            <Image
              height={90}
              src={option.data.imageUrl || noImage}
              preview={false}
            />
            <Flex vertical style={{ width: 300 }}>
              <Text strong style={{ textWrap: "wrap" }}>
                {option.data.title}
              </Text>
              <Text italic>{option.data.author}</Text>
            </Flex>
          </Space>
        )}
      />
      <BookModal book={value} onClose={() => setValue(undefined)} />
    </>
  );
};

export default SearchBar;
