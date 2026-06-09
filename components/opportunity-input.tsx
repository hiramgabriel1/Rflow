import { Sparkles, Globe } from "lucide-react";
import { useState, useEffect } from "react";
import { api } from "@/lib/api";

interface OpportunityInputProps {
  onSearch: (companyUrl: string) => void;
}

export default function OpportunityInput({ onSearch }: OpportunityInputProps) {
  const [companyUrl, setCompanyUrl] = useState("");
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
        <Globe className="size-4 text-muted-foreground" />
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
  );
}
