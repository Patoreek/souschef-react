import { useState, useEffect } from "react";

import PromptInput from "./PromptInput";
import Chatbox from "./Chatbox";
import axios from "axios";
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
  const [conversationId, setConversationId] = useState<any>(null);

  useEffect(() => {
    // Log chat history for debugging
    console.log(chatHistory);
    const latestChatPrompt = chatHistory[chatHistory.length - 1];
    // Only call emulateChatbotResponse if the last message is from the user
    if (chatHistory.length > 0 && latestChatPrompt.role === "user") {
      setTimeout(() => {
        // emulateChatbotResponse();
        sendPrompt(latestChatPrompt);
      }, 2000);
    }
  }, [chatHistory]);

  const sendPrompt = async (latestChatPrompt: ChatMessage) => {
    console.log(latestChatPrompt);
    try {
      // Make the POST request to the API
      const response = await axios.post(
        "http://localhost:3000/ask-chef",
        latestChatPrompt
      );
      // console.log(response);

      const userChatLog = response.data.userPrompt;
      const gptChatLog = response.data.gptChat;
      console.log("UserChat:", userChatLog);
      console.log("GPTChat:", gptChatLog);

      // Update chat state with the new chat entry
      setChatHistory((prevChatHistory) => {
        // Replace the last user message with the updated userChatLog
        const updatedChatHistory = [...prevChatHistory];
        updatedChatHistory[updatedChatHistory.length - 1] = userChatLog;

        // Add the GPT chat log to the chat history
        updatedChatHistory.push(gptChatLog);

        return updatedChatHistory;
      });
    } catch (error) {
      // Handle any errors during the request
      // setError(error.response ? error.response.data : 'An error occurred');
    }
  };

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
            chatHistory={chatHistory}
            setChatHistory={setChatHistory}
            conversationId={conversationId}
            setConversationId={setConversationId}
          />
        </div>
      </div>
    </div>
  );
};

export default AiAssistant;
