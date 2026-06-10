import useSWR from "swr";
import { ArrowLeft, Globe, Loader2 } from "lucide-react";
import { api, type CompetitorDetail } from "@/lib/api";

interface CompetitorDetailProps {
  id: string;
  onBack: () => void;
}

export default function CompetitorDetail({ id, onBack }: CompetitorDetailProps) {
  const { data: competitor, isLoading } = useSWR(
    id ? `competitor-${id}` : null,
    () => api.getCompetitor(id),
    { revalidateOnFocus: false }
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="size-5 text-muted-foreground animate-spin" />
      </div>
    );
  }

  if (!competitor) return null;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground text-[13px] transition-colors"
        >
          <ArrowLeft className="size-3.5" />
          Back to list
        </button>
        <div className="flex items-center gap-2">
          <Globe className="size-3.5 text-muted-foreground" />
          <span className="text-[13px] font-medium text-foreground truncate max-w-[200px]">
            {competitor.name}
          </span>
        </div>
      </div>

      <div className="bg-muted/50 border border-border rounded-lg p-4">
        <h4 className="text-[12px] font-medium text-muted-foreground uppercase tracking-wide mb-2">
          Comparison Analysis
        </h4>
        <p className="text-[13px] text-foreground leading-relaxed whitespace-pre-wrap">
          {competitor.comparison}
        </p>
      </div>

      <div className="bg-muted/50 border border-border rounded-lg p-4">
        <h4 className="text-[12px] font-medium text-muted-foreground uppercase tracking-wide mb-2">
          Competitor Analysis
        </h4>
        <p className="text-[13px] text-foreground leading-relaxed whitespace-pre-wrap">
          {competitor.analysis}
        </p>
      </div>

      <div className="bg-muted/50 border border-border rounded-lg p-4">
        <h4 className="text-[12px] font-medium text-muted-foreground uppercase tracking-wide mb-2">
          Scraped Content
        </h4>
        <p className="text-[13px] text-muted-foreground leading-relaxed whitespace-pre-wrap line-clamp-6">
          {competitor.content}
        </p>
      </div>
    </div>
  );
}
