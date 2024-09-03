import { FC, useState } from "react";
import { IBook } from "../context/books-context";
import { useHandleBooks } from "../hooks/useHandleBooks";
import { Input, Modal } from "antd";

interface IBookCommentModalProps {
  book: Omit<IBook, "readingStatus"> & { readingStatus?: string };
  onClose: VoidFunction;
  isReadOnly?: boolean;
}

const BookCommentModal: FC<IBookCommentModalProps> = ({
  book,
  onClose,
  isReadOnly = false,
}) => {
  if (!book) return null;

  const [comment, setComment] = useState<null | string>(
    ""
  );

  const { createComment } = useHandleBooks();
  const handleOk = () => {
    createComment(
      comment,
      book.isbn,
    ).then(() => {
      onClose();
    });
  };

  return (
    <>
      <Modal
        open={!!book}
        onOk={handleOk}
        okText="Add"
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

        <Input value={comment}
          onChange={(event) => { setComment(event.currentTarget.value) }} />

      </Modal>
    </>
  );
};

export default BookCommentModal;
