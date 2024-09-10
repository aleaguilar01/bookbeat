import {
  Button,
  Dropdown,
  Layout,
  Avatar,
  MenuProps,
} from "antd";
import { useAuth } from "../context/auth-context";
const logoUrl = new URL("../../logo.jpeg", import.meta.url).href;
import SearchBar from "./SearchBar";
import { Link } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";

const { Header } = Layout;

const headerStyle: React.CSSProperties = {
  textAlign: "center",
  alignItems: "center",
  color: "#fff",
  height: 64,
  padding: "0 24px",
  display: "flex",
  lineHeight: 64,
  backgroundColor: "#179BAE",
  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
};

const NavBar = () => {
  const { logout, user } = useAuth();

  const items: MenuProps["items"] = [
    {
      label: (
        <Button type="link" onClick={logout}>
          Logout
        </Button>
      ),
      key: "logout",
    },
  ];

  return (
    <Header style={headerStyle}>
      <Button type="link" style={{ color: "#fff", marginRight: "16px" }}>
        <Link to="/">
          <Avatar size={50} src={logoUrl} />
        </Link>
      </Button>

      <div style={{ flex: 1 }}>
        <SearchBar placeholder="Search book" style={{ width: 400 }} />
      </div>

      <Button type="link" style={{ color: "#fff", marginRight: "16px" }}>
        <Link to="/books">My Books</Link>
      </Button>

      <Dropdown menu={{items}} trigger={["click"]} placement="bottomRight">
        <Button
          ghost
          style={{ padding: 0, margin: 0, height: 40, width: 40 }}
          shape="circle"
        >
          {user.profilePicture ? (
            <Avatar src={user.profilePicture} size={40} />
          ) : (
            <Avatar size={40} icon={<UserOutlined />} />
          )}
        </Button>
      </Dropdown>
    </Header>
  );
};

export default NavBar;
