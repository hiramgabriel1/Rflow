"use client";

import { motion, useInView } from "framer-motion";
import {
  Bot,
  Mail,
  Megaphone,
  Search,
  MessageSquare,
  Workflow,
  Users,
  Zap,
  Check,
  ChevronRight,
  ArrowRight,
  Play,
  Star,
  Building2,
  Target,
  TrendingUp,
  Clock,
  Menu,
  X,
} from "lucide-react";
import { useState, useRef } from "react";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.5 },
};

function AnimatedSection({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-border/50"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue to-blue-light flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-semibold tracking-tight">
              Ruby<span className="text-blue">Flow</span>
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <a
              href="#features"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              How it Works
            </a>
            <a
              href="#pricing"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Pricing
            </a>
            <a
              href="#contact"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Contact
            </a>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <button className="text-sm font-medium hover:text-blue transition-colors">
              Sign In
            </button>
            <button className="bg-soft-black text-white text-sm font-medium px-5 py-2.5 rounded-full hover:bg-soft-black/90 transition-all hover:shadow-lg">
              Start Free Trial
            </button>
          </div>

          <button
            className="md:hidden p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-white border-t border-border"
        >
          <div className="px-6 py-4 space-y-4">
            <a href="#features" className="block text-sm">
              Features
            </a>
            <a href="#how-it-works" className="block text-sm">
              How it Works
            </a>
            <a href="#pricing" className="block text-sm">
              Pricing
            </a>
            <a href="#contact" className="block text-sm">
              Contact
            </a>
            <div className="pt-4 border-t border-border space-y-3">
              <button className="block text-sm font-medium">Sign In</button>
              <button className="bg-blue text-white text-sm font-medium px-5 py-2.5 rounded-full w-full">
                Start Free Trial
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}

function HeroSection() {
  return (
    <section className="relative pt-32 pb-20 lg:pt-44 lg:pb-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-blue-soft/50 via-transparent to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-r from-blue/10 via-ruby-light/10 to-blue/10 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-4xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-blue-soft text-blue text-sm font-medium px-4 py-1.5 rounded-full mb-6"
          >
            <Zap className="w-4 h-4" />
            <span>Your AI-Powered Growth Engine</span>
          </motion.div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-semibold tracking-tight leading-[1.1] mb-6">
            Automate Sales, Marketing &{" "}
            <span className="bg-gradient-to-r from-blue to-blue-light bg-clip-text text-transparent">
              Customer Support
            </span>{" "}
            with AI
          </h1>

          <p className="text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            RubyFlow helps businesses capture leads, engage customers, automate
            marketing, answer messages, and close more sales from a single
            platform.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="w-full sm:w-auto bg-blue text-white font-medium px-8 py-3.5 rounded-full hover:bg-blue-dark transition-all hover:shadow-xl hover:shadow-blue/25 hover:-translate-y-0.5 flex items-center justify-center gap-2">
              Start Free Trial
              <ArrowRight className="w-4 h-4" />
            </button>
            <button className="w-full sm:w-auto bg-white text-foreground font-medium px-8 py-3.5 rounded-full border border-border hover:border-blue/30 hover:bg-blue-soft/30 transition-all flex items-center justify-center gap-2">
              <Play className="w-4 h-4" />
              Book a Demo
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mt-16 lg:mt-20 max-w-5xl mx-auto"
        >
          <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-black/10 border border-border/50 bg-white">
            <div className="bg-gradient-to-r from-soft-black to-soft-black/95 px-4 py-3 flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
              </div>
              <div className="flex-1 text-center">
                <div className="inline-block bg-white/10 rounded-md px-4 py-1 text-xs text-white/60">
                  app.rubyflow.ai/dashboard
                </div>
              </div>
            </div>

            <div className="p-6 lg:p-8 bg-gradient-to-b from-white to-gray-50/50">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {[
                  {
                    label: "AI Conversations",
                    value: "1,247",
                    change: "+12.5%",
                    icon: Bot,
                    color: "text-blue",
                    bg: "bg-blue-soft",
                  },
                  {
                    label: "Active Leads",
                    value: "856",
                    change: "+8.2%",
                    icon: Users,
                    color: "text-blue-600",
                    bg: "bg-blue-50",
                  },
                  {
                    label: "Campaigns",
                    value: "42",
                    change: "+24.1%",
                    icon: Megaphone,
                    color: "text-purple-600",
                    bg: "bg-purple-50",
                  },
                  {
                    label: "Revenue",
                    value: "$84.2K",
                    change: "+18.7%",
                    icon: TrendingUp,
                    color: "text-green-600",
                    bg: "bg-green-50",
                  },
                ].map((stat, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-xl p-4 border border-border/50"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className={`p-2 rounded-lg ${stat.bg}`}>
                        <stat.icon className={`w-4 h-4 ${stat.color}`} />
                      </div>
                      <span className="text-xs text-green-600 font-medium">
                        {stat.change}
                      </span>
                    </div>
                    <div className="text-xl lg:text-2xl font-semibold">
                      {stat.value}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="lg:col-span-2 bg-white rounded-xl p-4 border border-border/50">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-medium">Leads Pipeline</h3>
                    <span className="text-xs text-muted-foreground">
                      Last 30 days
                    </span>
                  </div>
                  <div className="flex items-end gap-2 h-32">
                    {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 88].map(
                      (h, i) => (
                        <div
                          key={i}
                          className="flex-1 bg-gradient-to-t from-blue/20 to-blue-light/40 rounded-t-sm"
                          style={{ height: `${h}%` }}
                        />
                      )
                    )}
                  </div>
                </div>

                <div className="bg-white rounded-xl p-4 border border-border/50">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-medium">Email Finder</h3>
                    <span className="text-xs text-green-600 font-medium">
                      +156 today
                    </span>
                  </div>
                  <div className="space-y-3">
                    {[
                      { name: "Sarah Chen", company: "TechCorp", status: "verified" },
                      { name: "Mike Ross", company: "SalesIO", status: "verified" },
                      { name: "Emma Wilson", company: "GrowthLab", status: "pending" },
                    ].map((lead, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between py-2 border-b border-border/30 last:border-0"
                      >
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue/20 to-blue-light/30 flex items-center justify-center text-xs font-medium">
                            {lead.name[0]}
                          </div>
                          <div>
                            <div className="text-xs font-medium">
                              {lead.name}
                            </div>
                            <div className="text-[10px] text-muted-foreground">
                              {lead.company}
                            </div>
                          </div>
                        </div>
                        <span
                          className={`text-[10px] px-2 py-0.5 rounded-full ${
                            lead.status === "verified"
                              ? "bg-green-50 text-green-600"
                              : "bg-yellow-50 text-yellow-600"
                          }`}
                        >
                          {lead.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function TrustedBySection() {
  const companies = [
    "TechCorp",
    "SalesIO",
    "GrowthLab",
    "DataFlow",
    "CloudSync",
    "Innovate",
  ];

  return (
    <AnimatedSection className="py-16 border-y border-border/50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <p className="text-center text-sm text-muted-foreground mb-8">
          Trusted by innovative companies worldwide
        </p>
        <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-16">
          {companies.map((company, i) => (
            <div
              key={i}
              className="text-xl lg:text-2xl font-semibold text-muted-foreground/40 hover:text-muted-foreground/60 transition-colors cursor-default"
            >
              {company}
            </div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}

function FeaturesSection() {
  const features = [
    {
      icon: Bot,
      title: "AI Sales Assistant",
      description:
        "Qualify leads automatically, follow up instantly, and schedule meetings without lifting a finger.",
      color: "text-blue",
      bg: "bg-blue-soft",
      gradient: "from-blue/10 to-blue-light/10",
    },
    {
      icon: Mail,
      title: "Email Finder",
      description:
        "Discover verified business emails, enrich contact data, and build targeted prospect lists at scale.",
      color: "text-blue-600",
      bg: "bg-blue-50",
      gradient: "from-blue-500/10 to-cyan-500/10",
    },
    {
      icon: Megaphone,
      title: "Marketing Automation",
      description:
        "Create email sequences, nurture leads automatically, and build sophisticated campaign workflows.",
      color: "text-purple-600",
      bg: "bg-purple-50",
      gradient: "from-purple-500/10 to-pink-500/10",
    },
    {
      icon: Search,
      title: "AI Research Agent",
      description:
        "Research companies, analyze prospects, and gather market intelligence with AI-powered insights.",
      color: "text-green-600",
      bg: "bg-green-50",
      gradient: "from-green-500/10 to-emerald-500/10",
    },
    {
      icon: MessageSquare,
      title: "Omnichannel Inbox",
      description:
        "Manage WhatsApp, Instagram, Facebook, TikTok, and Email conversations from one unified inbox.",
      color: "text-orange-600",
      bg: "bg-orange-50",
      gradient: "from-orange-500/10 to-amber-500/10",
    },
    {
      icon: Workflow,
      title: "CRM & Pipeline",
      description:
        "Track opportunities, manage customers, and forecast revenue with our intelligent CRM system.",
      color: "text-indigo-600",
      bg: "bg-indigo-50",
      gradient: "from-indigo-500/10 to-violet-500/10",
    },
  ];

  return (
    <section id="features" className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-sm font-medium text-blue mb-4 block">
            Features
          </span>
          <h2 className="text-3xl lg:text-5xl font-semibold tracking-tight mb-4">
            Everything you need to{" "}
            <span className="bg-gradient-to-r from-blue to-blue-light bg-clip-text text-transparent">
              grow faster
            </span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Powerful AI tools designed to automate your sales, marketing, and
            customer engagement workflows.
          </p>
        </AnimatedSection>

        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="group relative bg-white rounded-2xl p-6 lg:p-8 border border-border/50 hover:border-blue/20 hover:shadow-xl hover:shadow-blue/5 transition-all duration-300"
            >
              <div
                className={`w-12 h-12 rounded-xl ${feature.bg} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}
              >
                <feature.icon className={`w-5 h-5 ${feature.color}`} />
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
              <div
                className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10`}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function HowItWorksSection() {
  const steps = [
    {
      number: "01",
      title: "Find Prospects",
      description: "Discover your ideal customers with AI-powered search",
      icon: Search,
    },
    {
      number: "02",
      title: "Enrich Contact Data",
      description: "Get verified emails and complete contact profiles",
      icon: Mail,
    },
    {
      number: "03",
      title: "Launch Campaigns",
      description: "Create automated sequences that convert",
      icon: Megaphone,
    },
    {
      number: "04",
      title: "AI Engages Customers",
      description: "Let AI handle conversations and qualify leads",
      icon: Bot,
    },
    {
      number: "05",
      title: "Close More Deals",
      description: "Track pipeline and close with confidence",
      icon: TrendingUp,
    },
  ];

  return (
    <section id="how-it-works" className="py-24 lg:py-32 bg-muted/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-sm font-medium text-blue mb-4 block">
            How It Works
          </span>
          <h2 className="text-3xl lg:text-5xl font-semibold tracking-tight mb-4">
            From prospect to close in{" "}
            <span className="bg-gradient-to-r from-blue to-blue-light bg-clip-text text-transparent">
              5 simple steps
            </span>
          </h2>
        </AnimatedSection>

        <div className="relative">
          <div className="hidden lg:block absolute top-24 left-0 right-0 h-0.5 bg-gradient-to-r from-blue/20 via-ruby to-blue/20" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-4">
            {steps.map((step, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <div className="relative text-center lg:text-left">
                  <div className="relative z-10 w-12 h-12 rounded-full bg-blue text-white flex items-center justify-center text-sm font-semibold mx-auto lg:mx-0 mb-6 shadow-lg shadow-blue/25">
                    {step.number}
                  </div>
                  <div className="lg:mt-4">
                    <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function DashboardShowcase() {
  const tabs = [
    "Lead Management",
    "AI Chat Agents",
    "Campaign Builder",
    "Analytics",
    "Contact Enrichment",
  ];
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-sm font-medium text-blue mb-4 block">
            Product
          </span>
          <h2 className="text-3xl lg:text-5xl font-semibold tracking-tight mb-4">
            See RubyFlow in{" "}
            <span className="bg-gradient-to-r from-blue to-blue-light bg-clip-text text-transparent">
              action
            </span>
          </h2>
          <p className="text-lg text-muted-foreground">
            A powerful, intuitive platform designed for modern teams.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {tabs.map((tab, i) => (
              <button
                key={i}
                onClick={() => setActiveTab(i)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeTab === i
                    ? "bg-soft-black text-white"
                    : "bg-white text-muted-foreground hover:text-foreground border border-border"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-black/10 border border-border/50 bg-white">
            <div className="bg-gradient-to-r from-soft-black to-soft-black/95 px-4 py-3 flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
              </div>
              <div className="flex-1 text-center">
                <div className="inline-block bg-white/10 rounded-md px-4 py-1 text-xs text-white/60">
                  app.rubyflow.ai/{tabs[activeTab].toLowerCase().replace(/ /g, "-")}
                </div>
              </div>
            </div>

            <div className="p-6 lg:p-10 min-h-[400px] bg-gradient-to-b from-white to-gray-50/50 flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 rounded-2xl bg-blue-soft flex items-center justify-center mx-auto mb-4">
                  <Bot className="w-8 h-8 text-blue" />
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  {tabs[activeTab]}
                </h3>
                <p className="text-muted-foreground max-w-md">
                  Powerful {tabs[activeTab].toLowerCase()} interface with
                  real-time data, AI insights, and seamless automation
                  capabilities.
                </p>
                <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-2xl mx-auto">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="bg-white rounded-xl p-4 border border-border/50"
                    >
                      <div className="h-2 w-16 bg-muted rounded mb-2" />
                      <div className="h-2 w-12 bg-muted/50 rounded" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

function AIResearchSection() {
  return (
    <section className="py-24 lg:py-32 bg-gradient-to-b from-soft-black to-soft-black/95 text-white overflow-hidden relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue/20 via-transparent to-transparent" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <AnimatedSection>
            <span className="text-sm font-medium text-blue-light mb-4 block">
              AI Research Agent
            </span>
            <h2 className="text-3xl lg:text-5xl font-semibold tracking-tight mb-6">
              Your AI Research{" "}
              <span className="bg-gradient-to-r from-blue-light to-blue bg-clip-text text-transparent">
                Team
              </span>
            </h2>
            <p className="text-lg text-white/60 mb-8 leading-relaxed">
              Let AI do the heavy lifting. Our research agent finds company
              information, identifies decision makers, analyzes competitors, and
              creates actionable prospect summaries.
            </p>

            <div className="space-y-4">
              {[
                "Finds company information automatically",
                "Identifies key decision makers",
                "Analyzes competitors in real-time",
                "Creates detailed prospect summaries",
                "Suggests personalized outreach strategies",
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-blue/20 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-blue-light" />
                  </div>
                  <span className="text-white/80 text-sm">{item}</span>
                </div>
              ))}
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.3}>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue/20 to-blue-light/20 rounded-2xl blur-2xl" />
              <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-8 h-8 rounded-lg bg-blue/20 flex items-center justify-center">
                    <Search className="w-4 h-4 text-blue-light" />
                  </div>
                  <span className="text-sm font-medium">AI Research Query</span>
                </div>

                <div className="space-y-4">
                  <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                    <div className="flex items-center gap-2 mb-2">
                      <Building2 className="w-4 h-4 text-blue-light" />
                      <span className="text-sm font-medium">
                        TechCorp Inc.
                      </span>
                    </div>
                    <p className="text-xs text-white/50">
                      B2B SaaS company • 50-200 employees • Series B
                    </p>
                  </div>

                  <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                    <div className="flex items-center gap-2 mb-2">
                      <Target className="w-4 h-4 text-blue-light" />
                      <span className="text-sm font-medium">
                        Decision Makers
                      </span>
                    </div>
                    <div className="space-y-2">
                      {["Sarah Chen - CTO", "Mike Ross - VP Sales"].map(
                        (name, i) => (
                          <div
                            key={i}
                            className="flex items-center justify-between text-xs"
                          >
                            <span className="text-white/60">{name}</span>
                            <span className="text-green-400">Verified</span>
                          </div>
                        )
                      )}
                    </div>
                  </div>

                  <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="w-4 h-4 text-blue-light" />
                      <span className="text-sm font-medium">
                        Outreach Strategy
                      </span>
                    </div>
                    <p className="text-xs text-white/50">
                      Focus on ROI messaging. Highlight integration
                      capabilities. Schedule demo within 48 hours.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}

function MetricsSection() {
  const metrics = [
    {
      value: "5x",
      label: "Faster Prospecting",
      icon: Zap,
    },
    {
      value: "70%",
      label: "Less Manual Work",
      icon: Clock,
    },
    {
      value: "3x",
      label: "More Qualified Leads",
      icon: Target,
    },
    {
      value: "24/7",
      label: "AI Availability",
      icon: Bot,
    },
  ];

  return (
    <section className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-sm font-medium text-blue mb-4 block">
            Results
          </span>
          <h2 className="text-3xl lg:text-5xl font-semibold tracking-tight mb-4">
            Numbers that{" "}
            <span className="bg-gradient-to-r from-blue to-blue-light bg-clip-text text-transparent">
              speak
            </span>
          </h2>
        </AnimatedSection>

        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {metrics.map((metric, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              className="text-center p-6 lg:p-8 rounded-2xl bg-white border border-border/50 hover:border-blue/20 hover:shadow-xl hover:shadow-blue/5 transition-all"
            >
              <div className="w-12 h-12 rounded-xl bg-blue-soft flex items-center justify-center mx-auto mb-4">
                <metric.icon className="w-5 h-5 text-blue" />
              </div>
              <div className="text-3xl lg:text-4xl font-semibold text-blue mb-2">
                {metric.value}
              </div>
              <div className="text-sm text-muted-foreground">{metric.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Head of Sales, TechCorp",
      content:
        "RubyFlow transformed our sales process. We're closing 3x more deals with half the effort. The AI assistant is like having a top performer on the team 24/7.",
      avatar: "SC",
      rating: 5,
    },
    {
      name: "Marcus Johnson",
      role: "Marketing Director, GrowthLab",
      content:
        "The marketing automation features are incredible. We've reduced our campaign setup time by 70% while seeing better engagement rates than ever.",
      avatar: "MJ",
      rating: 5,
    },
    {
      name: "Emily Rodriguez",
      role: "Founder, SalesIO",
      content:
        "As a startup founder, RubyFlow gives us enterprise-level capabilities without the enterprise price tag. The AI research agent alone is worth the subscription.",
      avatar: "ER",
      rating: 5,
    },
  ];

  return (
    <section className="py-24 lg:py-32 bg-muted/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-sm font-medium text-blue mb-4 block">
            Testimonials
          </span>
          <h2 className="text-3xl lg:text-5xl font-semibold tracking-tight mb-4">
            Loved by{" "}
            <span className="bg-gradient-to-r from-blue to-blue-light bg-clip-text text-transparent">
              teams worldwide
            </span>
          </h2>
        </AnimatedSection>

        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              className="bg-white rounded-2xl p-6 lg:p-8 border border-border/50 hover:shadow-xl transition-all"
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, j) => (
                  <Star
                    key={j}
                    className="w-4 h-4 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                "{testimonial.content}"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue/20 to-blue-light/30 flex items-center justify-center text-sm font-medium">
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="text-sm font-semibold">
                    {testimonial.name}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function PricingSection() {
  const plans = [
    {
      name: "Starter",
      price: "$29",
      description: "Perfect for small teams getting started",
      features: [
        "1,000 AI conversations/month",
        "500 email finds/month",
        "Basic CRM",
        "Email support",
        "1 team member",
      ],
      cta: "Start Free Trial",
      highlighted: false,
    },
    {
      name: "Growth",
      price: "$79",
      description: "For growing businesses that need more power",
      features: [
        "10,000 AI conversations/month",
        "5,000 email finds/month",
        "Advanced CRM & Pipeline",
        "Marketing Automation",
        "AI Research Agent",
        "Priority support",
        "5 team members",
      ],
      cta: "Start Free Trial",
      highlighted: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "For large organizations with custom needs",
      features: [
        "Unlimited AI conversations",
        "Unlimited email finds",
        "Custom integrations",
        "Dedicated account manager",
        "SLA guarantee",
        "Custom AI training",
        "Unlimited team members",
      ],
      cta: "Contact Sales",
      highlighted: false,
    },
  ];

  return (
    <section id="pricing" className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-sm font-medium text-blue mb-4 block">
            Pricing
          </span>
          <h2 className="text-3xl lg:text-5xl font-semibold tracking-tight mb-4">
            Simple, transparent{" "}
            <span className="bg-gradient-to-r from-blue to-blue-light bg-clip-text text-transparent">
              pricing
            </span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Start free, scale as you grow. No hidden fees.
          </p>
        </AnimatedSection>

        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto"
        >
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              className={`relative rounded-2xl p-6 lg:p-8 ${
                plan.highlighted
                  ? "bg-soft-black text-white shadow-2xl shadow-blue/20 scale-105 border-2 border-blue"
                  : "bg-white border border-border/50"
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue text-white text-xs font-medium px-3 py-1 rounded-full">
                  Most Popular
                </div>
              )}
              <div className="mb-6">
                <h3
                  className={`text-lg font-semibold mb-1 ${
                    plan.highlighted ? "text-white" : ""
                  }`}
                >
                  {plan.name}
                </h3>
                <p
                  className={`text-sm ${
                    plan.highlighted ? "text-white/60" : "text-muted-foreground"
                  }`}
                >
                  {plan.description}
                </p>
              </div>
              <div className="mb-6">
                <span className="text-4xl font-semibold">{plan.price}</span>
                {plan.price !== "Custom" && (
                  <span
                    className={`text-sm ${
                      plan.highlighted ? "text-white/60" : "text-muted-foreground"
                    }`}
                  >
                    /month
                  </span>
                )}
              </div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, j) => (
                  <li key={j} className="flex items-center gap-2 text-sm">
                    <Check
                      className={`w-4 h-4 flex-shrink-0 ${
                        plan.highlighted ? "text-blue-light" : "text-blue"
                      }`}
                    />
                    <span
                      className={
                        plan.highlighted ? "text-white/80" : "text-muted-foreground"
                      }
                    >
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
              <button
                className={`w-full py-3 rounded-full font-medium text-sm transition-all hover:-translate-y-0.5 ${
                  plan.highlighted
                    ? "bg-blue text-white hover:bg-blue-dark hover:shadow-lg hover:shadow-blue/25"
                    : "bg-muted hover:bg-muted/80"
                }`}
              >
                {plan.cta}
              </button>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function FinalCTASection() {
  return (
    <section className="py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-blue-soft/50 to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-gradient-to-r from-blue/10 via-ruby-light/10 to-blue/10 rounded-full blur-3xl" />

      <div className="relative max-w-4xl mx-auto px-6 lg:px-8 text-center">
        <AnimatedSection>
          <h2 className="text-3xl lg:text-5xl font-semibold tracking-tight mb-4">
            Scale Your Business with{" "}
            <span className="bg-gradient-to-r from-blue to-blue-light bg-clip-text text-transparent">
              RubyFlow
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
            Everything you need to find leads, automate marketing, engage
            customers and grow revenue.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="w-full sm:w-auto bg-blue text-white font-medium px-8 py-3.5 rounded-full hover:bg-blue-dark transition-all hover:shadow-xl hover:shadow-blue/25 hover:-translate-y-0.5 flex items-center justify-center gap-2">
              Start Free Trial
              <ArrowRight className="w-4 h-4" />
            </button>
            <button className="w-full sm:w-auto bg-white text-foreground font-medium px-8 py-3.5 rounded-full border border-border hover:border-blue/30 hover:bg-blue-soft/30 transition-all flex items-center justify-center gap-2">
              Schedule Demo
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer id="contact" className="border-t border-border/50 py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue to-blue-light flex items-center justify-center">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-semibold tracking-tight">
                Ruby<span className="text-blue">Flow</span>
              </span>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Your AI-Powered Growth Engine. Automate sales, marketing, and
              customer support.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-4">Product</h4>
            <ul className="space-y-2">
              {["Features", "Pricing", "Documentation", "Blog"].map(
                (item, i) => (
                  <li key={i}>
                    <a
                      href="#"
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              {["About", "Careers", "Press", "Contact"].map((item, i) => (
                <li key={i}>
                  <a
                    href="#"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              {["Privacy", "Terms", "Security", "GDPR"].map((item, i) => (
                <li key={i}>
                  <a
                    href="#"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border/50 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © 2026 RubyFlow. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {["Twitter", "LinkedIn", "GitHub"].map((social, i) => (
              <a
                key={i}
                href="#"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {social}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <HeroSection />
      <TrustedBySection />
      <FeaturesSection />
      <HowItWorksSection />
      <DashboardShowcase />
      <AIResearchSection />
      <MetricsSection />
      <TestimonialsSection />
      <PricingSection />
      <FinalCTASection />
      <Footer />
    </div>
  );
}
