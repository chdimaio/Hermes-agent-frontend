import WordCard from "../WordCard/WordCard.jsx";

export default function ChatMessage({ message }) {
  if (message.role === "user") {
    return <div className="chatBubble chatBubble--user">{message.text}</div>;
  }

  // bot
  if (message.kind === "text") {
    return <div className="chatBubble chatBubble--bot">{message.text}</div>;
  }

  if (message.kind === "wordCard") {
    return (
      <div className="chatBubble chatBubble--bot">
        <WordCard card={message.payload} />
      </div>
    );
  }

  return null;
}