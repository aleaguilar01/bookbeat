import { Divider } from "antd";
import BookCarousel from "../../componets/BookCarousel";
import BookStatus from "../../componets/BookStatus";
import ChatButton from "../../componets/ChatButton";

const HomeScreen = () => {
  return (
    <>
      <Divider />
      <BookCarousel />
      <Divider />
      <BookStatus />
      <ChatButton />
    </>
  );
};

export default HomeScreen;
