import { Card, Flex, Input, Typography, Button, Avatar, Switch, Select } from "antd";
import { ChangeEventHandler, FC, useEffect, useRef, useState } from "react";
import {
  AudioOutlined,
  AudioMutedOutlined,
  UserOutlined,
  SendOutlined,
  SoundOutlined,
} from "@ant-design/icons";

import Loading from "./Loading";
import { useChat } from "../hooks/useChat";
import { Colors } from "../constants";

const { TextArea } = Input;
const { Paragraph } = Typography;
const { Option } = Select;

const Chat: FC = () => {
  const { conversation, isLoading, onChat, avatarUrl } = useChat();
  const [text, setText] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null);

  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const speechSynthesisRef = useRef<SpeechSynthesis | null>(null);

  useEffect(() => {
    if ("SpeechRecognition" in window || "webkitSpeechRecognition" in window) {
      const SpeechRecognition =
        (window as any).SpeechRecognition ||
        (window as any).webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;

      recognitionRef.current.onresult = (event: SpeechRecognitionEvent) => {
        const transcript = Array.from(event.results)
          .map((result) => result[0].transcript)
          .join("");
        setText(transcript);
      };

      recognitionRef.current.onerror = (event: ErrorEvent) => {
        console.error("Speech recognition error", event.error);
        setIsListening(false);
      };
    }

    if ("speechSynthesis" in window) {
      speechSynthesisRef.current = window.speechSynthesis;

      // Load voices
      const loadVoices = () => {
        const availableVoices = speechSynthesisRef.current!.getVoices();
        setVoices(availableVoices);
        if (availableVoices.length > 0) {
          setSelectedVoice(availableVoices[0]);
        }
      };

      loadVoices();
      if (speechSynthesisRef.current.onvoiceschanged !== undefined) {
        speechSynthesisRef.current.onvoiceschanged = loadVoices;
      }
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      if (speechSynthesisRef.current) {
        speechSynthesisRef.current.cancel();
      }
    };
  }, []);

  useEffect(() => {
    const lastMessage = conversation[conversation.length - 1];
    if (lastMessage && lastMessage.role === "assistant" && !isMuted) {
      speakMessage(lastMessage.content);
    }
  }, [conversation, isMuted]);

  const handleText: ChangeEventHandler<HTMLTextAreaElement> = (event) => {
    setText(event.currentTarget.value);
  };

  const handleChat = () => {
    onChat(text);
    setText("");
  };

  const toggleListening = () => {
    if (!recognitionRef.current) {
      console.error("Speech recognition not supported");
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
    } else {
      recognitionRef.current.start();
    }
    setIsListening(!isListening);
  };

  const speakMessage = (message: string) => {
    if (!speechSynthesisRef.current) {
      console.error("Speech synthesis not supported");
      return;
    }

    const utterance = new SpeechSynthesisUtterance(message);
    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    speechSynthesisRef.current.speak(utterance);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (speechSynthesisRef.current && isSpeaking) {
      speechSynthesisRef.current.cancel();
      setIsSpeaking(false);
    }
  };

  const handleVoiceChange = (value: string) => {
    const voice = voices.find(v => v.name === value);
    if (voice) {
      setSelectedVoice(voice);
    }
  };

  return (
    <Card
      style={{
        position: "fixed",
        right: 20,
        bottom: 100,
        height: 600,
        zIndex: 400,
        width: 400,
        boxShadow: "0px 0px 16px 6px rgba(0, 0, 0, 0.1)",
        borderRadius: 16,
        display: "flex",
        flexDirection: "column",
      }}
      bodyStyle={{
        padding: 0,
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <Flex
        vertical
        style={{
          flexGrow: 1,
          overflowY: "auto",
          padding: "16px",
          paddingBottom: 0,
        }}
      >
        {conversation.map((msg, idx) => {
          return (
            <Flex
              key={idx}
              justify={msg.role === "user" ? "flex-end" : "flex-start"}
              align="flex-start"
              style={{ marginBottom: 16 }}
            >
              {msg.role === "assistant" && (
                <Avatar
                  size={36}
                  src={avatarUrl}
                  style={{ marginRight: 8, flexShrink: 0 }}
                />
              )}
              <Paragraph
                style={{
                  backgroundColor:
                    msg.role === "user" ? Colors.primary : Colors.secondary,
                  color: "white",
                  padding: "8px 12px",
                  borderRadius: 16,
                  maxWidth: "70%",
                  wordWrap: "break-word",
                  margin: 0,
                  fontSize: 14,
                }}
              >
                {msg.content}
              </Paragraph>
              {msg.role === "user" && (
                <Avatar
                  size={36}
                  icon={<UserOutlined />}
                  style={{ marginLeft: 8, flexShrink: 0 }}
                />
              )}
            </Flex>
          );
        })}
        {isLoading && (
          <Loading style={{ alignSelf: "center", marginTop: 16 }} />
        )}
      </Flex>
      <Flex
        vertical
        style={{
          borderTop: "1px solid #e8e8e8",
          padding: "16px",
          backgroundColor: "#f5f5f5",
        }}
      >
        <TextArea
          placeholder="Type your message..."
          value={text}
          onChange={handleText}
          style={{
            resize: "none",
            borderRadius: 8,
            marginBottom: 8,
          }}
          rows={2}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleChat();
            }
          }}
        />
        <Flex justify="space-between" align="center">
          <Flex align="center">
            <Button
              onClick={toggleListening}
              icon={isListening ? <AudioMutedOutlined /> : <AudioOutlined />}
              style={{ marginRight: 8 }}
            />
            <Switch
              checkedChildren={<SoundOutlined />}
              unCheckedChildren={<AudioMutedOutlined />}
              checked={!isMuted}
              onChange={toggleMute}
              style={{ marginRight: 8 }}
            />
            <Select
              style={{ width: 200 }}
              value={selectedVoice?.name}
              onChange={handleVoiceChange}
              disabled={isMuted}
            >
              {voices.map((voice) => (
                <Option key={voice.name} value={voice.name}>
                  {voice.name}
                </Option>
              ))}
            </Select>
          </Flex>
          <Button
            type="primary"
            onClick={handleChat}
            icon={<SendOutlined />}
            disabled={!text.trim()}
          />
        </Flex>
      </Flex>
    </Card>
  );
};

export default Chat;