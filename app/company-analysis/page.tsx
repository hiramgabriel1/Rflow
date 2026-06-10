"use client";

import { useState } from "react";
import useSWR, { mutate } from "swr";
import { Building2, Globe, Sparkles, CheckCircle2, Loader2, ExternalLink } from "lucide-react";
import { api } from "@/lib/api";

export default function CompanyAnalysisPage() {
  const [analyzing, setAnalyzing] = useState(false);

  const { data: profile, isLoading: profileLoading } = useSWR(
    "profile",
    () => api.getMe(),
    { revalidateOnFocus: false }
  );

  const handleAnalyze = async () => {
    if (!profile?.websiteURL) return;
    setAnalyzing(true);
    try {
      await api.analyzeCompany(profile.websiteURL);
      mutate("profile");
    } catch {
      // ignore
    } finally {
      setAnalyzing(false);
    }
  };

  if (profileLoading) {
    return (
      <>
        <div className="flex items-center justify-between px-8 py-4 border-b border-border bg-background">
          <div>
            <h1 className="font-headings font-semibold text-foreground text-[20px]">
              Company Analysis
            </h1>
            <p className="text-muted-foreground text-[13px] mt-0.5">
              Analyze your company website to get insights.
            </p>
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <Loader2 className="size-6 text-muted-foreground animate-spin" />
        </div>
      </>
    );
  }

  const hasContext = !!profile?.contextCompany;

  return (
    <>
      <div className="flex items-center justify-between px-8 py-4 border-b border-border bg-background">
        <div>
          <h1 className="font-headings font-semibold text-foreground text-[20px]">
            Company Analysis
          </h1>
          <p className="text-muted-foreground text-[13px] mt-0.5">
            Analyze your company website to get insights.
          </p>
        </div>
      </div>
      <div className="flex-1 min-w-0 px-4 py-4 lg:px-8 lg:py-6 overflow-y-auto">
        <div className="max-w-2xl mx-auto flex flex-col gap-6">
          <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <Building2 className="size-4 text-muted-foreground" />
              <span className="text-[14px] font-medium text-foreground">
                Company Info
              </span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-muted-foreground text-[11px] uppercase tracking-wide">Organization</span>
                <p className="text-foreground text-[13px] font-medium mt-1">{profile?.organizationName || "—"}</p>
              </div>
              <div>
                <span className="text-muted-foreground text-[11px] uppercase tracking-wide">Website</span>
                <p className="text-foreground text-[13px] font-medium mt-1 flex items-center gap-1">
                  {profile?.websiteURL || "—"}
                  {profile?.websiteURL && (
                    <ExternalLink className="size-3 text-muted-foreground" />
                  )}
                </p>
              </div>
              <div>
                <span className="text-muted-foreground text-[11px] uppercase tracking-wide">Industry</span>
                <p className="text-foreground text-[13px] font-medium mt-1">{profile?.industry || "—"}</p>
              </div>
              <div>
                <span className="text-muted-foreground text-[11px] uppercase tracking-wide">Team Size</span>
                <p className="text-foreground text-[13px] font-medium mt-1">{profile?.teamSize || "—"}</p>
              </div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Sparkles className="size-4 text-primary" />
                <span className="text-[14px] font-medium text-foreground">
                  AI Context
                </span>
              </div>
              {hasContext && (
                <span className="text-[11px] text-success font-medium flex items-center gap-1">
                  <CheckCircle2 className="size-3" />
                  Analyzed
                </span>
              )}
            </div>

            {hasContext ? (
              <div className="bg-muted/50 border border-border rounded-lg p-4">
                <p className="text-foreground text-[13px] leading-relaxed whitespace-pre-wrap">
                  {profile?.contextCompany}
                </p>
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="flex items-center justify-center bg-muted rounded-full size-12 mx-auto mb-3">
                  <Globe className="size-5 text-muted-foreground" />
                </div>
                <p className="text-muted-foreground text-[13px] mb-4">
                  No company context available yet.
                </p>
                <button
                  onClick={handleAnalyze}
                  disabled={analyzing || !profile?.websiteURL}
                  className="inline-flex items-center gap-2 bg-primary text-primary-foreground rounded-lg px-5 py-2.5 text-[13px] font-medium disabled:opacity-50"
                >
                  {analyzing ? (
                    <>
                      <Loader2 className="size-4 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Sparkles className="size-4" />
                      Analyze Company
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
