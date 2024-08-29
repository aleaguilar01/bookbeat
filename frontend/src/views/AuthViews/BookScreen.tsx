import { createElement, useMemo, useState } from "react";
import {
  Button,
  Flex,
  List,
  Select,
  Space,
  Typography,
} from "antd";
import {
  CalendarOutlined,
  MessageOutlined,
  StarOutlined,
  BookOutlined,
  HeartOutlined,
  HeartFilled,
} from "@ant-design/icons";
import Rating from "../../componets/Rating";
import { useBook } from "../../context/books-context";
import { useHandleBooks } from "../../hooks/useHandleBooks";

const { Title } = Typography;
const extraBookOptions = [
  {
    value: "all",
    label: "All",
  },
  {
    value: "favorites",
    label: "Favorites",
  },
];
const defaultBookOptions = [
  {
    value: "WANT_TO_READ",
    label: "Want to Read",
  },
  {
    value: "READING",
    label: "Reading",
  },
  {
    value: "READ",
    label: "Read",
  },
  {
    value: "DID_NOT_FINISH",
    label: "DNF",
  },
  {
    value: "RE_READING",
    label: "Re Reading",
  },
];
const BookScreen = () => {
  const { updateRating, updateIsFavorite, updateReadingStatus, isLoading: isProcessing } = useHandleBooks();
  const { isLoading, myBooks, selectCurrentBook } = useBook();
  const [bookStatusFilter, setBookStatusFilter] = useState("all");
  const IconText = ({
    icon,
    text,
  }: {
    icon: React.FC;
    text: string | number;
  }) => (
    <Space>
      {createElement(icon)}
      {text}
    </Space>
  );

  const handleSelectStatus = (value) => {
    setBookStatusFilter(value);
  };

  const filteredData = useMemo(() => {
    return myBooks.filter(({ readingStatus, isFavorite }) => {
      if (bookStatusFilter === "all") return true;
      if (bookStatusFilter === "favorites") return isFavorite;
      return readingStatus === bookStatusFilter;
    });
  }, [myBooks, bookStatusFilter]);

  return (
    <>
      <Space />
      <List
        loading={isLoading || isProcessing}
        itemLayout="vertical"
        size="large"
        header={
          <Flex justify="space-around" align="center">
            <Title>My Books</Title>
            <Select
              style={{ width: 150 }}
              optionFilterProp="label"
              onChange={handleSelectStatus}
              options={[...extraBookOptions, ...defaultBookOptions]}
              value={bookStatusFilter}
            />
          </Flex>
        }
        dataSource={filteredData}
        renderItem={(item) => (
          <List.Item
            key={item.isbn}
            actions={[
              <IconText
                icon={StarOutlined}
                text={item.rating?.toFixed(2) || " - "}
                key="list-vertical-star-o"
              />,
              <IconText
                icon={BookOutlined}
                text={item?.numberOfPages || 0}
                key="list-vertical-like-o"
              />,
              <IconText
                icon={CalendarOutlined}
                text={item.publishedYear}
                key="list-vertical-like-o"
              />,
              <IconText
                icon={MessageOutlined}
                text={item.comments || 0}
                key="list-vertical-message"
              />,
            ]}
            extra={
              <img
                height={150}
                alt={item.title}
                src={item.imageUrl}
                onClick={() => selectCurrentBook(item.id)}
              />
            }
            style={{ borderWidth: 30 }}
          >
            <List.Item.Meta
              avatar={
                <Flex gap={12} vertical align="center">
                  <Rating
                    isEditable
                    rating={item.myRating}
                    handleRating={(rating) => {
                      updateRating(rating, item.id);
                    }}
                  />
                  <Select
                    style={{ width: 150 }}
                    optionFilterProp="label"
                    onChange={(value: string) => {
                      updateReadingStatus(value, item.id);
                    }}
                    options={defaultBookOptions}
                    value={item.readingStatus}
                    variant="filled"
                  />
                  <Button
                    ghost
                    style={{ padding: 0, margin: 0 }}
                    shape="circle"
                    onClick={() => {
                      updateIsFavorite(!item.isFavorite, item.id);
                    }}
                  >
                    {item.isFavorite ? (
                      <HeartFilled style={{ color: "pink", fontSize: 24 }} />
                    ) : (
                      <HeartOutlined style={{ color: "pink", fontSize: 24 }} />
                    )}
                  </Button>
                </Flex>
              }
              title={
                  <Button
                    type="link"
                    ghost
                    style={{ color: "black" }}
                    onClick={() => selectCurrentBook(item.id)}
                  >
                    {item.title}
                  </Button>
              }
              description={item.author}
            />
            <>{item.firstSentence}</>
          </List.Item>
        )}
      />
    </>
  );
};

export default BookScreen;
