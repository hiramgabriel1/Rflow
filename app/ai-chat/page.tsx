"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Sparkles, Plus, Trash2 } from "lucide-react";
import { api, type ChatMessage, type Conversation } from "@/lib/api";
import ChatMessageComponent from "@/components/chat-message";

function ChatInput({
  onSend,
  isLoading,
}: {
  onSend: (message: string) => void;
  isLoading: boolean;
}) {
  const [value, setValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = () => {
    const trimmed = value.trim();
    if (!trimmed || isLoading) return;
    onSend(trimmed);
    setValue("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleInput = () => {
    const el = textareaRef.current;
    if (el) {
      el.style.height = "auto";
      el.style.height = Math.min(el.scrollHeight, 120) + "px";
    }
  };

  return (
    <div className="bg-background border border-border rounded-xl px-4 py-3">
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        onInput={handleInput}
        className="w-full resize-none bg-transparent text-[13px] text-foreground placeholder:text-muted-foreground outline-none min-h-[24px] max-h-[120px]"
        placeholder="Ask me to find prospects, analyze competitors, generate outreach..."
        rows={1}
      />
      <div className="flex items-center justify-between mt-2 pt-2 border-t border-border">
        <div className="flex items-center gap-1" />
        <div className="flex items-center gap-3">
          <button
            onClick={handleSubmit}
            disabled={isLoading || !value.trim()}
            className="flex items-center gap-1.5 bg-primary text-primary-foreground rounded-md px-4 py-1.5 text-[12px] font-medium disabled:opacity-50"
          >
            {isLoading ? "Thinking..." : "Send"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AIChatPage() {
  const router = useRouter();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadConversation();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const loadConversation = async () => {
    setIsInitialLoading(true);
    try {
      const conv = await api.listConversations();
      setMessages(conv.messages ?? []);
    } catch (e: unknown) {
      if (e instanceof Error && e.message.includes("Token")) {
        router.push("/auth");
      }
    } finally {
      setIsInitialLoading(false);
    }
  };

  const handleClearChat = useCallback(async () => {
    try {
      await api.clearConversations();
      setMessages([]);
    } catch {
      // ignore
    }
  }, []);

  const handleSend = useCallback(async (content: string) => {
    const userMsg: ChatMessage = { role: "user", content };
    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    try {
      const result = await api.sendMessage(content);
      setMessages(result.messages ?? []);
    } catch {
      // ignore
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <>
      <div className="flex items-center justify-between px-8 py-4 border-b border-border bg-background">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center bg-primary rounded-md size-7">
            <Sparkles className="size-3 text-primary-foreground" />
          </div>
          <div>
            <span className="text-foreground font-headings font-semibold text-[14px]">
              AI Chat
            </span>
            <div className="flex items-center gap-1.5">
              <span className="size-1.5 rounded-full bg-success" />
              <span className="text-muted-foreground text-[11px]">
                Online · RubyFlow Intelligence v2
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {messages.length > 0 && (
            <button
              onClick={handleClearChat}
              className="flex items-center gap-1.5 bg-background border border-border rounded-md px-3 py-1.5 text-[12px] text-muted-foreground hover:text-foreground transition-colors"
            >
              <Trash2 className="size-3" />
              Clear Chat
            </button>
          )}
        </div>
      </div>
      <div className="flex flex-1 min-w-0">
        <div className="flex-1 min-w-0 flex flex-col">
          <div className="flex-1 overflow-y-auto px-4 py-4 lg:px-8 lg:py-6">
            <div className="max-w-[720px] mx-auto flex flex-col gap-6">
              {isInitialLoading ? (
                <div className="flex items-center justify-center py-12">
                  <span className="text-muted-foreground text-[13px]">Loading conversation...</span>
                </div>
              ) : messages.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                  <div className="flex items-center justify-center bg-primary/10 rounded-2xl size-14 mb-4">
                    <Sparkles className="size-6 text-primary" />
                  </div>
                  <h2 className="text-[18px] font-semibold text-foreground mb-2">
                    How can I help you today?
                  </h2>
                  <p className="text-[14px] text-muted-foreground max-w-sm">
                    Ask me to find prospects, analyze competitors, generate outreach campaigns, or research markets.
                  </p>
                </div>
              ) : (
                messages.map((msg, i) => (
                  <ChatMessageComponent
                    key={i}
                    role={msg.role === "user" ? "user" : "ai"}
                    content={msg.content}
                    name={msg.role === "assistant" ? "RubyFlow AI" : undefined}
                  />
                ))
              )}
              {isLoading && <ChatMessageComponent role="ai" name="RubyFlow AI" typing />}
              <div ref={messagesEndRef} />
            </div>
          </div>
          <div className="px-4 pb-4 lg:px-8 lg:pb-6">
            <div className="max-w-[720px] mx-auto">
              <ChatInput onSend={handleSend} isLoading={isLoading} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
