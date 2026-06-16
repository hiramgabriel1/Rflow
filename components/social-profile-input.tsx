import { Sparkles, Camera, Share2, Loader2, Mail, Phone, Users } from "lucide-react";
import { useState } from "react";
import { api, type SocialLead } from "@/lib/api";

const platformDomains: Record<"instagram" | "facebook", string> = {
  instagram: "instagram.com/",
  facebook: "facebook.com/",
};

export default function SocialProfileInput() {
  const [platform, setPlatform] = useState<"instagram" | "facebook">("instagram");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [scrapedLeads, setScrapedLeads] = useState<SocialLead[]>([]);
  const [selectedLead, setSelectedLead] = useState<SocialLead | null>(null);
  const [scrapeStats, setScrapeStats] = useState<{ total: number; withContactInfo: number; message: string } | null>(null);

  const handleAnalyze = async () => {
    if (!username.trim()) return;
    setLoading(true);
    try {
      const res = await api.scrapeSocial({
        username: username.trim(),
        network: platform,
        limit: 100,
      });
      setScrapedLeads(res.leads);
      setScrapeStats({ total: res.total, withContactInfo: res.withContactInfo, message: res.message });
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  };

  const Icon = platform === "instagram" ? Camera : Share2;
  const placeholder = platform === "instagram" ? "username" : "page";

  return (
    <div className="flex flex-col gap-6">
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

      {scrapedLeads.length > 0 && scrapeStats && (
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <div className="px-5 py-3 border-b border-border bg-muted/30">
            <p className="text-[13px] text-foreground">{scrapeStats.message}</p>
            <div className="flex items-center gap-4 mt-2 text-[12px] text-muted-foreground">
              <span>{scrapeStats.total} leads scraped</span>
              <span>{scrapeStats.withContactInfo} with contact info</span>
            </div>
          </div>

          {selectedLead ? (
            <div className="p-5">
              <button
                onClick={() => setSelectedLead(null)}
                className="text-muted-foreground hover:text-foreground text-[12px] mb-4"
              >
                ← Back to list
              </button>
              <div className="flex items-start gap-4">
                <div className="flex items-center justify-center bg-muted rounded-full size-12 flex-shrink-0">
                  <span className="text-[16px] font-bold text-muted-foreground">
                    {selectedLead.username.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="flex-1">
                  <h3 className="text-[15px] font-semibold text-foreground">{selectedLead.fullName}</h3>
                  <p className="text-[13px] text-muted-foreground">@{selectedLead.username}</p>
                  <div className="flex items-center gap-4 mt-3">
                    <div className="flex items-center gap-1.5 text-[12px] text-muted-foreground">
                      <Users className="size-3" />
                      {selectedLead.followersCount.toLocaleString()} followers
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 mt-3">
                    {selectedLead.email && (
                      <div className="flex items-center gap-2 text-[13px] text-foreground bg-muted/50 px-3 py-2 rounded-md">
                        <Mail className="size-3.5 text-muted-foreground flex-shrink-0" />
                        <span className="truncate">{selectedLead.email}</span>
                      </div>
                    )}
                    {selectedLead.phone && (
                      <div className="flex items-center gap-2 text-[13px] text-foreground bg-muted/50 px-3 py-2 rounded-md">
                        <Phone className="size-3.5 text-muted-foreground flex-shrink-0" />
                        <span>{selectedLead.phone}</span>
                      </div>
                    )}
                  </div>
                  {selectedLead.profileUrl && (
                    <a
                      href={selectedLead.profileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 mt-3 text-[12px] text-primary hover:underline"
                    >
                      View Profile
                    </a>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="divide-y divide-border max-h-[400px] overflow-y-auto">
              {scrapedLeads.map((lead, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 px-5 py-3 hover:bg-muted/50 cursor-pointer group"
                  onClick={() => setSelectedLead(lead)}
                >
                  <div className="flex items-center justify-center bg-muted rounded-full size-8 flex-shrink-0">
                    <span className="text-[11px] font-bold text-muted-foreground">
                      {lead.username.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-medium text-foreground truncate">{lead.fullName}</p>
                    <p className="text-[11px] text-muted-foreground">@{lead.username}</p>
                  </div>
                  <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Users className="size-3" />
                      {lead.followersCount.toLocaleString()}
                    </span>
                    {(lead.email || lead.phone) && (
                      <span className="size-1.5 rounded-full bg-success" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
