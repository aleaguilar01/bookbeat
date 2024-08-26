import { Divider } from "antd";
import BookCarousel from "../../componets/BookCarousel";
import BookStatus from "../../componets/BookStatus";
import ChatButton from "../../componets/ChatButton";
const logoUrl = new URL("../../../logo.jpeg", import.meta.url).href;

const HomeScreen = () => {
  console.log(logoUrl);
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
