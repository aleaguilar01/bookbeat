import { FC } from "react";
import { Card, Image, List, Popover, Typography } from "antd";
import Loading from "./Loading";
import { useRecommendedBooks } from "../hooks/useRecommendedBooks";

const { Title } = Typography;
interface BookRecommendationsProps {}

const BookRecommendations: FC<BookRecommendationsProps> = () => {
  const { recommendedBooks, isLoading } = useRecommendedBooks();
  
  if(isLoading){
    return <Loading />
  }
  return (
    <>
      <Title level={5}>Book Recommendations</Title>

      {isLoading ? (
        <Loading />
      ) : (
        <List
          grid={{ gutter: 16, column: 2 }}
          dataSource={recommendedBooks}
          renderItem={(item) => (
            <List.Item>
              <Popover title={item.title} content={item.author}>
                <Card style={{margin: 0, padding: 0}}><Image src={item.imageUrl} height={100}/></Card>
              </Popover>
            </List.Item>
          )}
        />
      )}
    </>
  );
};

export default BookRecommendations;
