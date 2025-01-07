import { Input } from "@/components/ui/input";

const PromptInput = ({
  input,
  setInput,
  setChatHistory,
}: {
  input: string;
  setInput: (value: string) => void;
  setChatHistory: (value: any) => void; // Using `any` for setChat
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

  // Function to execute the action (e.g., send input, trigger action, etc.)
  const executeAction = () => {
    console.log("Executing action with input:", input);
    const chatLog = {
      id: "msg-12345",
      role: "user",
      content: input,
      created_at: Date.now(),
      conversation_id: "conv-67890",
      user_id: "user-abc123",
      session_id: "session-def456",
      message_type: "text",
      // status: "pending",
    };
    // Update chat state with the new chat entry
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
