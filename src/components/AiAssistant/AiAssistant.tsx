import { useState, useEffect } from "react";

import PromptInput from "./PromptInput";
import Chatbox from "./Chatbox";

interface ChatMessage {
  id: string;
  role: string;
  content: string;
  created_at: number;
  conversation_id: string;
  user_id: string;
  session_id: string;
  message_type: string;
}

const AiAssistant = () => {
  const [input, setInput] = useState("");
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);

  useEffect(() => {
    // Log chat history for debugging
    console.log(chatHistory);

    // Only call emulateChatbotResponse if the last message is from the user
    if (
      chatHistory.length > 0 &&
      chatHistory[chatHistory.length - 1].role === "user"
    ) {
      setTimeout(() => {
        emulateChatbotResponse();
      }, 2000);
    }
  }, [chatHistory]);

  const emulateChatbotResponse = () => {
    const chatLog: ChatMessage = {
      id: "msg-12345",
      role: "system",
      content: generateRandomMessage(),
      created_at: Date.now(),
      conversation_id: "conv-67890",
      user_id: "user-abc123",
      session_id: "session-def456",
      message_type: "text",
      // status: "pending",
    };
    // Update chat state with the new chat entry
    setChatHistory((prevChatHistory) => {
      return [...prevChatHistory, chatLog]; // Append the new chat message
    });
  };

  // Function to generate a random message
  const generateRandomMessage = () => {
    const words = [
      "flibberflop",
      "blorptastic",
      "gibberish",
      "zibble",
      "glorf",
      "bloopity",
      "wooshtastic",
      "whibbles",
      "squee",
      "flibber",
      "wobbles",
      "splunk",
      "blargle",
      "quix",
      "zorb",
    ];
    const randomLength = Math.floor(Math.random() * 25) + 3; // Random length between 3 and 7 words
    let message = "";

    for (let i = 0; i < randomLength; i++) {
      const randomIndex = Math.floor(Math.random() * words.length);
      message += words[randomIndex] + " ";
    }

    return message.trim();
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-grow">
        <div className="p-2">
          <Chatbox chatHistory={chatHistory} />
        </div>
      </div>
      <div className="">
        <div className="px-2 pb-2">
          <PromptInput
            input={input}
            setInput={setInput}
            setChatHistory={setChatHistory}
          />
        </div>
      </div>
    </div>
  );
};

export default AiAssistant;
