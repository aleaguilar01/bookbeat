import { useAuth } from "../../context/auth-context";
import { Outlet, Navigate } from "react-router-dom";
import { Button, Layout, Flex } from "antd";
import NavBar from "../../componets/NavBar";
import ChatButton from "../../componets/ChatButton";


const { Content } = Layout;

const contentStyle: React.CSSProperties = {
  padding: "0 48px",
};
const PrivateRoute = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <>Loading....</>;
  }
  return user && user.token ? (
    <Layout>
      <NavBar />
      <Content style={contentStyle}>
        <Outlet />
      </Content>
      <ChatButton />
    </Layout>
  ) : (
    <Navigate to="login" />
  );
};

export default PrivateRoute;
