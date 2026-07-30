import { useMemo, useState } from "react";
import { fetchWordCardForLemma } from "./chatApi";

export function useChatController() {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const canSend = useMemo(() => !isLoading, [isLoading]);

  async function sendUserMessage(text) {
    const trimmed = (text ?? "").trim();
    if (!trimmed || isLoading) return;

    const userMsg = {
      id: crypto.randomUUID(),
      role: "user",
      kind: "text",
      text: trimmed,
      createdAt: Date.now(),
    };

    const loadingId = crypto.randomUUID();
    const botLoadingMsg = {
      id: loadingId,
      role: "bot",
      kind: "text",
      text: "Hermes is thinking…",
      createdAt: Date.now(),
    };

    setMessages((prev) => [...prev, userMsg, botLoadingMsg]);
    setIsLoading(true);

    const result = await fetchWordCardForLemma(trimmed);

    setMessages((prev) =>
      prev
        .filter((m) => m.id !== loadingId)
        .concat(
          result.kind === "NOT_FOUND"
            ? {
                id: crypto.randomUUID(),
                role: "bot",
                kind: "text",
                text: `I couldn’t find “${trimmed}”.`,
                createdAt: Date.now(),
              }
            : result.kind === "ERROR"
              ? {
                  id: crypto.randomUUID(),
                  role: "bot",
                  kind: "text",
                  text: "Something went wrong. Try again.",
                  createdAt: Date.now(),
                }
              : {
                  id: crypto.randomUUID(),
                  role: "bot",
                  kind: "wordCard",
                  payload: result,
                  createdAt: Date.now(),
                }
        )
    );

    setIsLoading(false);
  }

  return { messages, isLoading, canSend, sendUserMessage };
}