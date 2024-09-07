import React, { FC, useState, useEffect, useRef } from "react";
import { IBook, IComment } from "../context/books-context";
import { useHandleBooks } from "../hooks/useHandleBooks";
import { Input, Modal, List, Avatar, Button, Divider, Typography } from "antd";

const { TextArea } = Input;
const { Text } = Typography;

interface IBookCommentModalProps {
  book: Omit<IBook, "readingStatus"> & { readingStatus?: string };
  onClose: VoidFunction;
  isReadOnly?: boolean;
}

const COMMENTS_PER_PAGE = 4;

const BookCommentModal: FC<IBookCommentModalProps> = ({
  book,
  onClose,
  isReadOnly = false,
}) => {
  if (!book) return null;

  const [comment, setComment] = useState<string>("");
  const [displayedComments, setDisplayedComments] = useState<IComment[]>([]);
  const [startIndex, setStartIndex] = useState<number>(0);
  const commentsContainerRef = useRef<HTMLDivElement>(null);
  const loadPreviousButtonRef = useRef<HTMLDivElement>(null);

  const { createComment } = useHandleBooks();

  useEffect(() => {
    if (book.bookComments) {
      const totalComments = book.bookComments.length;
      const newStartIndex = Math.max(0, totalComments - COMMENTS_PER_PAGE);
      setStartIndex(newStartIndex);
      setDisplayedComments(book.bookComments.slice(newStartIndex));
    }
  }, [book.bookComments]);

  const handleOk = () => {
    if (comment.trim()) {
      createComment(comment, book.isbn)
        .then(() => {
          setComment("");
        })
        .then(() => {
          onClose();
        });
    }
  };

  const loadPreviousComments = () => {
    if (book.bookComments && commentsContainerRef.current) {
      const container = commentsContainerRef.current;
      const scrollPosition = container.scrollHeight - container.scrollTop;

      const newStartIndex = Math.max(0, startIndex - COMMENTS_PER_PAGE);
      setStartIndex(newStartIndex);
      setDisplayedComments(book.bookComments.slice(newStartIndex));
      
      // Maintain scroll position after new comments are loaded
      setTimeout(() => {
        if (container) {
          container.scrollTop = container.scrollHeight - scrollPosition;
          
          // Smooth scroll to top after a brief pause
          setTimeout(() => {
            container.scrollTo({ top: 0, behavior: 'smooth' });
          }, 200);
        }
      }, 0);
    }
  };

  const hasMoreComments = startIndex > 0;

  return (
    <Modal
      open={!!book}
      onCancel={onClose}
      footer={null}
      title={`Comments for "${book.title}"`}
      width={800}
    >
      <div style={{ height: 570, display: "flex", flexDirection: "column" }}>
        <div
          ref={commentsContainerRef}
          style={{ flex: 1, overflowY: "auto", marginBottom: "20px" }}
        >
          <div ref={loadPreviousButtonRef}>
            {hasMoreComments ? (
              <div style={{ textAlign: "center", margin: "20px 0" }}>
                <Button onClick={loadPreviousComments}>Load Previous Comments</Button>
              </div>
            ) : (
              <Text type="secondary" style={{ display: 'block', textAlign: 'center', margin: '20px 0' }}>
                No more comments to load
              </Text>
            )}
          </div>
          <List
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
        {!isReadOnly && (
          <>
            <Divider />
            <div>
              <TextArea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Add a comment..."
                autoSize={{ minRows: 2, maxRows: 6 }}
              />
              <div style={{ marginTop: "10px", textAlign: "right" }}>
                <Button
                  type="primary"
                  onClick={handleOk}
                  disabled={!comment.trim()}
                >
                  Add Comment
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </Modal>
  );
};

export default BookCommentModal;