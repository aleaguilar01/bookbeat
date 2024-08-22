import { Divider, Flex, Image } from "antd";
import BookCarousel from "../../componets/BookCarousel";
import BookStatus from "../../componets/BookStatus";
import AddBook from "../../componets/AddBook";
import SpotifyPlayer from "../../componets/SpotifyPlayer";
import ChatButton from "../../componets/ChatButton";
const logoUrl = new URL('../../../logo.jpeg', import.meta.url).href

const HomeScreen = () => {
  console.log(logoUrl)
  return (
    <>
      <Divider />
      <BookCarousel />
      <Divider />
      <Flex dir="horizontal" justify="space-around">
        <BookStatus />
        <AddBook />
      </Flex>
      <ChatButton />
    </>
  );
};

export default HomeScreen;
