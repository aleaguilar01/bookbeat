import { Card, Flex, Input, Typography, Button } from "antd";
import { ChangeEventHandler, FC, useState } from "react";
import Loading from "./Loading";
import { useChat } from "../hooks/useChat";

const { Paragraph } = Typography;

const Chat: FC = () => {
  const { conversation, isLoading, onChat } = useChat();
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
        position: "absolute",
        right: 100,
        bottom: 100,
        height: 300,
        zIndex: 400,
        width: 400,
      }}
    >
      <Flex gap="small" vertical style={{ height: 225, overflowY: "scroll" }}>
        {conversation.map((msg, idx) => {
          return (
            <Paragraph
              key={idx}
              style={{
                minWidth: 20,
                textAlign: msg.role == "user" ? "right" : "left",
                border: 1,
                borderColor: "grey",
                backgroundColor: msg.role == "user" ? "blue" : "green",
                borderRadius: 8,
                padding: 8,
                color: "white",
                fontSize: 12
              }}
            >
              {msg.content}
            </Paragraph>
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
          style={{width: 270}}
        />
        <Button type="primary" onClick={handleChat}>
          Send
        </Button>
      </Flex>
    </Card>
  );
};

export default Chat;
