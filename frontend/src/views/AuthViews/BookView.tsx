import React, { CSSProperties, useEffect, useMemo, useState, useRef } from "react";
import { useParams, useNavigate, Navigate } from "react-router-dom";
import {
  Card,
  Row,
  Col,
  Typography,
  Rate,
  Tag,
  Divider,
  List,
  Image,
  Button,
  Select,
  Popconfirm,
  Input,
  Avatar,
} from "antd";
import {
  HeartFilled,
  HeartOutlined,
  ClockCircleOutlined,
  BookOutlined,
  ArrowLeftOutlined,
  DeleteOutlined,
  CommentOutlined,
} from "@ant-design/icons";
import { IBook, IComment, useBook } from "../../context/books-context";
import { Colors, DEFAULT_READING_STATUS } from "../../constants";
import { useHandleBooks } from "../../hooks/useHandleBooks";
import BookModal from "../../componets/BookModal";
import PlaylistContainer from "../MusicViews/MusicComponents/PlaylistContainer";

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;

const COMMENTS_PER_PAGE = 4;

const BookPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { myBooks } = useBook();
  const [relatedBooks, setRelatedBooks] = useState<Array<IBook>>([]);
  const [selectedRelatedBook, setSelectedRelatedBook] = useState<IBook | undefined>();
  const {
    updateIsFavorite,
    updateRating,
    updateReadingStatus,
    getRelatedBooks,
    isLoading,
    deleteBook,
    createComment,
  } = useHandleBooks();

  const book = useMemo(() => myBooks.find((book) => book.id === id), [myBooks, id]);

  const [displayedComments, setDisplayedComments] = useState<IComment[]>([]);
  const [startIndex, setStartIndex] = useState<number>(0);
  const [newComment, setNewComment] = useState("");
  const commentsContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (book && !isLoading && relatedBooks.length === 0) {
      getRelatedBooks(book.isbn).then((books) => {
        const filteredBooks = books
          .filter((book) => book.imageUrl && book.imageUrl !== "")
          .slice(0, 3);
        setRelatedBooks(filteredBooks);
      });
    }
  }, [book, relatedBooks, isLoading, getRelatedBooks]);

  useEffect(() => {
    if (book?.bookComments) {
      const totalComments = book.bookComments.length;
      const newStartIndex = Math.max(0, totalComments - COMMENTS_PER_PAGE);
      setStartIndex(newStartIndex);
      setDisplayedComments(book.bookComments.slice(newStartIndex));
    }
  }, [book?.bookComments]);

  const handleDeleteBook = () => {
    deleteBook(id);
  };

  const loadPreviousComments = () => {
    if (book?.bookComments && commentsContainerRef.current) {
      const container = commentsContainerRef.current;
      const scrollPosition = container.scrollHeight - container.scrollTop;

      const newStartIndex = Math.max(0, startIndex - COMMENTS_PER_PAGE);
      setStartIndex(newStartIndex);
      setDisplayedComments(book.bookComments.slice(newStartIndex));
      
      setTimeout(() => {
        if (container) {
          container.scrollTop = container.scrollHeight - scrollPosition;
          
          setTimeout(() => {
            container.scrollTo({ top: 0, behavior: 'smooth' });
          }, 100);
        }
      }, 0);
    }
  };

  const handleAddComment = () => {
    if (newComment.trim() && book) {
      createComment(newComment, book.isbn).then(() => {
        setNewComment("");
      });
    }
  };

  const hasMoreComments = book?.bookComments && startIndex > 0;

  const relatedBookStyles: Record<string, CSSProperties> = {
    card: {
      height: "100%",
      display: "flex",
      flexDirection: "column",
    },
    imageContainer: {
      position: "relative",
      paddingTop: "150%", // 2:3 aspect ratio
      overflow: "hidden",
    },
    image: {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      objectFit: "cover",
    },
    title: {
      fontSize: "14px",
      fontWeight: 500,
      lineHeight: "1.2em",
      height: "2.4em",
      overflow: "hidden",
      textOverflow: "ellipsis",
      display: "-webkit-box",
      WebkitLineClamp: 2,
      WebkitBoxOrient: "vertical",
    },
    author: {
      fontSize: "12px",
      color: "#6c757d",
      marginTop: "4px",
    },
  };

  if (!book) {
    return <Navigate to="/" />;
  }

  return (
    <div style={{ padding: "32px", backgroundColor: "#f0f2f5", minHeight: "100vh" }}>
      <Button
        icon={<ArrowLeftOutlined />}
        onClick={() => navigate(-1)}
        style={{ marginBottom: "16px", marginRight: "8px" }}
      >
        Back
      </Button>
      <Popconfirm
        title="Delete this book"
        description="Are you sure you want to delete this book? This action cannot be undone."
        onConfirm={handleDeleteBook}
        okText="Yes"
        cancelText="No"
      >
        <Button icon={<DeleteOutlined />} danger style={{ marginBottom: "16px" }}>
          Delete Book
        </Button>
      </Popconfirm>

      <Card
        style={{
          width: "100%",
          maxWidth: "1000px",
          margin: "0 auto",
          overflow: "hidden",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Row gutter={[24, 24]}>
          <Col xs={24} md={8}>
            <Image
              alt={book.title}
              src={book.imageUrl}
              style={{
                width: "100%",
                height: "auto",
                objectFit: "cover",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                borderRadius: "8px",
              }}
            />
          </Col>
          <Col xs={24} md={16}>
            <Title level={2} style={{ marginBottom: "8px" }}>
              {book.title}
            </Title>
            <Text style={{ fontSize: "18px", color: "#666" }}>
              by {book.author}
            </Text>
            <div style={{ marginTop: "16px", marginBottom: "16px" }}>
              <Tag color="blue">ISBN: {book.isbn}</Tag>
              <Tag color="green">Published: {book.publishedYear}</Tag>
              <Tag color="orange">
                <ClockCircleOutlined /> Added: {book.createdAt.toDateString()}
              </Tag>
            </div>
            <div style={{ marginBottom: "16px" }}>
              <Text>Status:</Text>
              <Select
                style={{ width: 225, marginLeft: "8px" }}
                optionFilterProp="label"
                onChange={(value: string) => {
                  updateReadingStatus(value, id!);
                }}
                options={DEFAULT_READING_STATUS}
                value={book.readingStatus}
                variant="filled"
              />
              {book.isFavorite ? (
                <HeartFilled
                  style={{ color: "pink", fontSize: "21px", marginLeft: "16px" }}
                  onClick={() => updateIsFavorite(false, id!)}
                />
              ) : (
                <HeartOutlined
                  style={{ color: "pink", fontSize: "21px", marginLeft: "16px" }}
                  onClick={() => updateIsFavorite(true, id!)}
                />
              )}
            </div>
            <div style={{ marginBottom: "16px" }}>
              <Text>Your Rating:</Text>
              <Rate
                allowHalf
                defaultValue={book.myRating}
                style={{ marginLeft: "8px", color: Colors.secondary }}
                onChange={(val) => updateRating(val, id!)}
              />
            </div>
            <div style={{ marginBottom: "16px" }}>
              <Text>Average Rating:</Text>
              <Rate
                allowHalf
                defaultValue={book.rating}
                disabled
                style={{ marginLeft: "8px", color: Colors.secondary }}
              />
            </div>
          </Col>
        </Row>

        <Divider />

        <Row gutter={[16, 16]}>
          <Col xs={24} md={8}>
            <Card
              size="small"
              title="Quick Stats"
              style={{ backgroundColor: "#f9f9f9" }}
            >
              <p>
                <BookOutlined /> Pages: {book.numberOfPages || " - "}
              </p>
              <p>Genre: {book.genres?.map(({ name }) => name).join(", ")}</p>
            </Card>
          </Col>
          <Col xs={24} md={16}>
            <Title level={4}>About this book</Title>
            <Paragraph>{book.firstSentence}</Paragraph>
          </Col>
        </Row>
        <Divider orientation="left">Music</Divider>
        <PlaylistContainer bookId={book.id} />
        <Divider orientation="left">Related Books</Divider>
        <List
          grid={{ gutter: 16, column: 3 }}
          loading={isLoading}
          dataSource={relatedBooks}
          renderItem={(item) => (
            <List.Item>
              <Card
                hoverable
                style={{ ...relatedBookStyles.card, width: 200 }}
                bodyStyle={{
                  padding: "8px",
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                }}
                cover={
                  <div style={{ ...relatedBookStyles.imageContainer, height: 180 }}>
                    <img
                      alt={item.title}
                      src={item.imageUrl}
                      style={relatedBookStyles.image}
                    />
                  </div>
                }
                onClick={() => {
                  setSelectedRelatedBook(item);
                }}
              >
                <Card.Meta
                  title={<div style={relatedBookStyles.title}>{item.title}</div>}
                  description={<div style={relatedBookStyles.author}>{item.author}</div>}
                  style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                />
              </Card>
            </List.Item>
          )}
        />

<Divider orientation="left">Comments</Divider>
        <div ref={commentsContainerRef} style={{ height: 300, overflowY: "auto", marginBottom: "20px" }}>
          {hasMoreComments && (
            <div style={{ textAlign: "center", margin: "20px 0" }}>
              <Button onClick={loadPreviousComments}>Load Previous Comments</Button>
            </div>
          )}
          <List
            itemLayout="horizontal"
            dataSource={displayedComments}
            renderItem={(item: IComment) => (
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar>{item.user.email[0].toUpperCase()}</Avatar>}
                  title={item.user.email}
                  description={item.comment}
                />
              </List.Item>
            )}
          />
        </div>
        <div style={{ marginBottom: "20px" }}>
          <TextArea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
            autoSize={{ minRows: 2, maxRows: 6 }}
            style={{ marginBottom: "10px" }}
          />
          <Button
            type="primary"
            icon={<CommentOutlined />}
            onClick={handleAddComment}
            disabled={!newComment.trim()}
          >
            Add Comment
          </Button>
        </div>
      </Card>
      <BookModal
        book={selectedRelatedBook}
        onClose={() => setSelectedRelatedBook(undefined)}
      />
    </div>
  );
};

export default BookPage;