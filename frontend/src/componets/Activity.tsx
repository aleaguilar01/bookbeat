import { FC, useMemo, useRef } from "react";
import { Card, Carousel, Empty, List, Tooltip, Typography } from "antd";
import {
  HeartOutlined,
  ReadOutlined,
  LeftOutlined,
  RightOutlined,
  HeartFilled,
} from "@ant-design/icons";

import { IBook, useBook } from "../context/books-context";
import { useNavigate } from "react-router-dom";
import { useHandleBooks } from "../hooks/useHandleBooks";
import { Colors } from "../constants";
import Loading from "./Loading";
const emptyStateUrl = new URL("../../empty-state-v2.jpg", import.meta.url).href;

const { Text } = Typography;
interface ActivityProps {}

const Activity: FC<ActivityProps> = () => {
  const { activeBooks, isLoading } = useBook();
  const carouselRef = useRef<any>();
  const navigate = useNavigate();
  const { updateIsFavorite } = useHandleBooks();
  const chunkedBooks = useMemo(() => {
    const chunks = [];
    for (let i = 0; i < activeBooks.length; i += 3) {
      chunks.push(activeBooks.slice(i, i + 3));
    }
    return chunks;
  }, [activeBooks]);

  if (isLoading) {
    return <Loading />;
  }

  if (chunkedBooks.length === 0) {
    return (
      <Empty
        image={emptyStateUrl}
        description="A great time to start reading some books"
      />
    );
  }

  return (
    <>
      <Carousel ref={carouselRef} dots={false}>
        {chunkedBooks.map((chunk, index) => (
          <div key={index}>
            <List
              grid={{ column: 3, gutter: 16 }}
              dataSource={chunk}
              renderItem={(book: IBook) => (
                <List.Item>
                  <Card
                    hoverable
                    size="small"
                    cover={
                      <img
                        alt={book.title}
                        src={book.imageUrl}
                        style={{ height: 60, objectFit: "cover" }}
                      />
                    }
                    actions={[
                      <ReadOutlined
                        style={{
                          fontSize: "14px",
                        }}
                        key="read"
                        onClick={() => navigate(`/books/${book.id}`)}
                      />,
                      <Tooltip
                        title={
                          book.isFavorite
                            ? "Remove from favorites"
                            : "Add to favorites"
                        }
                      >
                        {book.isFavorite ? (
                          <HeartFilled
                            style={{
                              color: Colors.secondary,
                              fontSize: 14,
                            }}
                            onClick={() => updateIsFavorite(false, book.id)}
                          />
                        ) : (
                          <HeartOutlined
                            style={{
                              color: Colors.secondary,
                              fontSize: 14,
                            }}
                            onClick={() => updateIsFavorite(true, book.id)}
                          />
                        )}
                      </Tooltip>,
                    ]}
                    styles={{ body: { padding: "8px" } }}
                  >
                    <Card.Meta
                      title={
                        <Text
                          ellipsis
                          style={{ fontSize: "12px", fontWeight: "bold" }}
                        >
                          {book.title}
                        </Text>
                      }
                      description={
                        <Text
                          type="secondary"
                          ellipsis
                          style={{ fontSize: "10px" }}
                        >
                          {book.author}
                        </Text>
                      }
                    />
                  </Card>
                </List.Item>
              )}
            />
          </div>
        ))}
      </Carousel>
      {activeBooks.length > 3 && (
        <>
          <LeftOutlined
            style={{
              position: "absolute",
              left: 0,
              top: "50%",
              fontSize: "24px",
              cursor: "pointer",
            }}
            onClick={() => carouselRef.current.prev()}
          />
          <RightOutlined
            style={{
              position: "absolute",
              right: 0,
              top: "50%",
              fontSize: "24px",
              cursor: "pointer",
            }}
            onClick={() => carouselRef.current.next()}
          />
        </>
      )}
    </>
  );
};

export default Activity;
