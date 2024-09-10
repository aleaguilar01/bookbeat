import React from 'react';
import { Layout, Typography, Card } from 'antd';
import BookCarousel from '../../componets/BookCarousel';
import BookRecommendations from '../../componets/BookRecommendations';
import Activity from '../../componets/Activity';

const { Content } = Layout;
const { Title } = Typography;

const HomeScreen: React.FC = () => {


  return (
    <Layout
      style={{
        background: '#f0f2f5',
        height: 'calc(100vh - 64px)',
        overflow: 'hidden',
      }}
    >
      <Content
        style={{
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
        }}
      >
        <div style={{ display: 'flex', gap: 20, height: '40%' }}>
          <Card
            style={{
              borderRadius: 10,
              width: '70%',
              height: '100%',
              overflow: 'hidden',
              position: 'relative',
            }}
          >
            <Title level={5} style={{ marginBottom: '12px' }}>
              My Activity
            </Title>
            <Activity />
          </Card>
          <Card
            style={{
              borderRadius: 10,
              width: '30%',
              height: '100%',
              overflow: 'hidden',
            }}
          >
            <Title level={5} style={{ marginBottom: '12px' }}>
              Recommendations
            </Title>
            <BookRecommendations />
          </Card>
        </div>

        <Card
          style={{
            borderRadius: 10,
            height: 'calc(60% - 20px)',
            overflow: 'hidden',
          }}
        >
          <Title level={4} style={{ marginBottom: '12px' }}>
            My Favorite Books
          </Title>
          <div style={{ height: 'calc(100% - 48px)' }}>
            <BookCarousel />
          </div>
        </Card>
      </Content>
    </Layout>
  );
};

export default HomeScreen;
