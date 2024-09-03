import React from 'react';
import { Button, Image, Typography, Layout } from 'antd';
import { useAuth } from "../../context/auth-context";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { SpotifyOutlined, BookOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;
const { Content } = Layout;

const logoUrl = new URL("../../../logo.jpeg", import.meta.url).href;

const SPOTIFY_CLIENT_ID: string = import.meta.env.VITE_SPOTIFY_CLIENT_ID || "";
const REDIRECT_URI: string = "http://localhost:5173/login";
const AUTH_URL: string = "https://accounts.spotify.com/authorize";
const SCOPE: string =
  "user-read-private user-read-email playlist-read-private playlist-read-collaborative playlist-modify-public playlist-modify-private app-remote-control user-read-playback-state user-modify-playback-state user-read-currently-playing streaming user-library-modify user-library-read";

const LoginScreen = () => {
  const { login } = useAuth();
  let [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    setSearchParams(window.location.hash);
  }, []);

  useEffect(() => {
    if (searchParams.get("code")) {
      login(searchParams.get("code"));
    }
  }, [searchParams]);

  const params = {
    client_id: SPOTIFY_CLIENT_ID,
    response_type: "code",
    scope: SCOPE,
    redirect_uri: REDIRECT_URI,
    show_dialog: true,
  };

  const urlParams = new URLSearchParams(params as any);
  const auth_url: string = `${AUTH_URL}?${urlParams.toString()}`;

  return (
    <Layout style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #1DB954 0%, #191414 100%)' }}>
      <Content style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '50px 20px' }}>
        <div style={{ 
          background: 'rgba(255, 255, 255, 0.9)',
          borderRadius: '15px',
          padding: '40px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
          textAlign: 'center',
          maxWidth: '400px',
          width: '100%'
        }}>
          <Image 
            src={logoUrl} 
            alt="logo" 
            style={{ height: 120, marginBottom: '20px' }} 
            preview={false}
          />
          <Title level={2} style={{ marginBottom: '20px', color: '#191414' }}>
            <BookOutlined /> BookBeats
          </Title>
          <Text style={{ display: 'block', marginBottom: '30px', fontSize: '16px', color: '#666' }}>
            Connect your Spotify account to start exploring books with matching tunes!
          </Text>
          <Button
            type="primary"
            href={auth_url}
            icon={<SpotifyOutlined />}
            size="large"
            style={{ 
              backgroundColor: '#1DB954',
              borderColor: '#1DB954',
              height: '50px',
              fontSize: '18px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%'
            }}
          >
            Login With Spotify
          </Button>
        </div>
      </Content>
    </Layout>
  );
};

export default LoginScreen;