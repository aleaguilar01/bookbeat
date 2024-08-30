import { Divider, Layout, theme, Typography } from "antd";
import BookCarousel from "../../componets/BookCarousel";
import BookRecommendations from "../../componets/BookRecommendations";

const { Sider, Content } = Layout;
const { Title } = Typography;
const HomeScreen = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout
      style={{
        padding: 0,
        margin:0,
        background: colorBgContainer,
        borderRadius: borderRadiusLG,
      }}
    >
      <Content style={{ margin: 0, minHeight: 300, background: colorBgContainer }}>
        <Title level={2}>My Favorite Books</Title>
        <BookCarousel />
      </Content>
      <Divider type="vertical"  variant="solid" />
      <Sider style={{ background: colorBgContainer, height: '100%'}} width={300}>
        <BookRecommendations />
      </Sider>
    </Layout>
  );
};

export default HomeScreen;
