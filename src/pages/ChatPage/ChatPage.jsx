import { useEffect, useRef } from "react";
import { useChatController } from "../../features/chat/useChatController.js";
import ChatMessage from "../../components/chat/ChatMessage/ChatMessage.jsx";
import ChatInput from "../../components/chat/ChatInput/ChatInput.jsx";

export default function ChatPage() {
  const { messages, isLoading, canSend, sendUserMessage } = useChatController();
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="chatPage">
      <div className="chatMessages">
        {messages.map((m) => (
          <ChatMessage key={m.id} message={m} />
        ))}
        {isLoading && (
          // optional: if your controller already adds a "thinking…" message, you can remove this
          null
        )}
        <div ref={endRef} />
      </div>

      <ChatInput
        disabled={!canSend}
        isLoading={isLoading}
        onSend={sendUserMessage}
      />
    </div>
  );
}