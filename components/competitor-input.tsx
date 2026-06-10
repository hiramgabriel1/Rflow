import { Sparkles, Globe, Loader2 } from "lucide-react";
import { useState } from "react";

interface CompetitorInputProps {
  onAnalyze: (url: string) => void;
  loading: boolean;
}

export default function CompetitorInput({ onAnalyze, loading }: CompetitorInputProps) {
  const [url, setUrl] = useState("");

  const handleAnalyze = async () => {
    if (!url.trim()) return;
    onAnalyze(url.trim());
  };

  return (
    <div className="bg-card border border-border rounded-xl p-6">
      <div className="flex items-center gap-2 mb-4">
        <Globe className="size-4 text-muted-foreground" />
        <span className="text-[13px] font-medium text-foreground">
          Analyze Competitor
        </span>
      </div>
      <p className="text-muted-foreground text-[13px] mb-4">
        Enter a competitor&apos;s website URL to compare against your company.
      </p>
      <div className="flex items-center gap-2">
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleAnalyze();
          }}
          placeholder="https://competitor.com"
          className="flex-1 bg-input border border-border rounded-lg px-4 py-2.5 text-[13px] text-foreground placeholder:text-muted-foreground outline-none focus:border-primary"
        />
        <button
          onClick={handleAnalyze}
          disabled={loading || !url.trim()}
          className="flex items-center gap-2 bg-primary text-primary-foreground rounded-md px-4 py-2.5 text-[13px] font-medium disabled:opacity-50 whitespace-nowrap"
        >
          {loading ? (
            <>
              <Loader2 className="size-3.5 animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              <Sparkles className="size-3.5" />
              Analyze
            </>
          )}
        </button>
      </div>
    </div>
  );
}
