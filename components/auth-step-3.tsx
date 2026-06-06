"use client";

import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Check } from "lucide-react";

const sources = [
  "Google Search",
  "YouTube",
  "TikTok",
  "Instagram",
  "LinkedIn",
  "Friend or Colleague",
  "Other",
];

const goals = [
  "Find Leads",
  "Analyze Competitors",
  "Market Research",
  "Prospect Discovery",
  "Email Outreach",
  "Business Intelligence",
];

const platforms = [
  "Instagram",
  "LinkedIn",
  "TikTok",
  "Websites",
  "Google Search",
];

const schema = Yup.object({
  source: Yup.string().required("Please select a source"),
  goals: Yup.array().min(1, "Select at least one goal"),
  platforms: Yup.array().min(1, "Select at least one platform"),
});

interface Step3Data {
  source: string;
  goals: string[];
  platforms: string[];
}

interface AuthStep3Props {
  data: Step3Data;
  onUpdate: (data: Partial<Step3Data>) => void;
  onNext: () => void;
}

function ToggleGroup({
  options,
  value,
  onChange,
  multiple,
  error,
}: {
  options: string[];
  value: string | string[];
  onChange: (val: string) => void;
  multiple?: boolean;
  error?: string;
}) {
  const isSelected = (option: string) => {
    if (multiple) {
      return (value as string[]).includes(option);
    }
    return value === option;
  };

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => onChange(option)}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-[13px] border transition-all ${
              isSelected(option)
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-background text-foreground border-border hover:border-primary/50"
            }`}
          >
            {isSelected(option) && <Check className="size-3.5" />}
            {option}
          </button>
        ))}
      </div>
      {error && <p className="text-red-500 text-[11px] mt-1">{error}</p>}
    </div>
  );
}

export default function AuthStep3({ data, onUpdate, onNext }: AuthStep3Props) {
  return (
    <div className="bg-card border border-border rounded-xl p-8 shadow-[0_1px_4px_rgba(0,0,0,0.04)]">
      <h2 className="font-headings font-semibold text-foreground text-[22px] -tracking-[0.3px] mb-1">
        Help us personalize RubyFlow
      </h2>
      <p className="text-muted-foreground text-[14px] mb-6">
        Tell us a bit more so we can tailor your experience.
      </p>

      <Formik
        initialValues={{
          source: data.source || "",
          goals: data.goals || [],
          platforms: data.platforms || [],
        }}
        validationSchema={schema}
        onSubmit={(values) => {
          onUpdate(values);
          onNext();
        }}
      >
        {({ isSubmitting, values, setFieldValue, errors, touched }) => (
          <Form className="flex flex-col gap-6">
            <div>
              <label className="text-foreground text-[14px] font-medium mb-3 block">
                Where did you hear about RubyFlow?
              </label>
              <ToggleGroup
                options={sources}
                value={values.source}
                onChange={(val) => setFieldValue("source", val)}
                error={touched.source ? errors.source : undefined}
              />
            </div>

            <div>
              <label className="text-foreground text-[14px] font-medium mb-3 block">
                What do you want to accomplish?
              </label>
              <ToggleGroup
                options={goals}
                value={values.goals}
                onChange={(val) => {
                  const updated = values.goals.includes(val)
                    ? values.goals.filter((g: string) => g !== val)
                    : [...values.goals, val];
                  setFieldValue("goals", updated);
                }}
                multiple
                error={touched.goals ? (errors.goals as string) : undefined}
              />
            </div>

            <div>
              <label className="text-foreground text-[14px] font-medium mb-3 block">
                What platforms matter most to you?
              </label>
              <ToggleGroup
                options={platforms}
                value={values.platforms}
                onChange={(val) => {
                  const updated = values.platforms.includes(val)
                    ? values.platforms.filter((p: string) => p !== val)
                    : [...values.platforms, val];
                  setFieldValue("platforms", updated);
                }}
                multiple
                error={touched.platforms ? (errors.platforms as string) : undefined}
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary text-primary-foreground rounded-lg py-2.5 text-[14px] font-medium hover:opacity-90 transition-opacity disabled:opacity-50 mt-1"
            >
              Finish Setup
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
