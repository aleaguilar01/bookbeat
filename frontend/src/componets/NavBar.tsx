import { Button, Flex, Layout } from "antd";
import { useAuth } from "../context/auth-context";
const logoUrl = new URL("../../logo.jpeg", import.meta.url).href;

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
  const {logout } = useAuth();

  return(
    <Header style={headerStyle}>
    <Flex dir="horizontal" justify="space-between" align="center">
  <img src={logoUrl} alt="logo" style={{height: '50px'}} />
    Book Beat
    <Button onClick={logout}>Logout</Button>
    </Flex>
  </Header>
  )
}

export default NavBar;