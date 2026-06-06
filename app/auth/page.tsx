"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AuthStep1 from "@/components/auth-step-1";
import AuthStep2 from "@/components/auth-step-2";
import AuthStep3 from "@/components/auth-step-3";
import AuthSuccess from "@/components/auth-success";
import AuthProgress from "@/components/auth-progress";

const steps = ["Create Account", "Organization", "Personalize"];

export default function AuthPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    organization: "",
    website: "",
    industry: "",
    teamSize: "",
    source: "",
    goals: [] as string[],
    platforms: [] as string[],
  });

  const updateData = (data: Partial<typeof formData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const nextStep = () => setCurrentStep((s) => s + 1);

  return (
    <div className="w-full max-w-[480px]">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-2 mb-3">
          <div className="flex items-center justify-center bg-primary rounded-md size-8">
            <span className="text-primary-foreground font-headings font-bold text-[14px]">
              R
            </span>
          </div>
          <span className="font-headings font-semibold text-foreground text-[18px]">
            RubyFlow
          </span>
        </div>
        {currentStep < 3 && (
          <AuthProgress steps={steps} current={currentStep} />
        )}
      </div>

      <AnimatePresence mode="wait">
        {currentStep === 0 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25 }}
          >
            <AuthStep1 data={formData} onUpdate={updateData} onNext={nextStep} />
          </motion.div>
        )}
        {currentStep === 1 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25 }}
          >
            <AuthStep2 data={formData} onUpdate={updateData} onNext={nextStep} />
          </motion.div>
        )}
        {currentStep === 2 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25 }}
          >
            <AuthStep3 data={formData} onUpdate={updateData} onNext={nextStep} />
          </motion.div>
        )}
        {currentStep === 3 && (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <AuthSuccess />
          </motion.div>
        )}
      </AnimatePresence>

      {currentStep < 3 && (
        <p className="text-center text-muted-foreground text-[12px] mt-6">
          By continuing, you agree to our{" "}
          <button className="text-foreground underline">Terms</button> and{" "}
          <button className="text-foreground underline">Privacy Policy</button>
        </p>
      )}
    </div>
  );
}
