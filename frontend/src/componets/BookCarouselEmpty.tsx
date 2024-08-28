import { Empty, Typography } from "antd";
const emptyStateUrl = new URL("../../empty-state.jpg", import.meta.url).href;

const { Text } = Typography;

const BookCarouselEmpty = () => {
  return (
    <Empty
      image={emptyStateUrl}
      imageStyle={{ height: 300 }}
      description={<Text>No Fav Books Yet!</Text>}
    >
      {/* <Button type="primary">Add Books</Button> */}
    </Empty>
  );
};

export default BookCarouselEmpty;
