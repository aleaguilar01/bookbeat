import { FC, useState } from "react";
import { Flex, List, Typography } from "antd";
import Loading from "./Loading";
import { PlayCircleOutlined } from "@ant-design/icons";

import { IBook, useBook } from "../context/books-context";
import BookModal from "./BookModal";

const { Title } = Typography;
interface BookRecommendationsProps {}

const BookRecommendations: FC<BookRecommendationsProps> = () => {
  const { activeBooks, isLoading } = useBook();
  const [selectedBook, setSelectedBook] = useState<IBook>(undefined);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <Flex vertical style={{ borderRadius: 20, marginTop: 25, height: "35vh" }}>
      <Title level={3}>My Activity</Title>
      <List
        pagination={{
          pageSize: 2,
        }}
        itemLayout="horizontal"
        dataSource={activeBooks}
        renderItem={(item) => (
          <List.Item
            actions={[
              <a key="list-edit" onClick={() => setSelectedBook(item)}>
                edit
              </a>,
              <PlayCircleOutlined
                style={{ cursor: "pointer" }}
                onClick={() => {
                  alert("Nice Playlist");
                }}
              />,
            ]}
          >
            <List.Item.Meta
              avatar={<img src={item.imageUrl} height={80} />}
              title={<>{item.title}</>}
            />
          </List.Item>
        )}
      />
      <BookModal
        book={selectedBook}
        onClose={() => setSelectedBook(undefined)}
      />
    </Flex>
  );
};

export default BookRecommendations;
