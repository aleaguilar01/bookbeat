import { Button, Flex, Layout, Image } from "antd";
import { useAuth } from "../context/auth-context";
const logoUrl = new URL("../../logo.jpeg", import.meta.url).href;
import SearchBar from "./SearchBar";
import { Link } from "react-router-dom";

const { Header } = Layout;

const headerStyle: React.CSSProperties = {
  textAlign: "center",
  color: "#fff",
  height: 64,
  paddingInline: 48,
  lineHeight: "64px",
  backgroundColor: "#4096ff",
};

const NavBar = () => {
  const { logout } = useAuth();

  return (
    <Header style={headerStyle}>
      <Flex dir="horizontal" justify="space-between" align="center">
        <Image src={logoUrl} alt="logo" style={{ height: "50px" }} />
        Book Beat
        <SearchBar placeholder="Search book" style={{ width: 400 }} />
        <Link to="/music-dashboard">Music Player</Link>
        <Button onClick={logout}>Logout</Button>
      </Flex>
    </Header>
  );
};

export default NavBar;
