"use client";

import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Check } from "lucide-react";
import { useState } from "react";

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

export default function AuthStep3({ data, onUpdate, onNext }: AuthStep3Props) {
  const [selectedSource, setSelectedSource] = useState(data.source || "");
  const [selectedGoals, setSelectedGoals] = useState<string[]>(data.goals || []);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(
    data.platforms || []
  );

  const toggleGoal = (goal: string) => {
    setSelectedGoals((prev) =>
      prev.includes(goal) ? prev.filter((g) => g !== goal) : [...prev, goal]
    );
  };

  const togglePlatform = (platform: string) => {
    setSelectedPlatforms((prev) =>
      prev.includes(platform)
        ? prev.filter((p) => p !== platform)
        : [...prev, platform]
    );
  };

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
          source: data.source,
          goals: data.goals,
          platforms: data.platforms,
        }}
        validationSchema={schema}
        onSubmit={() => {
          onUpdate({
            source: selectedSource,
            goals: selectedGoals,
            platforms: selectedPlatforms,
          });
          onNext();
        }}
      >
        {({ isSubmitting, errors, touched }) => (
          <Form className="flex flex-col gap-6">
            <div>
              <label className="text-foreground text-[14px] font-medium mb-3 block">
                Where did you hear about RubyFlow?
              </label>
              <div className="flex flex-wrap gap-2">
                {sources.map((source) => (
                  <button
                    key={source}
                    type="button"
                    onClick={() => setSelectedSource(source)}
                    className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-[13px] border transition-all ${
                      selectedSource === source
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-background text-foreground border-border hover:border-primary/50"
                    }`}
                  >
                    {selectedSource === source && <Check className="size-3.5" />}
                    {source}
                  </button>
                ))}
              </div>
              {touched.source && errors.source && (
                <p className="text-red-500 text-[11px] mt-1">{errors.source}</p>
              )}
            </div>

            <div>
              <label className="text-foreground text-[14px] font-medium mb-3 block">
                What do you want to accomplish?
              </label>
              <div className="flex flex-wrap gap-2">
                {goals.map((goal) => (
                  <button
                    key={goal}
                    type="button"
                    onClick={() => toggleGoal(goal)}
                    className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-[13px] border transition-all ${
                      selectedGoals.includes(goal)
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-background text-foreground border-border hover:border-primary/50"
                    }`}
                  >
                    {selectedGoals.includes(goal) && (
                      <Check className="size-3.5" />
                    )}
                    {goal}
                  </button>
                ))}
              </div>
              {touched.goals && errors.goals && (
                <p className="text-red-500 text-[11px] mt-1">{errors.goals}</p>
              )}
            </div>

            <div>
              <label className="text-foreground text-[14px] font-medium mb-3 block">
                What platforms matter most to you?
              </label>
              <div className="flex flex-wrap gap-2">
                {platforms.map((platform) => (
                  <button
                    key={platform}
                    type="button"
                    onClick={() => togglePlatform(platform)}
                    className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-[13px] border transition-all ${
                      selectedPlatforms.includes(platform)
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-background text-foreground border-border hover:border-primary/50"
                    }`}
                  >
                    {selectedPlatforms.includes(platform) && (
                      <Check className="size-3.5" />
                    )}
                    {platform}
                  </button>
                ))}
              </div>
              {touched.platforms && errors.platforms && (
                <p className="text-red-500 text-[11px] mt-1">
                  {errors.platforms}
                </p>
              )}
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
