import { Sparkles } from "lucide-react";

interface OpportunityInputProps {
  onSearch: () => void;
}

export default function OpportunityInput({ onSearch }: OpportunityInputProps) {
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
      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground text-[12px]">
            AI will analyze market size, competition and revenue potential
          </span>
        </div>
        <button
          onClick={onSearch}
          className="flex items-center gap-2 bg-primary text-primary-foreground rounded-md px-5 py-2.5 text-[13px] font-medium"
        >
          <Sparkles className="size-3.5" />
          Find Opportunities
        </button>
      </div>
    </div>
  );
}
