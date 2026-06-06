"use client";

import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function AuthSuccess() {
  return (
    <div className="bg-card border border-border rounded-xl p-8 shadow-[0_1px_4px_rgba(0,0,0,0.04)] text-center">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
        className="flex items-center justify-center bg-success-soft rounded-full size-16 mx-auto mb-5"
      >
        <CheckCircle2 className="size-8 text-success" />
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="font-headings font-semibold text-foreground text-[22px] -tracking-[0.3px] mb-2"
      >
        Your RubyFlow workspace is ready
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="text-muted-foreground text-[14px] mb-6 max-w-[320px] mx-auto leading-[1.6]"
      >
        We are preparing your intelligence dashboard and recommendations.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground rounded-lg px-6 py-2.5 text-[14px] font-medium hover:opacity-90 transition-opacity"
        >
          Enter Dashboard
          <ArrowRight className="size-4" />
        </Link>
      </motion.div>
    </div>
  );
}
