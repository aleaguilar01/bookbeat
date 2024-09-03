import {
  ChangeEventHandler,
  createElement,
  FC,
  useMemo,
  useState,
} from "react";
import {
  Button,
  Flex,
  Input,
  List,
  Rate,
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
import { useHandleBooks } from "../../hooks/useHandleBooks";
import { Colors, DEFAULT_READING_STATUS } from "../../constants";
import { Link } from "react-router-dom";
import BookCommentModal from "../../componets/BookCommentModal";
import { IBook, useBook } from "../../context/books-context";

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

const MyBooksScreen: FC = () => {
  const {
    updateRating,
    updateIsFavorite,
    updateReadingStatus,
    isLoading: isProcessing,
  } = useHandleBooks();
  const { isLoading, myBooks } = useBook();
  const [bookStatusFilter, setBookStatusFilter] = useState("all");
  const [searchContent, setSearchContent] = useState("");
  const [selectedBook, setSelectedBook] = useState<IBook| undefined>();


  const IconText = ({ icon, text }: { icon: FC; text: string | number }) => (
    <Space>
      {createElement(icon)}
      {text}
    </Space>
  );

  const handleSelectStatus = (value) => {
    setBookStatusFilter(value);
  };

  const handleSearchContent: ChangeEventHandler<HTMLInputElement> = (event) => {
    setSearchContent(event.currentTarget.value);
  };

  const filteredData = useMemo(() => {
    return myBooks
      .filter(({ readingStatus, isFavorite }) => {
        if (bookStatusFilter === "all") return true;
        if (bookStatusFilter === "favorites") return isFavorite;
        return readingStatus === bookStatusFilter;
      })
      .filter((book) => {
        if (searchContent.length === 0) {
          return true;
        }
        return (
          book.author.toLowerCase().includes(searchContent.toLowerCase()) ||
          book.title.toLowerCase().includes(searchContent.toLowerCase())
        );
      });
  }, [myBooks, bookStatusFilter, searchContent]);

  return (
    <>
      <Space />
      <List
        loading={isLoading || isProcessing}
        itemLayout="vertical"
        size="large"
        header={
          <Flex justify="space-around" align="center">
            <Title level={2}>My Books</Title>
            <Input
              placeholder="Search Your Books"
              value={searchContent}
              onChange={handleSearchContent}
              style={{ width: 250 }}
            />
            <Select
              style={{ width: 150 }}
              optionFilterProp="label"
              onChange={handleSelectStatus}
              options={[...extraBookOptions, ...DEFAULT_READING_STATUS]}
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

              <Button  onClick={()=>{setSelectedBook(item)}}>
              <IconText
                icon={MessageOutlined}
                text={item.comments || 0}
                key="list-vertical-message"
              /> </Button>
            ]}
            extra={
              <Link to={`/books/${item.id}`}>
                <img height={150} alt={item.title} src={item.imageUrl} />
              </Link>
            }
            style={{ borderWidth: 30 }}
          >
            <List.Item.Meta
              avatar={
                <Flex gap={20} align="center">
                  <Flex vertical gap={12} align="center" justify="center">
                    <Rate
                      allowHalf
                      defaultValue={item.myRating}
                      className="ml-2"
                      style={{ color: Colors.secondary }}
                      onChange={(rating) => {
                        updateRating(rating, item.id);
                      }}
                    />
                    <Select
                      style={{ width: 150 }}
                      optionFilterProp="label"
                      onChange={(value: string) => {
                        updateReadingStatus(value, item.id);
                      }}
                      options={DEFAULT_READING_STATUS}
                      value={item.readingStatus}
                      variant="filled"
                    />
                  </Flex>
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
                <Button type="link" ghost style={{ color: "black" }}>
                  <Link to={`/books/${item.id}`}> {item.title}</Link>
                </Button>
              }
              description={item.author}
            />
            <>{item.firstSentence}</>
          </List.Item>
        )}
      />
       <BookCommentModal book={selectedBook} onClose={() => setSelectedBook(undefined)} />
    </>
  );
};

export default MyBooksScreen;
