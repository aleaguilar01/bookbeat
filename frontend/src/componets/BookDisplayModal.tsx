import { Modal, Image, Space } from "antd";
import { FC } from "react";
import { useBook } from "../context/books-context";

interface BookDisplayModalProps {}
const BookDisplayModal: FC<BookDisplayModalProps> = ({}) => {
  const { currentBook, selectCurrentBook } = useBook();
  if (!currentBook) return null;
  return (
    <Modal
      open={!!currentBook}
      onCancel={() => {
        selectCurrentBook();
      }}
      title={<Space>{currentBook.title}</Space>}
      footer={null}
      centered
      height="80vh"
      width="80vw"
    >

      <Image src={currentBook.imageUrl} preview={false}/>

    </Modal>
  );
};

export default BookDisplayModal;
