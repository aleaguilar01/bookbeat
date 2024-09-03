import { ChangeEventHandler, FC, useMemo, useState } from "react";
import { Input, List, Rate, Select, Space, Typography, Card, Tag, Tooltip, Divider, Row, Col, Popconfirm } from "antd";
import { CalendarOutlined, BookOutlined, HeartOutlined, HeartFilled, SearchOutlined, MessageOutlined, StarOutlined, DeleteOutlined } from "@ant-design/icons";
import { useHandleBooks } from "../../hooks/useHandleBooks";
import { Colors, DEFAULT_READING_STATUS } from "../../constants";
import { Link } from "react-router-dom";
import BookCommentModal from "../../componets/BookCommentModal";
import { IBook, useBook } from "../../context/books-context";

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;

const emptyStateUrl = new URL("../../../empty-state-v4.jpg", import.meta.url).href;

const extraBookOptions = [
  { value: "all", label: "All" },
  { value: "favorites", label: "Favorites" },
];

const MyBooksScreen: FC = () => {
  const { updateRating, updateIsFavorite, updateReadingStatus, deleteBook, isLoading: isProcessing } = useHandleBooks();
  const { isLoading, myBooks } = useBook();
  const [bookStatusFilter, setBookStatusFilter] = useState("all");
  const [searchContent, setSearchContent] = useState("");
  const [selectedBook, setSelectedBook] = useState<IBook| undefined>();
  
  const handleSelectStatus = (value) => setBookStatusFilter(value);
  const handleSearchContent: ChangeEventHandler<HTMLInputElement> = (event) => setSearchContent(event.currentTarget.value)

  const filteredData = useMemo(() => {
    return myBooks
      .filter(({ readingStatus, isFavorite }) => {
        if (bookStatusFilter === "all") return true;
        if (bookStatusFilter === "favorites") return isFavorite;
        return readingStatus === bookStatusFilter;
      })
      .filter((book) => {
        if (searchContent.length === 0) return true;
        return book.author.toLowerCase().includes(searchContent.toLowerCase()) ||
               book.title.toLowerCase().includes(searchContent.toLowerCase());
      });
  }, [myBooks, bookStatusFilter, searchContent]);

  return (
    <Card style={{ margin: '24px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Title level={2} style={{ margin: 0, color: Colors.primary }}>My Books</Title>
          <Space>
            <Input
              placeholder="Search Your Books"
              value={searchContent}
              onChange={handleSearchContent}
              style={{ width: 250 }}
              prefix={<SearchOutlined style={{ color: Colors.secondary }} />}
            />
            <Select
              style={{ width: 225 }}
              onChange={handleSelectStatus}
              value={bookStatusFilter}
              placeholder="Filter by status"
            >
              {[...extraBookOptions, ...DEFAULT_READING_STATUS].map(option => (
                <Option key={option.value} value={option.value}>{option.label}</Option>
              ))}
            </Select>
          </Space>
        </div>
        
        <List
          loading={isLoading || isProcessing}
          itemLayout="horizontal"
          dataSource={filteredData}
          locale={{
            emptyText: <img src={emptyStateUrl} alt="No books found" style={{ width: '100%', maxWidth: 400 }} />
          }}
          renderItem={(item) => (
            <List.Item
              key={item.isbn}
            >
              <Row style={{ width: '100%', alignItems: 'stretch' }}>
                <Col flex="auto">
                  <List.Item.Meta
                    title={
                      <Link to={`/books/${item.id}`} style={{ color: Colors.primary, fontSize: '18px', fontWeight: 'bold' }}>
                        {item.title}
                      </Link>
                    }
                    description={
                      <Space direction="vertical" size="small" style={{ width: '100%' }}>
                        <Text strong>{item.author}</Text>
                        <Space split={<Divider type="vertical" />}>
                          <Tag icon={<StarOutlined />} color={Colors.primary}>Avg: {item.rating?.toFixed(2) || 'N/A'}</Tag>
                          <Tag icon={<CalendarOutlined />}>{item.publishedYear}</Tag>
                          <Tag icon={<BookOutlined />}>{item.numberOfPages || 0} pages</Tag>
                          <Tag icon={<MessageOutlined />} onClick={()=>setSelectedBook(item)} style={{cursor: "pointer"}}>{item.comments || 0} comments</Tag>
                        </Space>
                        <Paragraph
                          ellipsis={{
                            rows: 2,
                            expandable: true,
                            symbol: 'Show more',
                          }}
                          style={{ maxWidth: '100%', marginBottom: 0 }}
                        >
                          {item.firstSentence}
                        </Paragraph>
                      </Space>
                    }
                  />
                </Col>
                <Col flex="none" style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-end', marginLeft: '16px', marginRight: '16px' }}>
                  <Rate 
                    allowHalf 
                    value={item.myRating} 
                    onChange={(rating) => updateRating(rating, item.id)} 
                    style={{ fontSize: 24, color: Colors.secondary }} 
                  />
                  <Select
                    style={{ width: 200 }}
                    onChange={(value: string) => updateReadingStatus(value, item.id)}
                    value={item.readingStatus}
                    options={DEFAULT_READING_STATUS}
                    size="small"
                  />
                  <Popconfirm
                    title="Delete this book"
                    description="Are you sure you want to delete this book?"
                    onConfirm={() => deleteBook(item.id)}
                    okText="Yes"
                    cancelText="No"
                  >
                    <DeleteOutlined style={{ color: Colors.secondary, fontSize: 20, cursor: 'pointer' }} />
                  </Popconfirm>
                </Col>
                <Col flex="none" style={{ position: 'relative' }}>
                  <Link to={`/books/${item.id}`}>
                    <img 
                      height={180} 
                      alt={item.title} 
                      src={item.imageUrl} 
                      style={{ 
                        boxShadow: '0 4px 8px rgba(0,0,0,0.1)', 
                        borderRadius: '8px',
                        objectFit: 'cover'
                      }} 
                    />
                  </Link>
                  <Tooltip title={item.isFavorite ? "Remove from favorites" : "Add to favorites"}>
                    {item.isFavorite ? (
                      <HeartFilled 
                        style={{ 
                          position: 'absolute', 
                          top: 5, 
                          right: 5, 
                          color: Colors.secondary, 
                          fontSize: 24,
                          filter: 'drop-shadow(0 0 2px rgba(0,0,0,0.5))',
                          cursor: 'pointer'
                        }} 
                        onClick={() => updateIsFavorite(false, item.id)} 
                      />
                    ) : (
                      <HeartOutlined 
                        style={{ 
                          position: 'absolute', 
                          top: 5, 
                          right: 5, 
                          color: 'white', 
                          fontSize: 24,
                          filter: 'drop-shadow(0 0 2px rgba(0,0,0,0.5))',
                          cursor: 'pointer'
                        }} 
                        onClick={() => updateIsFavorite(true, item.id)} 
                      />
                    )}
                  </Tooltip>
                </Col>
              </Row>
            </List.Item>
          )}
        />
      </Space>
      <BookCommentModal book={selectedBook} onClose={() => setSelectedBook(undefined)} />
    </Card>
  );
};

export default MyBooksScreen;