import { Sparkles, Globe, Building2 } from "lucide-react";
import { useState, useEffect } from "react";
import { api } from "@/lib/api";

interface OpportunityInputProps {
  onSearch: (companyUrl?: string) => void;
}

export default function OpportunityInput({ onSearch }: OpportunityInputProps) {
  const [companyUrl, setCompanyUrl] = useState("");
  const [showCompanyInput, setShowCompanyInput] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadCompanyUrl();
  }, []);

  const loadCompanyUrl = async () => {
    try {
      const profile = await api.getMe();
      if (profile.haveCompany && profile.userCompany?.website) {
        setCompanyUrl(profile.userCompany.website);
      }
    } catch {
      // ignore
    }
  };

  const handleAnalyzeCompany = async () => {
    if (!companyUrl.trim()) return;
    setLoading(true);
    try {
      await api.analyzeCompany(companyUrl);
      onSearch(companyUrl);
    } catch {
      // ignore - still trigger search
      onSearch(companyUrl);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-card border border-border rounded-xl p-6 mb-6">
      <div className="flex items-center gap-2 mb-4">
        <div className="flex items-center justify-center bg-secondary rounded-md size-7">
          <Sparkles className="size-3.5 text-primary" />
        </div>
        <span className="text-foreground font-medium text-[14px]">
          Describe your business
        </span>
      </div>
      <textarea
        className="w-full bg-input border border-border rounded-lg px-4 py-3 text-[14px] text-foreground placeholder:text-muted-foreground outline-none focus:border-primary resize-none min-h-[100px]"
        placeholder="e.g., We sell AI-powered sales intelligence tools to B2B SaaS companies. Our ideal customers are VP Sales and Revenue leaders at Series A-C startups who need better prospecting and outreach automation..."
      />
      <div className="flex items-center gap-2 mt-4">
        <button
          type="button"
          onClick={() => setShowCompanyInput(!showCompanyInput)}
          className="flex items-center gap-2 bg-background border border-border rounded-md px-4 py-2 text-[13px] text-foreground hover:border-primary/50 transition-colors"
        >
          <Building2 className="size-3.5" />
          Analizar mi empresa
        </button>
      </div>

      {showCompanyInput && (
        <div className="mt-4 p-4 bg-muted/50 rounded-lg border border-border">
          <div className="flex items-center gap-2 mb-3">
            <Globe className="size-3.5 text-muted-foreground" />
            <span className="text-[13px] font-medium text-foreground">
              URL de tu empresa
            </span>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="url"
              value={companyUrl}
              onChange={(e) => setCompanyUrl(e.target.value)}
              placeholder="https://tuempresa.com"
              className="flex-1 bg-input border border-border rounded-lg px-4 py-2.5 text-[13px] text-foreground placeholder:text-muted-foreground outline-none focus:border-primary"
            />
            <button
              onClick={handleAnalyzeCompany}
              disabled={loading || !companyUrl.trim()}
              className="flex items-center gap-2 bg-primary text-primary-foreground rounded-md px-4 py-2.5 text-[13px] font-medium disabled:opacity-50 whitespace-nowrap"
            >
              <Sparkles className="size-3.5" />
              {loading ? "Analizando..." : "Analizar"}
            </button>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground text-[12px]">
            AI will analyze market size, competition and revenue potential
          </span>
        </div>
        <button
          onClick={() => onSearch()}
          className="flex items-center gap-2 bg-primary text-primary-foreground rounded-md px-5 py-2.5 text-[13px] font-medium"
        >
          <Sparkles className="size-3.5" />
          Find Opportunities
        </button>
      </div>
    </div>
  );
}
