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
  const api = useApi();
  useEffect(() => {
    const character = getRandomCharacter();
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

  return { conversation, onChat, isLoading };
};

interface ICharacters {
  name: string;
  book: string;
  role: "character" | "writter";
}

const CHARACTERS: Record<string, ICharacters> = {
  sam: {
    name: "Samwise Gamgee",
    book: "Lord of The Rings",
    role: "character",
  },
  poe: {
    name: "Edgar Allan Poe",
    role: "writter",
    book: "The Raven",
  },
  rhysand: {
    name: "Rhysand",
    role: "character",
    book: "A Court of Thorns and Roses"
  } 
};
