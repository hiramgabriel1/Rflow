"use client";

import { motion } from "framer-motion";
import { Paperclip, AtSign, SlidersHorizontal, Send } from "lucide-react";

export default function ChatInput() {
  return (
    <motion.div
      className="bg-background border border-border rounded-xl px-4 py-3"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.3 }}
    >
      <textarea
        className="w-full resize-none bg-transparent text-[13px] text-foreground placeholder:text-muted-foreground outline-none min-h-[24px] max-h-[120px]"
        placeholder="Ask me to find prospects, analyze competitors, generate outreach..."
        rows={1}
      />
      <div className="flex items-center justify-between mt-2 pt-2 border-t border-border">
        <div className="flex items-center gap-1">
          <button className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground text-[12px] px-2 py-1 rounded-md">
            <Paperclip className="size-3.5" />
            Attach
          </button>
          <button className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground text-[12px] px-2 py-1 rounded-md">
            <AtSign className="size-3.5" />
            Mention
          </button>
          <button className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground text-[12px] px-2 py-1 rounded-md">
            <SlidersHorizontal className="size-3.5" />
            Filters
          </button>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-muted-foreground text-[11px]">
            2,450 credits remaining
          </span>
          <button className="flex items-center gap-1.5 bg-primary text-primary-foreground rounded-md px-4 py-1.5 text-[12px] font-medium">
            <Send className="size-3" />
            Send
          </button>
        </div>
      </div>
    </motion.div>
  );
}
