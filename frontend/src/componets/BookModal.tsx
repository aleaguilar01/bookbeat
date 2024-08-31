import Rating from "./Rating";
import { Modal, Image, Flex, Typography, Space } from "antd";
import { FC, useState } from "react";
import { useHandleBooks } from "../hooks/useHandleBooks";
import { IBook } from "../context/books-context";
import ReadingStatusRadioBtn from "./ReadingStatusRadioBtn";

const noImage = new URL("../../no-image.png", import.meta.url).href;
const alternativeText = "NO DESCRIPTION AVAILABLE FOR THIS BOOK. SORRY!";
const { Text, Title } = Typography;

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

  const [readingStatus, setReadingStatus] = useState<null | string>(
    book.readingStatus ?? null
  );
  const { createBook } = useHandleBooks();
  const handleOk = () => {
    createBook({
      readingStatus,
      ...book,
    }).then(() => {
      onClose();
    });
  };

  return (
    <>
      <Modal
        open={!!book}
        onOk={handleOk}
        okText="Save"
        okButtonProps={{ disabled: readingStatus ? false : true }}
        onCancel={onClose}
        footer={isReadOnly ? null : undefined}
        styles={{
          header: {
            alignSelf: "center",
            justifySelf: "center",
            width: "100%",
            fontSize: "74px",
          },
          body: { height: 650 },
        }}
        width="800px"
      >
        <Title level={3}>{book.title}</Title>
        <Space size="large" align="center">
          <Image
            src={book.imageUrl || noImage}
            style={{
              height: "500px",
              objectFit: "cover",
              marginRight: 40,
            }}
            preview={false}
          />
          <Flex vertical gap={16} style={{ width: 350 }}>
            <Text italic>{book.author}</Text>
            <Rating rating={book.rating || 0} isEditable={false} />
            <Text>First published: {book.publishedYear}</Text>
            <Text>{book.numberOfPages} pages</Text>
            <Text>{book.firstSentence || alternativeText}</Text>
            <ReadingStatusRadioBtn
              readingStatus={readingStatus}
              setReadingStatus={setReadingStatus}
            />
          </Flex>
        </Space>
      </Modal>
    </>
  );
};

export default BookModal;
