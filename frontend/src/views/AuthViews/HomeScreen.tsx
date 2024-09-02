import { Divider, Layout, theme, Typography } from "antd";
import BookCarousel from "../../componets/BookCarousel";
import BookRecommendations from "../../componets/BookRecommendations";
import Activity from "../../componets/Activity";

const { Sider, Content } = Layout;
const { Title } = Typography;
const HomeScreen = () => {
  const {
    token: { colorBgContainer, borderRadiusLG, colorBgBase },
  } = theme.useToken();
  return (
    <Layout
      style={{
        padding: 0,
        margin: 0,
        background: colorBgBase,
        borderRadius: borderRadiusLG,
      }}
    >
      <Content
        style={{
          margin: 0,
          minHeight: "92vh",
          background: colorBgContainer,
        }}
      >
        <Title level={2}>My Favorite Books</Title>
        <BookCarousel />
      </Content>
      <Divider
        type="vertical"
        variant="solid"
        style={{ minHeight: "92vh", width: 20, borderWidth: 14 }}
      />
      <Sider
        style={{ background: colorBgContainer, height: "100%" }}
        width="30%"
      >
        <Activity />
        <BookRecommendations />
      </Sider>
    </Layout>
  );
};

export default HomeScreen;
