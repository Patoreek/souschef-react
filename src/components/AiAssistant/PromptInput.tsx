import { Input } from "@/components/ui/input";
import axios from "axios";

const PromptInput = ({
  input,
  setInput,
  chatHistory,
  setChatHistory,
  conversationId,
  setConversationId,
}: {
  input: string;
  setInput: (value: string) => void;
  chatHistory: any; // Using `any` for setChat
  setChatHistory: (value: any) => void; // Using `any` for setChat
  conversationId: any;
  setConversationId: (value: any) => void;
}) => {
  // Handle the Enter key press to execute the action
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      executeAction();
    }
  };

  // Handle the button click to execute the action
  const handleButtonClick = () => {
    executeAction();
  };

  const createNewConversation = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/create-conversation"
      );
      console.log(response);
      return response.data.data.conversation_id;
    } catch (error) {
      // Handle any errors during the request
      // setError(error.response ? error.response.data : 'An error occurred');
    }
  };

  // Function to execute the action (e.g., send input, trigger action, etc.)
  const executeAction = async () => {
    console.log("Executing action with input:", input);

    const chatLog = {
      role: "user",
      content: input,
      conversation_id: conversationId,
      user_id: 1,
      message_type: "text",
      // status: "pending",
    };

    // If no conversation Id due to first message, generate a new conversation id and append to chatlog
    if (chatHistory.length === 0) {
      console.log("Inital message. Create new convo id...");
      const newConversationId = await createNewConversation();
      chatLog.conversation_id = newConversationId;
      setConversationId(newConversationId);
    }

    // console.log(chatLog);

    setChatHistory((prevChatHistory: any) => {
      return [...prevChatHistory, chatLog]; // Append the new chat message
    });
    setInput(""); // Clear the input after action, or leave it as needed
  };

  const oneRowInput = true;

  return (
    <div className="flex flex-col h-full">
      <div
        className={`${
          oneRowInput && "flex"
        } w-full rounded-md border border-input bg-transparent px-3 py-3 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm`}
      >
        <Input
          type="text"
          placeholder="Message the sous chef"
          className="border-none shadow-none outline-none bg-transparent p-0 focus-visible:outline-none focus-visible:ring-0"
          value={input} // Bind the input value to the state
          onChange={(e) => setInput(e.target.value)} // Update the state on change
          onKeyDown={handleKeyDown} // Trigger the action on Enter key press
        />
        {/* Actions */}
        <div>
          <button
            onClick={handleButtonClick} // Trigger the action on button click
            className="bg-blue-500 text-white p-2 rounded"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default PromptInput;
