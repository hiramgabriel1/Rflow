import { Search, Bell } from "lucide-react";

export default function Topbar() {
  return (
    <div className="flex items-center justify-between px-4 py-3 lg:px-8 lg:py-4 border-b border-border bg-background min-h-[56px] lg:min-h-[60px]">
      <div className="hidden sm:flex items-center gap-2.5 bg-input rounded-md px-4 py-2.5 border border-border w-[300px]">
        <Search className="size-3.5 text-muted-foreground flex-shrink-0" />
        <span className="text-muted-foreground text-[13px]">
          Search anything...
        </span>
        <div className="ml-auto flex items-center gap-1">
          <span className="bg-muted text-muted-foreground rounded px-1.5 py-0.5 text-[11px]">
            ⌘K
          </span>
        </div>
      </div>
      <div className="flex items-center gap-3 lg:gap-4">
        <div className="hidden md:flex items-center gap-2 border border-border rounded-md px-3 py-2">
          <div className="size-1.5 rounded-full bg-primary" />
          <span className="text-foreground text-[12px] font-medium">
            2,450 Credits
          </span>
        </div>
        <button className="relative flex items-center justify-center size-9 rounded-md border border-border bg-background text-muted-foreground">
          <Bell className="size-3.5" />
          <span className="absolute top-1.5 right-1.5 size-1.5 rounded-full bg-primary" />
        </button>
      </div>
    </div>
  );
}
