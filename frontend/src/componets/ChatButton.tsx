import React, { useState } from "react";
import { Avatar, Button } from "antd";
import Chat from "./Chat";
const logoUrl = new URL(`../../logo.jpeg`, import.meta.url).href;

const ICON_SIZE = 50
const ChatButton: React.FC = () => {
  const [displayChat, setDisplayChat] = useState(false);

  return (
    <>
      <Button
        onClick={() => setDisplayChat((prev) => !prev)}
        ghost
        style={{
          margin: 0,
          position: "fixed",
          bottom: 35,
          right: 94,
          height: ICON_SIZE,
          width: ICON_SIZE,
          padding: 0,
          boxShadow: "0px 0px 12px 6px rgba(0, 0, 0, 0.35)",
          zIndex: 400
        }}
        shape="round"
      >
        <Avatar size={ICON_SIZE} src={logoUrl} /> 
      </Button>
      {displayChat && <Chat />}
    </>
  );
};

export default ChatButton;
