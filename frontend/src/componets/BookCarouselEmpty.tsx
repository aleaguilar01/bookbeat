import { Empty } from "antd";
const emptyStateUrl = new URL("../../empty-state.png", import.meta.url).href;

const BookCarouselEmpty = () => {
  return (
    <Empty
      image={emptyStateUrl}
      imageStyle={{ height: 300 }}
      description="No Fav Books Yet!"
    >
      {/* <Button type="primary">Add Books</Button> */}
    </Empty>
  );
};

export default BookCarouselEmpty;
