import { useAuth } from "../../context/auth-context";
import { Outlet, Navigate } from "react-router-dom";
import { Layout } from "antd";
import NavBar from "../../componets/NavBar";
import ChatButton from "../../componets/ChatButton";
import BookProvider from "../../context/books-context";
import BookDisplayModal from "../../componets/BookDisplayModal";
import Loading from "../../componets/Loading";

const { Content } = Layout;

const contentStyle: React.CSSProperties = {
  padding: "0 48px",
};
const PrivateRoute = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <Loading />;
  }
  return user && user.token ? (
    <BookProvider>
      <Layout>
        <NavBar />
        <Content style={contentStyle}>
          <Outlet />
        </Content>
        <BookDisplayModal />
        <ChatButton />
      </Layout>
    </BookProvider>
  ) : (
    <Navigate to="login" />
  );
};

export default PrivateRoute;
