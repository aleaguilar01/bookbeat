import React, { FC, useState } from "react";
import {
  Modal,
  Image,
  Typography,
  Space,
  Rate,
  Tag,
  Row,
  Col,
  Flex,
  Tooltip,
} from "antd";
import { BookOutlined, HeartOutlined, HeartFilled } from "@ant-design/icons";
import { useHandleBooks } from "../hooks/useHandleBooks";
import { IBook } from "../context/books-context";
import ReadingStatusRadioBtn from "./ReadingStatusRadioBtn";
import { Colors } from "../constants";

const noImage = new URL("../../no-image.png", import.meta.url).href;
const alternativeText = "No description available for this book.";
const { Text, Title, Paragraph } = Typography;

interface IBookModalProps {
  book: Omit<IBook, "readingStatus"> & { readingStatus?: string };
  onClose: VoidFunction;
  isReadOnly?: boolean;
}

const BookModal: FC<IBookModalProps> = ({
  book,
  onClose,
  isReadOnly = false,
}) => {
  if (!book) return null;

  const [readingStatus, setReadingStatus] = useState<string>(
    book.readingStatus || ""
  );
  const [isFavorite, setIsFavorite] = useState<boolean>(
    book.isFavorite || false
  );
  const [myRating, setMyRating] = useState<number>(book.myRating || 0);
  const { createBook } = useHandleBooks();

  const handleOk = () => {
    createBook({
      readingStatus,
      isFavorite,
      myRating,
      ...book,
    }).then(() => {
      onClose();
    });
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <Modal
      open={!!book}
      onOk={handleOk}
      okText="Save"
      okButtonProps={{ disabled: !readingStatus }}
      onCancel={onClose}
      footer={isReadOnly ? null : undefined}
      width={700}
      bodyStyle={{ height: "600px", padding: "24px", overflow: "hidden" }}
      title={
        <Title level={4} style={{ margin: 0, fontSize: "20px" }}>
          {book.title}
        </Title>
      }
    >
      <Row gutter={[24, 16]} style={{ height: "100%" }}>
        <Col span={10}>
          <Flex vertical align="center" style={{ height: "100%" }}>
            <div style={{ position: "relative", width: "100%" }}>
              <Image
                src={book.imageUrl || noImage}
                alt={book.title}
                style={{
                  width: "100%",
                  maxHeight: "300px",
                  objectFit: "contain",
                  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                  borderRadius: 8,
                  marginBottom: "16px",
                }}
                preview={false}
              />
              {!isReadOnly && (
                <Tooltip
                  title={
                    isFavorite ? "Remove from favorites" : "Add to favorites"
                  }
                >
                  {isFavorite ? (
                    <HeartFilled
                      style={{
                        position: "absolute",
                        top: 5,
                        left: 5,
                        color: Colors.secondary,
                        fontSize: 24,
                        filter: "drop-shadow(0 0 2px rgba(0,0,0,0.5))",
                        cursor: "pointer",
                      }}
                      onClick={toggleFavorite}
                    />
                  ) : (
                    <HeartOutlined
                      style={{
                        position: "absolute",
                        top: 5,
                        left: 5,
                        color: "white",
                        fontSize: 24,
                        filter: "drop-shadow(0 0 2px rgba(0,0,0,0.5))",
                        cursor: "pointer",
                      }}
                      onClick={toggleFavorite}
                    />
                  )}
                </Tooltip>
              )}
            </div>
            <Space direction="vertical" size={8} style={{ width: "100%" }}>
              <Text strong style={{ fontSize: "16px", textAlign: "center" }}>
                {book.author}
              </Text>
              <Flex align="center" justify="center">
                <Tooltip
                  title={`Average Rating: ${book.rating?.toFixed(1) || "N/A"}`}
                >
                  <Rate
                    value={book.rating || 0}
                    disabled
                    allowHalf
                    style={{ fontSize: "14px" }}
                  />
                </Tooltip>
                <Text style={{ marginLeft: "8px", fontSize: "14px" }}>
                  ({book.rating?.toFixed(1) || "N/A"})
                </Text>
              </Flex>
              {!isReadOnly && (
                <Flex
                  align="center"
                  justify="center"
                  style={{ marginTop: "8px" }}
                >
                  <Text style={{ marginRight: "8px" }}>My Rating:</Text>
                  <Rate
                    allowHalf
                    value={myRating}
                    onChange={setMyRating}
                    style={{ fontSize: 20, color: Colors.secondary }}
                  />
                </Flex>
              )}
              <Space wrap style={{ justifyContent: "center" }}>
                <Tag color="blue">ISBN: {book.isbn}</Tag>
                <Tag color="orange">
                  <BookOutlined /> {book.numberOfPages} pages
                </Tag>
              </Space>
            </Space>
          </Flex>
        </Col>
        <Col span={14}>
          <Flex vertical justify="space-between" style={{ height: "100%" }}>
            <div>
              <Title
                level={5}
                style={{ marginBottom: "8px", fontSize: "16px" }}
              >
                Description
              </Title>
              <Paragraph style={{ fontSize: "14px" }}>
                {book.firstSentence?.split(" ").slice(0, 50).join(" ") ||
                  alternativeText}
                {book.firstSentence?.split(" ").length > 50 ? "..." : ""}
              </Paragraph>
            </div>
            {!isReadOnly && (
              <div>
                <Title
                  level={5}
                  style={{ marginBottom: "8px", fontSize: "16px" }}
                >
                  Reading Status
                </Title>
                <ReadingStatusRadioBtn
                  readingStatus={readingStatus}
                  setReadingStatus={setReadingStatus}
                />
              </div>
            )}
          </Flex>
        </Col>
      </Row>
    </Modal>
  );
};

export default BookModal;
