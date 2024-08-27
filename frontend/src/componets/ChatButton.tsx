import React, { useState } from "react";
import { WechatOutlined } from "@ant-design/icons";
import { FloatButton } from "antd";
import Chat from "./Chat";

const ChatButton: React.FC = () => {
  const [displayChat, setDisplayChat] = useState(false);

  return (
    <>
      <FloatButton
        icon={<WechatOutlined />}
        shape="circle"
        style={{ insetInlineEnd: 94 }}
        onClick={() => setDisplayChat((prev) => !prev)}
      />
      {displayChat && <Chat />}
    </>
  );
};

export default ChatButton;
