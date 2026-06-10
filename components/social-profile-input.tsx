import { Sparkles, Camera, Share2, Loader2 } from "lucide-react";
import { useState } from "react";

interface SocialProfileInputProps {
  onAnalyze: (platform: "instagram" | "facebook", profileUrl: string) => void;
}

const platformDomains: Record<"instagram" | "facebook", string> = {
  instagram: "instagram.com/",
  facebook: "facebook.com/",
};

export default function SocialProfileInput({ onAnalyze }: SocialProfileInputProps) {
  const [platform, setPlatform] = useState<"instagram" | "facebook">("instagram");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!username.trim()) return;
    setLoading(true);
    const fullUrl = `https://${platformDomains[platform]}${username.trim()}`;
    try {
      onAnalyze(platform, fullUrl);
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  };

  const Icon = platform === "instagram" ? Camera : Share2;
  const placeholder = platform === "instagram" ? "username" : "page";

  return (
    <div className="bg-card border border-border rounded-xl p-6">
      <div className="flex items-center gap-2 mb-4">
        <Icon className="size-4 text-muted-foreground" />
        <span className="text-[13px] font-medium text-foreground">
          Social Profile Analysis
        </span>
      </div>

      <div className="flex items-center gap-2 mb-4">
        <button
          onClick={() => setPlatform("instagram")}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[12px] font-medium transition-colors ${
            platform === "instagram"
              ? "bg-primary/10 text-primary"
              : "bg-muted text-muted-foreground hover:text-foreground"
          }`}
        >
          <Camera className="size-3.5" />
          Instagram
        </button>
        <button
          onClick={() => setPlatform("facebook")}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[12px] font-medium transition-colors ${
            platform === "facebook"
              ? "bg-primary/10 text-primary"
              : "bg-muted text-muted-foreground hover:text-foreground"
          }`}
        >
          <Share2 className="size-3.5" />
          Facebook
        </button>
      </div>

      <div className="flex items-center gap-2">
        <div className="flex-1 flex items-center bg-input border border-border rounded-lg overflow-hidden focus-within:border-primary">
          <span className="px-3 text-[13px] text-muted-foreground border-r border-border bg-muted/50 whitespace-nowrap">
            {platformDomains[platform]}
          </span>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value.replace(/\s/g, ""))}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleAnalyze();
            }}
            placeholder={placeholder}
            className="flex-1 bg-transparent px-3 py-2.5 text-[13px] text-foreground placeholder:text-muted-foreground outline-none"
          />
        </div>
        <button
          onClick={handleAnalyze}
          disabled={loading || !username.trim()}
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
