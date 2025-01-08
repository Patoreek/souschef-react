import { useRef, useEffect } from "react";

const Chatbox = ({ chatHistory }: { chatHistory: any[] }) => {
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll to the bottom when chatHistory updates
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory]); // This hook runs whenever chatHistory changes

  return (
    <div className="">
      <div>
        <h1 className="text-2xl font-bold">Sous Chef</h1>
      </div>
      <div
        ref={chatContainerRef}
        className="h-[calc(100vh-122px)] overflow-y-auto scroll-smooth"
      >
        {chatHistory.map((chat, index) => (
          <div
            key={index}
            className={`flex gap-2 ${
              chat.role === "user"
                ? "justify-start flex-row-reverse"
                : "justify-start flex-row py-2"
            } mb-2`}
          >
            {/* Profile Image */}
            <div
              className={`bg-purple-500 flex flex-shrink-0 items-center justify-center w-8 h-8 rounded-full overflow-hidden`}
            >
              <img
                src={
                  chat.role === "user"
                    ? "src/assets/profile-picture-placeholder-male.png"
                    : "src/assets/sous-chef-icon.png"
                } // Use the image paths accordingly
                alt={chat.role === "user" ? "User" : "Assistant"}
                className="w-8 h-8 object-cover"
              />
            </div>

            {/* Chat Bubble */}
            <div
              className={`px-4 py-2 rounded-xl whitespace-pre-wrap ${
                chat.role === "user"
                  ? "max-w-sm bg-blue-500 text-white"
                  : "max-w-full pt-0 text-black"
              }`}
            >
              <p className="text-sm">{chat.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Chatbox;
