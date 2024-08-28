import { useEffect, useState } from "react";
import { useApi } from "./useApi";

export interface IMessage {
  role: "user" | "assistant";
  content: string;
}

const getRandomCharacter = () => {
  var keys = Object.keys(CHARACTERS);
  return keys[(keys.length * Math.random()) << 0];
};

export const useChat = () => {
  const [conversation, setConversation] = useState<Array<IMessage>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState("");
  const api = useApi();

  useEffect(() => {
    const character = getRandomCharacter();
    setAvatarUrl(CHARACTERS[character].avatar);
    setConversation([
      {
        role: "assistant",
        content: `Hello my name is ${CHARACTERS[character].name} the ${CHARACTERS[character].role} of ${CHARACTERS[character].book}. What topic related to books (literature) or music would you like to discuss?`,
      },
    ]);
  }, []);

  const onChat = async (userMessage: string) => {
    setIsLoading(true);
    api
      .post("ai/chat", {
        conversation: [...conversation, { role: "user", content: userMessage }],
      })
      .then((res) => {
        if (res.data) {
          setConversation((prev) => [
            ...prev,
            { role: "user", content: userMessage },
            { role: "assistant", content: res.data },
          ]);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return { conversation, onChat, isLoading, avatarUrl };
};

interface ICharacters {
  name: string;
  book: string;
  role: "character" | "writter";
  avatar: string;
}

const CHARACTERS: Record<string, ICharacters> = {
  sam: {
    name: "Samwise Gamgee",
    book: "Lord of The Rings",
    role: "character",
    avatar: new URL(`../../characters/sam.png`, import.meta.url).href,
  },
  poe: {
    name: "Edgar Allan Poe",
    role: "writter",
    book: "The Raven",
    avatar: new URL(`../../characters/poe.png`, import.meta.url).href,
  },
  rhysand: {
    name: "Rhysand",
    role: "character",
    book: "A Court of Thorns and Roses",
    avatar: new URL(`../../characters/rhysan.png`, import.meta.url).href,
  },
  holmes: {
    name: "Sherlock Holmes",
    role: "character",
    book: "A Study in Scarlet",
    avatar: new URL(`../../characters/holmes.png`, import.meta.url).href,
  },
  elizabeth: {
    name: "Elizabeth Bennet",
    role: "character",
    book: "Pride and Prejudice",
    avatar: new URL(`../../characters/elizabeth.png`, import.meta.url).href,
  },
};
