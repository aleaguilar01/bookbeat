import { useAuth } from "../../context/auth-context";
import { Outlet, Navigate } from "react-router-dom";
import { Layout } from "antd";
import NavBar from "../../componets/NavBar";
import ChatButton from "../../componets/ChatButton";
import BookModalWrapper from "../../componets/BookModalWrapper";
import Loading from "../../componets/Loading";
import BookProvider from "../../context/books-context";

const { Content } = Layout;

const contentStyle: React.CSSProperties = {
  padding: "0 48px",
};
const PrivateRoute = () => {
  const { user, loading } = useAuth();
  if (loading) {
    return <Loading />;
  }
  if (!user || !user.token) {
    return <Navigate to="login" />;
  }
  return (
    <BookProvider>
      <Layout>
        <NavBar />
        <Content style={contentStyle}>
          <Outlet />
        </Content>
        <BookModalWrapper />
        <ChatButton />
      </Layout>
    </BookProvider>
  );
};

export default PrivateRoute;
