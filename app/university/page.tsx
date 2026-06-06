"use client";

import { motion } from "framer-motion";
import {
  Search,
  ChevronDown,
  Award,
  BookOpen,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import UniversityHero from "@/components/university-hero";
import CourseCard from "@/components/course-card";
import LearningPath from "@/components/learning-path";

const featuredCourses = [
  {
    id: 1,
    title: "AI-Powered Prospecting Masterclass",
    description: "Learn to use AI for targeted lead discovery and qualification at scale.",
    category: "Prospecting",
    lessons: 12,
    duration: "3h 45m",
    level: "Intermediate",
    progress: 65,
    completed: false,
    featured: true,
    icon: Target,
    iconBg: "bg-secondary",
    iconColor: "text-primary",
  },
  {
    id: 2,
    title: "Outreach Sequence Design",
    description: "Build high-converting email sequences with AI-generated personalization.",
    category: "Outreach",
    lessons: 8,
    duration: "2h 20m",
    level: "Beginner",
    progress: 100,
    completed: true,
    featured: true,
    icon: Sparkles,
    iconBg: "bg-info-soft",
    iconColor: "text-info",
  },
  {
    id: 3,
    title: "Competitor Intelligence Deep Dive",
    description: "Master competitive analysis and market positioning strategies.",
    category: "Intelligence",
    lessons: 10,
    duration: "4h 10m",
    level: "Advanced",
    progress: 30,
    completed: false,
    featured: true,
    icon: TrendingUp,
    iconBg: "bg-success-soft",
    iconColor: "text-success",
  },
];

const allCourses = [
  {
    id: 4,
    title: "Onboarding: RubyFlow Essentials",
    description: "Get started with RubyFlow's core features and workflows.",
    category: "Onboarding",
    lessons: 6,
    duration: "1h 30m",
    level: "Beginner",
    progress: 0,
    completed: false,
    featured: false,
    icon: BookOpen,
    iconBg: "bg-secondary",
    iconColor: "text-primary",
  },
  {
    id: 5,
    title: "AI Outreach Training",
    description: "Generate personalized outreach that converts at scale.",
    category: "Outreach",
    lessons: 9,
    duration: "2h 50m",
    level: "Intermediate",
    progress: 0,
    completed: false,
    featured: false,
    icon: Sparkles,
    iconBg: "bg-info-soft",
    iconColor: "text-info",
  },
  {
    id: 6,
    title: "Sales Playbooks: Enterprise",
    description: "Proven frameworks for closing enterprise deals.",
    category: "Sales",
    lessons: 14,
    duration: "5h 15m",
    level: "Advanced",
    progress: 0,
    completed: false,
    featured: false,
    icon: Users,
    iconBg: "bg-warning-soft",
    iconColor: "text-warning",
  },
  {
    id: 7,
    title: "Data Enrichment Strategies",
    description: "Maximize lead data quality and coverage.",
    category: "Data",
    lessons: 7,
    duration: "2h 05m",
    level: "Intermediate",
    progress: 0,
    completed: false,
    featured: false,
    icon: Target,
    iconBg: "bg-success-soft",
    iconColor: "text-success",
  },
  {
    id: 8,
    title: "Campaign Optimization",
    description: "A/B test and optimize your outreach campaigns.",
    category: "Campaigns",
    lessons: 8,
    duration: "2h 30m",
    level: "Intermediate",
    progress: 0,
    completed: false,
    featured: false,
    icon: TrendingUp,
    iconBg: "bg-secondary",
    iconColor: "text-primary",
  },
  {
    id: 9,
    title: "LinkedIn Prospecting Tactics",
    description: "Find and engage prospects on LinkedIn effectively.",
    category: "Prospecting",
    lessons: 6,
    duration: "1h 45m",
    level: "Beginner",
    progress: 0,
    completed: false,
    featured: false,
    icon: Users,
    iconBg: "bg-info-soft",
    iconColor: "text-info",
  },
];

const certifications = [
  {
    id: 1,
    title: "RubyFlow Certified Prospector",
    description: "Master lead discovery and qualification",
    courses: 4,
    earned: false,
  },
  {
    id: 2,
    title: "AI Outreach Specialist",
    description: "Expert in AI-powered outreach automation",
    courses: 3,
    earned: true,
  },
  {
    id: 3,
    title: "Enterprise Sales Pro",
    description: "Advanced enterprise selling techniques",
    courses: 5,
    earned: false,
  },
];

const learningPaths = [
  {
    title: "Getting Started",
    description: "Your first steps with RubyFlow",
    courses: ["Onboarding: RubyFlow Essentials", "AI-Powered Prospecting Masterclass"],
    icon: BookOpen,
  },
  {
    title: "Prospecting Mastery",
    description: "From lead discovery to qualification",
    courses: ["AI-Powered Prospecting Masterclass", "LinkedIn Prospecting Tactics", "Data Enrichment Strategies"],
    icon: Target,
  },
  {
    title: "Outreach Excellence",
    description: "Build campaigns that convert",
    courses: ["Outreach Sequence Design", "AI Outreach Training", "Campaign Optimization"],
    icon: Sparkles,
  },
];

export default function UniversityPage() {
  return (
    <>
      <div className="flex items-center justify-between px-8 py-4 border-b border-border bg-background">
        <div>
          <h1 className="font-headings font-semibold text-foreground text-[20px]">
            RubyFlow University
          </h1>
          <p className="text-muted-foreground text-[13px] mt-0.5">
            Master prospecting, outreach and sales intelligence.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 bg-input rounded-md px-3 py-2 border border-border w-[240px]">
            <Search className="size-3.5 text-muted-foreground flex-shrink-0" />
            <span className="text-muted-foreground text-[13px]">Search courses...</span>
          </div>
        </div>
      </div>
      <div className="flex-1 min-w-0 px-4 py-4 lg:px-8 lg:py-6 overflow-y-auto">
        <UniversityHero />

        <motion.div
          className="mt-8 mb-6"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-headings font-semibold text-foreground text-[16px]">
              Featured Courses
            </h2>
            <button className="flex items-center gap-1 text-primary text-[13px] font-medium">
              View all
              <ArrowRight className="size-3.5" />
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {featuredCourses.map((course) => (
              <CourseCard key={course.id} {...course} />
            ))}
          </div>
        </motion.div>

        <motion.div
          className="mt-8 mb-6"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-headings font-semibold text-foreground text-[16px]">
              Learning Paths
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {learningPaths.map((path) => (
              <LearningPath key={path.title} {...path} />
            ))}
          </div>
        </motion.div>

        <motion.div
          className="mt-8 mb-6"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.4 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-headings font-semibold text-foreground text-[16px]">
              All Courses
            </h2>
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-1.5 bg-background border border-border rounded-md px-3 py-1.5 text-[12px] text-foreground">
                Category
                <ChevronDown className="size-3 text-muted-foreground" />
              </button>
              <button className="flex items-center gap-1.5 bg-background border border-border rounded-md px-3 py-1.5 text-[12px] text-foreground">
                Level
                <ChevronDown className="size-3 text-muted-foreground" />
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {allCourses.map((course) => (
              <CourseCard key={course.id} {...course} />
            ))}
          </div>
        </motion.div>

        <motion.div
          className="mt-8 mb-6"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.4 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-headings font-semibold text-foreground text-[16px]">
              Certifications
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {certifications.map((cert) => (
              <div
                key={cert.id}
                className={`bg-card border rounded-lg p-5 ${
                  cert.earned ? "border-primary" : "border-border"
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center justify-center bg-secondary rounded-md size-10">
                    <Award className="size-5 text-primary" />
                  </div>
                  {cert.earned && (
                    <span className="flex items-center gap-1 bg-success-soft text-success text-[11px] font-medium rounded-full px-2 py-0.5">
                      <CheckCircle2 className="size-3" />
                      Earned
                    </span>
                  )}
                </div>
                <h3 className="text-foreground font-medium text-[14px] mb-1">
                  {cert.title}
                </h3>
                <p className="text-muted-foreground text-[12px] mb-3">
                  {cert.description}
                </p>
                <div className="flex items-center gap-1.5 text-muted-foreground text-[12px]">
                  <BookOpen className="size-3" />
                  {cert.courses} courses required
                </div>
                {!cert.earned && (
                  <button className="w-full mt-3 bg-primary text-primary-foreground rounded-md px-3 py-2 text-[12px] font-medium">
                    Start Path
                  </button>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </>
  );
}
