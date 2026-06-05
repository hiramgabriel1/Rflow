"use client";

import { motion } from "framer-motion";
import { Mail, Sparkles, CheckCircle2, Eye, MessageSquare } from "lucide-react";

const steps = [
  {
    id: 1,
    title: "Initial Outreach",
    description: "Personalized intro based on company research",
    delay: "Day 0",
    aiGenerated: true,
    sent: 2847,
    openRate: 42,
    replyRate: 12,
  },
  {
    id: 2,
    title: "Value Proposition",
    description: "Highlight key differentiators and ROI",
    delay: "Day 3",
    aiGenerated: true,
    sent: 1820,
    openRate: 38,
    replyRate: 8,
  },
  {
    id: 3,
    title: "Social Proof",
    description: "Case studies and testimonials from similar companies",
    delay: "Day 7",
    aiGenerated: true,
    sent: 1240,
    openRate: 35,
    replyRate: 14,
  },
];

interface SequenceFlowProps {
  campaign: {
    name: string;
    sent: number;
    openRate: number;
    replyRate: number;
    clickRate: number;
  };
}

export default function SequenceFlow({ campaign }: SequenceFlowProps) {
  return (
    <motion.div
      className="bg-card border border-border rounded-lg p-6"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex items-center gap-4 mb-6">
        <div className="flex items-center gap-2">
          <Mail className="size-4 text-primary" />
          <span className="text-foreground font-medium text-[14px]">
            {campaign.name}
          </span>
        </div>
        <span className="text-muted-foreground text-[12px]">
          {steps.length} steps · Auto-send enabled
        </span>
      </div>
      <div className="relative">
        {steps.map((step, i) => (
          <motion.div
            key={step.id}
            className="flex gap-4"
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 + i * 0.1, duration: 0.3 }}
          >
            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center bg-primary rounded-full size-8 flex-shrink-0">
                <span className="text-primary-foreground text-[12px] font-bold">
                  {step.id}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div className="w-px h-12 bg-border mt-1" />
              )}
            </div>
            <div className="flex-1 pb-6">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-foreground font-medium text-[14px]">
                      {step.title}
                    </span>
                    {step.aiGenerated && (
                      <span className="flex items-center gap-1 bg-secondary text-primary text-[10px] font-medium rounded-full px-2 py-0.5">
                        <Sparkles className="size-2.5" />
                        AI
                      </span>
                    )}
                  </div>
                  <p className="text-muted-foreground text-[12px] mt-0.5">
                    {step.description}
                  </p>
                </div>
                <span className="text-muted-foreground text-[11px] bg-muted rounded-md px-2 py-1">
                  {step.delay}
                </span>
              </div>
              <div className="flex items-center gap-6 mt-3">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5">
                    <Mail className="size-3 text-muted-foreground" />
                    <span className="text-[12px] text-foreground">
                      {step.sent.toLocaleString()} sent
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Eye className="size-3 text-muted-foreground" />
                    <span className="text-[12px] text-foreground">
                      {step.openRate}% open
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MessageSquare className="size-3 text-muted-foreground" />
                    <span className="text-[12px] text-foreground">
                      {step.replyRate}% reply
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
        <motion.div
          className="flex gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.3 }}
        >
          <div className="flex flex-col items-center">
            <div className="flex items-center justify-center bg-muted rounded-full size-8 flex-shrink-0">
              <CheckCircle2 className="size-4 text-muted-foreground" />
            </div>
          </div>
          <div className="flex-1 flex items-center">
            <span className="text-muted-foreground text-[13px]">
              End of sequence
            </span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
