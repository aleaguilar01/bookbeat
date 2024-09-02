import { Card, Flex, Input, Typography, Button, Avatar } from "antd";
import { ChangeEventHandler, FC, useState } from "react";
import { UserOutlined } from "@ant-design/icons";
import Loading from "./Loading";
import { useChat } from "../hooks/useChat";
import { Colors } from "../constants";

const { Paragraph } = Typography;

const Chat: FC = () => {
  const { conversation, isLoading, onChat, avatarUrl } = useChat();
  const [text, setText] = useState("");

  const handleText: ChangeEventHandler<HTMLInputElement> = (event) => {
    setText(event.currentTarget.value);
  };
  const handleChat = () => {
    onChat(text);
    setText("");
  };
  return (
    <Card
      style={{
        position: "fixed",
        right: 100,
        bottom: 100,
        height: 500,
        zIndex: 400,
        width: 500,
        boxShadow: "0px 0px 16px 6px rgba(0, 0, 0, 0.33)",
      }}
    >
      <Flex gap="small" vertical style={{ height: 425, overflowY: "auto" }}>
        {conversation.map((msg, idx) => {
          return (
            <Flex key={idx} justify="space-between" align="center" gap={8}>
              {msg.role == "assistant" && <Avatar size={44} src={avatarUrl} />}
              <Paragraph
                style={{
                  border: 1,
                  borderColor: "grey",
                  backgroundColor:
                    msg.role == "user" ? Colors.primary : Colors.secondary,
                  marginRight: msg.role == "user" ? 0 : 60,
                  marginLeft: msg.role == "user" ? 60 : 0,
                  borderRadius: 8,
                  padding: 8,
                  color: "white",
                  fontSize: 18,
                  alignSelf: msg.role == "user" ? "right" : "left",
                  width: 320,
                  textAlign: "left",
                }}
              >
                {msg.content}
              </Paragraph>
              {msg.role == "user" && (
                <Avatar size={44} icon={<UserOutlined />} />
              )}
            </Flex>
          );
        })}
        {isLoading && <Loading style={{ position: "absolute", bottom: 10 }} />}
      </Flex>
      <Flex gap="small" style={{ position: "absolute", bottom: 10 }}>
        <Input
          type="text"
          placeholder="Your message"
          value={text}
          onChange={handleText}
          style={{ width: 370 }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleChat();
            }
          }}
        />
        <Button type="primary" onClick={handleChat}>
          Send
        </Button>
      </Flex>
    </Card>
  );
};

export default Chat;
