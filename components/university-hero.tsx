"use client";

import { motion } from "framer-motion";
import { Play, Sparkles, Award, TrendingUp } from "lucide-react";

const stats = [
  { icon: Play, label: "Courses Completed", value: "3" },
  { icon: Sparkles, label: "AI Lessons", value: "24" },
  { icon: Award, label: "Certifications", value: "1" },
  { icon: TrendingUp, label: "Hours Learned", value: "12.5" },
];

export default function UniversityHero() {
  return (
    <motion.div
      className="bg-card border border-border rounded-xl p-6"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-secondary text-primary rounded-full px-3 py-1 text-[12px] font-medium inline-flex items-center gap-1">
              <Sparkles className="size-3" />
              AI-Powered Learning
            </span>
          </div>
          <h2 className="font-headings font-semibold text-foreground text-[24px] -tracking-[0.5px] mb-2">
            Level up your sales game
          </h2>
          <p className="text-muted-foreground text-[14px] max-w-[480px] leading-[1.6]">
            Master prospecting, AI outreach and sales intelligence with
            interactive courses, video lessons and hands-on exercises.
          </p>
        </div>
        <div className="flex items-center gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="text-center"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.08, duration: 0.3 }}
            >
              <div className="flex items-center justify-center bg-muted rounded-md size-8 mx-auto mb-1.5">
                <stat.icon className="size-4 text-primary" />
              </div>
              <div className="text-foreground font-semibold text-[18px]">
                {stat.value}
              </div>
              <div className="text-muted-foreground text-[11px]">
                {stat.label}
              </div>
              </motion.div>
            ))}
          </div>
        </div>
        <div className="mt-5 pt-5 border-t border-border">
          <motion.div
            className="flex items-center gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.3 }}
          >
          <div className="flex-1">
            <div className="flex items-center justify-between text-[12px] mb-1.5">
              <span className="text-foreground font-medium">
                Overall Progress
              </span>
              <span className="text-muted-foreground">3 of 9 courses</span>
            </div>
            <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full"
                style={{ width: "33%" }}
              />
            </div>
          </div>
          <button className="flex items-center gap-2 bg-primary text-primary-foreground rounded-md px-4 py-2 text-[13px] font-medium flex-shrink-0">
            <Play className="size-3.5" />
            Continue Learning
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
}
