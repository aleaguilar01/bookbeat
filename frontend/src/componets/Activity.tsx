import { FC, useState } from "react";
import { Empty, Flex, List, Typography } from "antd";
import { PlayCircleOutlined } from "@ant-design/icons";

import { IBook, useBook } from "../context/books-context";
import BookModal from "./BookModal";
import { Link } from "react-router-dom";
const emptyStateUrl = new URL("../../empty-state-v2.jpg", import.meta.url).href;

const { Title } = Typography;
interface ActivityProps {}

const Activity: FC<ActivityProps> = () => {
  const { activeBooks, isLoading } = useBook();
  const [selectedBook, setSelectedBook] = useState<IBook>(undefined);

  return (
    <Flex vertical style={{ borderRadius: 20, marginTop: 25, height: "35vh" }}>
      <Title level={3}>My Activity</Title>
      <List
        pagination={{
          pageSize: 2,
        }}
        loading={isLoading}
        itemLayout="horizontal"
        dataSource={activeBooks}
        locale={{ emptyText: <Empty image={emptyStateUrl}/> }}
        renderItem={(item) => (
          <List.Item
            key={item.id}
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
              avatar={
                <Link to={`books/${item.id}`}>
                  <img src={item.imageUrl} height={80} />
                </Link>
              }
              title={<Link to={`books/${item.id}`}>{item.title}</Link>}
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

export default Activity;
