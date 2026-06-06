"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react";
import { useState } from "react";

const schema = Yup.object({
  name: Yup.string().required("Full name is required").min(2, "Name is too short"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Work email is required")
    .matches(/@/, "Please use your work email"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters"),
});

interface Step1Data {
  name: string;
  email: string;
  password: string;
}

interface AuthStep1Props {
  data: Step1Data;
  onUpdate: (data: Partial<Step1Data>) => void;
  onNext: () => void;
}

export default function AuthStep1({ data, onUpdate, onNext }: AuthStep1Props) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="bg-card border border-border rounded-xl p-8 shadow-[0_1px_4px_rgba(0,0,0,0.04)]">
      <h2 className="font-headings font-semibold text-foreground text-[22px] -tracking-[0.3px] mb-1">
        Create your account
      </h2>
      <p className="text-muted-foreground text-[14px] mb-6">
        Start your RubyFlow journey in seconds.
      </p>

      <div className="flex flex-col gap-3 mb-5">
        <button className="flex items-center justify-center gap-2 bg-background border border-border rounded-lg px-4 py-2.5 text-[14px] text-foreground font-medium hover:bg-muted transition-colors">
          <svg className="size-5" viewBox="0 0 24 24">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
          Continue with Google
        </button>
        <button className="flex items-center justify-center gap-2 bg-background border border-border rounded-lg px-4 py-2.5 text-[14px] text-foreground font-medium hover:bg-muted transition-colors">
          <svg className="size-5" viewBox="0 0 24 24" fill="#0A66C2">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
          Continue with LinkedIn
        </button>
      </div>

      <div className="flex items-center gap-3 mb-5">
        <div className="flex-1 h-px bg-border" />
        <span className="text-muted-foreground text-[12px]">or</span>
        <div className="flex-1 h-px bg-border" />
      </div>

      <Formik
        initialValues={{ name: data.name, email: data.email, password: data.password }}
        validationSchema={schema}
        onSubmit={(values) => {
          onUpdate(values);
          onNext();
        }}
      >
        {({ isSubmitting }) => (
          <Form className="flex flex-col gap-4">
            <div>
              <label className="text-foreground text-[13px] font-medium mb-1.5 block">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <Field
                  name="name"
                  type="text"
                  placeholder="John Doe"
                  className="w-full bg-input border border-border rounded-lg pl-10 pr-4 py-2.5 text-[14px] text-foreground placeholder:text-muted-foreground outline-none focus:border-primary transition-colors"
                />
              </div>
              <ErrorMessage
                name="name"
                component="p"
                className="text-red-500 text-[11px] mt-1"
              />
            </div>

            <div>
              <label className="text-foreground text-[13px] font-medium mb-1.5 block">
                Work Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <Field
                  name="email"
                  type="email"
                  placeholder="john@company.com"
                  className="w-full bg-input border border-border rounded-lg pl-10 pr-4 py-2.5 text-[14px] text-foreground placeholder:text-muted-foreground outline-none focus:border-primary transition-colors"
                />
              </div>
              <ErrorMessage
                name="email"
                component="p"
                className="text-red-500 text-[11px] mt-1"
              />
            </div>

            <div>
              <label className="text-foreground text-[13px] font-medium mb-1.5 block">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <Field
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Min. 8 characters"
                  className="w-full bg-input border border-border rounded-lg pl-10 pr-10 py-2.5 text-[14px] text-foreground placeholder:text-muted-foreground outline-none focus:border-primary transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? (
                    <EyeOff className="size-4" />
                  ) : (
                    <Eye className="size-4" />
                  )}
                </button>
              </div>
              <ErrorMessage
                name="password"
                component="p"
                className="text-red-500 text-[11px] mt-1"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary text-primary-foreground rounded-lg py-2.5 text-[14px] font-medium hover:opacity-90 transition-opacity disabled:opacity-50 mt-1"
            >
              Continue
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
