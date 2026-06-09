"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";
import AuthStep1 from "@/components/auth-step-1";
import AuthStep2 from "@/components/auth-step-2";
import AuthStep3 from "@/components/auth-step-3";
import AuthSuccess from "@/components/auth-success";
import AuthLogin from "@/components/auth-login";
import AuthProgress from "@/components/auth-progress";

const stepsWithOrg = ["Create Account", "Organization", "Personalize"];
const stepsNoOrg = ["Create Account", "Personalize"];

function parseTeamSize(val: string): number | undefined {
  if (val === "1000+") return 1000;
  const match = val.match(/(\d+)/);
  return match ? parseInt(match[1], 10) : undefined;
}

export default function AuthPage() {
  const router = useRouter();
  const { register, isAuthenticated, error, clearError, isLoading } = useAuth();
  const [mode, setMode] = useState<"login" | "register">("register");
  const [currentStep, setCurrentStep] = useState(0);
  const [hasCompany, setHasCompany] = useState(false);
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

  const displaySteps = hasCompany ? stepsWithOrg : stepsNoOrg;
  const displayStepIndex = hasCompany ? currentStep : currentStep === 0 ? 0 : 1;

  const handleRegister = async () => {
    try {
      const orgData = hasCompany
        ? {
            organizationName: formData.organization,
            websiteURL: formData.website || "",
            industry: formData.industry || "",
            teamSize: formData.teamSize ? parseTeamSize(formData.teamSize) : 0,
          }
        : undefined;
      await register(formData.email, formData.password, hasCompany, orgData);
      setCurrentStep(3);
    } catch {
      // error is set in auth context
    }
  };

  const nextStep = () => {
    clearError();
    if (currentStep === 0) {
      if (!hasCompany) {
        handleRegister();
      } else {
        setCurrentStep(1);
      }
    } else if (currentStep === 1 && hasCompany) {
      setCurrentStep(2);
    } else if (currentStep === 2) {
      handleRegister();
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      router.replace("/dashboard");
    }
  }, [isAuthenticated, router]);

  if (isAuthenticated) {
    return null;
  }

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
        {mode === "register" && currentStep < 3 && (
          <AuthProgress steps={displaySteps} current={displayStepIndex} />
        )}
      </div>

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 bg-red-50 border border-red-200 rounded-xl p-4 text-center"
        >
          <p className="text-red-600 text-[13px] mb-2">{error}</p>
          <button
            onClick={clearError}
            className="text-[12px] text-red-700 underline"
          >
            Dismiss
          </button>
        </motion.div>
      )}

      <AnimatePresence mode="wait">
        {mode === "login" && (
          <motion.div
            key="login"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25 }}
          >
            <AuthLogin onSwitchToRegister={() => setMode("register")} />
          </motion.div>
        )}

        {mode === "register" && currentStep === 0 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25 }}
          >
            <AuthStep1
              data={formData}
              onUpdate={updateData}
              onNext={nextStep}
              hasCompany={hasCompany}
              onToggleCompany={setHasCompany}
              isLoading={isLoading}
              onSwitchToLogin={() => setMode("login")}
            />
          </motion.div>
        )}

        {mode === "register" && currentStep === 1 && hasCompany && (
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

        {mode === "register" && currentStep === 2 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25 }}
          >
            <AuthStep3
              data={formData}
              onUpdate={updateData}
              onNext={nextStep}
              isLoading={isLoading}
            />
          </motion.div>
        )}

        {mode === "register" && currentStep === 3 && (
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

      {mode === "register" && currentStep < 3 && (
        <p className="text-center text-muted-foreground text-[12px] mt-6">
          By continuing, you agree to our{" "}
          <button className="text-foreground underline">Terms</button> and{" "}
          <button className="text-foreground underline">Privacy Policy</button>
        </p>
      )}
    </div>
  );
}
