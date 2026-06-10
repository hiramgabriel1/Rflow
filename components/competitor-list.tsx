import useSWR, { mutate } from "swr";
import { Globe, Trash2, ChevronRight, Loader2 } from "lucide-react";
import { api } from "@/lib/api";

interface CompetitorListProps {
  onSelectCompetitor: (id: string) => void;
}

export default function CompetitorList({ onSelectCompetitor }: CompetitorListProps) {
  const { data: competitors, isLoading } = useSWR(
    "competitors",
    () => api.listCompetitors(),
    { revalidateOnFocus: false }
  );

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await api.deleteCompetitor(id);
      mutate("competitors");
    } catch {
      // ignore
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="size-5 text-muted-foreground animate-spin" />
      </div>
    );
  }

  if (!competitors || competitors.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="flex items-center justify-center bg-muted rounded-full size-12 mx-auto mb-3">
          <Globe className="size-5 text-muted-foreground" />
        </div>
        <p className="text-muted-foreground text-[13px]">
          No competitors analyzed yet.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col divide-y divide-border">
      {competitors.map((comp) => (
        <div
          key={comp.id}
          className="flex items-center gap-3 px-4 py-3 hover:bg-muted/50 cursor-pointer group"
          onClick={() => onSelectCompetitor(comp.id)}
        >
          <div className="flex items-center justify-center bg-muted rounded-md size-8 flex-shrink-0">
            <Globe className="size-3.5 text-muted-foreground" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[13px] font-medium text-foreground truncate">
              {comp.name}
            </p>
            <p className="text-[11px] text-muted-foreground truncate">
              {comp.url}
            </p>
          </div>
          <button
            onClick={(e) => handleDelete(comp.id, e)}
            className="opacity-0 group-hover:opacity-100 p-1 text-muted-foreground hover:text-red-500 transition-all"
          >
            <Trash2 className="size-3.5" />
          </button>
          <ChevronRight className="size-4 text-muted-foreground flex-shrink-0" />
        </div>
      ))}
    </div>
  );
}
