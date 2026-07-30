import { useState } from "react";

export default function ChatInput({ disabled, isLoading, onSend }) {
  const [text, setText] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed || disabled) return;

    onSend(trimmed);
    setText("");
  }

  return (
    <form className="chatInput" onSubmit={handleSubmit}>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Ask Hermes for a word…"
        disabled={disabled}
      />
      <button type="submit" disabled={disabled}>
        {isLoading ? "…" : "Send"}
      </button>
    </form>
  );
}