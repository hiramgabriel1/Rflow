"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Building2, Globe, ChevronDown } from "lucide-react";

const industries = [
  "SaaS",
  "Fintech",
  "E-commerce",
  "Healthcare",
  "Education",
  "Marketing",
  "Consulting",
  "Other",
];

const teamSizes = [
  "1-10",
  "11-50",
  "51-200",
  "201-500",
  "501-1000",
  "1000+",
];

const schema = Yup.object({
  organization: Yup.string().required("Organization name is required"),
  website: Yup.string()
    .required("Website URL is required")
    .url("Please enter a valid URL"),
  industry: Yup.string().required("Please select an industry"),
  teamSize: Yup.string().required("Please select team size"),
});

interface Step2Data {
  organization: string;
  website: string;
  industry: string;
  teamSize: string;
}

interface AuthStep2Props {
  data: Step2Data;
  onUpdate: (data: Partial<Step2Data>) => void;
  onNext: () => void;
}

export default function AuthStep2({ data, onUpdate, onNext }: AuthStep2Props) {
  return (
    <div className="bg-card border border-border rounded-xl p-8 shadow-[0_1px_4px_rgba(0,0,0,0.04)]">
      <h2 className="font-headings font-semibold text-foreground text-[22px] -tracking-[0.3px] mb-1">
        Tell us about your organization
      </h2>
      <p className="text-muted-foreground text-[14px] mb-6">
        This helps us tailor your RubyFlow experience.
      </p>

      <Formik
        initialValues={{
          organization: data.organization,
          website: data.website,
          industry: data.industry,
          teamSize: data.teamSize,
        }}
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
                Organization Name
              </label>
              <div className="relative">
                <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <Field
                  name="organization"
                  type="text"
                  placeholder="Acme Inc."
                  className="w-full bg-input border border-border rounded-lg pl-10 pr-4 py-2.5 text-[14px] text-foreground placeholder:text-muted-foreground outline-none focus:border-primary transition-colors"
                />
              </div>
              <ErrorMessage
                name="organization"
                component="p"
                className="text-red-500 text-[11px] mt-1"
              />
            </div>

            <div>
              <label className="text-foreground text-[13px] font-medium mb-1.5 block">
                Website URL
              </label>
              <div className="relative">
                <Globe className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <Field
                  name="website"
                  type="text"
                  placeholder="https://acme.com"
                  className="w-full bg-input border border-border rounded-lg pl-10 pr-4 py-2.5 text-[14px] text-foreground placeholder:text-muted-foreground outline-none focus:border-primary transition-colors"
                />
              </div>
              <ErrorMessage
                name="website"
                component="p"
                className="text-red-500 text-[11px] mt-1"
              />
            </div>

            <div>
              <label className="text-foreground text-[13px] font-medium mb-1.5 block">
                Industry
              </label>
              <div className="relative">
                <Field
                  name="industry"
                  as="select"
                  className="w-full bg-input border border-border rounded-lg px-4 py-2.5 text-[14px] text-foreground outline-none focus:border-primary transition-colors appearance-none"
                >
                  <option value="">Select industry...</option>
                  {industries.map((ind) => (
                    <option key={ind} value={ind}>
                      {ind}
                    </option>
                  ))}
                </Field>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
              </div>
              <ErrorMessage
                name="industry"
                component="p"
                className="text-red-500 text-[11px] mt-1"
              />
            </div>

            <div>
              <label className="text-foreground text-[13px] font-medium mb-1.5 block">
                Team Size
              </label>
              <div className="relative">
                <Field
                  name="teamSize"
                  as="select"
                  className="w-full bg-input border border-border rounded-lg px-4 py-2.5 text-[14px] text-foreground outline-none focus:border-primary transition-colors appearance-none"
                >
                  <option value="">Select team size...</option>
                  {teamSizes.map((size) => (
                    <option key={size} value={size}>
                      {size} employees
                    </option>
                  ))}
                </Field>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
              </div>
              <ErrorMessage
                name="teamSize"
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
