"use client";

import { useState } from "react";
import Image from "next/image";
import { Import, Download, Plus, ChevronDown, CheckCircle2 } from "lucide-react";
import DataHubStats from "@/components/data-hub-stats";
import LeadProfile from "@/components/lead-profile";

const leads = [
  {
    id: 1,
    name: "Sarah Chen",
    role: "VP of Sales",
    company: "Vercel Inc.",
    email: "s.chen@vercel.com",
    emailVerified: true,
    phone: "+1 415 555 0184",
    instagram: "@schen_sales",
    tiktok: "@sarahchen",
    avatar: "https://storage.googleapis.com/banani-avatars/avatar/female/25-35/Asian/0",
    score: 94,
    industry: "SaaS",
    country: "USA",
    source: "AI Investigation",
    added: "Jul 8, 2025",
  },
  {
    id: 2,
    name: "Marcus Webb",
    role: "CRO",
    company: "Linear HQ",
    email: "m.webb@linear.app",
    emailVerified: true,
    phone: "+1 650 555 0271",
    instagram: "@marcuswebb",
    tiktok: null,
    avatar: "https://storage.googleapis.com/banani-avatars/avatar/male/35-45/European/0",
    score: 88,
    industry: "SaaS",
    country: "USA",
    source: "AI Investigation",
    added: "Jul 7, 2025",
  },
  {
    id: 3,
    name: "Priya Nair",
    role: "Head of Growth",
    company: "Notion Labs",
    email: "p.nair@notion.so",
    emailVerified: true,
    phone: "+1 628 555 0093",
    instagram: "@priyanair",
    tiktok: "@notionpriya",
    avatar: "https://storage.googleapis.com/banani-avatars/avatar/female/25-35/South Asian/0",
    score: 91,
    industry: "SaaS",
    country: "USA",
    source: "AI Investigation",
    added: "Jul 7, 2025",
  },
  {
    id: 4,
    name: "Tobias Müller",
    role: "Director of Sales",
    company: "Personio GmbH",
    email: "t.muller@personio.de",
    emailVerified: false,
    phone: "+49 89 555 0142",
    instagram: "@tobiassmuller",
    tiktok: null,
    avatar: "https://storage.googleapis.com/banani-avatars/avatar/male/35-45/European/1",
    score: 76,
    industry: "HR Tech",
    country: "Germany",
    source: "Manual Import",
    added: "Jul 6, 2025",
  },
  {
    id: 5,
    name: "Aisha Okonkwo",
    role: "VP Marketing",
    company: "Paystack",
    email: "a.okonkwo@paystack.com",
    emailVerified: true,
    phone: "+234 812 555 0054",
    instagram: "@aishaokonkwo",
    tiktok: "@aishaok",
    avatar: "https://storage.googleapis.com/banani-avatars/avatar/female/25-35/African/0",
    score: 85,
    industry: "Fintech",
    country: "Nigeria",
    source: "AI Investigation",
    added: "Jul 5, 2025",
  },
  {
    id: 6,
    name: "James Hartley",
    role: "Enterprise AE",
    company: "Intercom",
    email: "j.hartley@intercom.io",
    emailVerified: true,
    phone: "+1 415 555 0397",
    instagram: null,
    tiktok: null,
    avatar: "https://storage.googleapis.com/banani-avatars/avatar/male/25-35/European/0",
    score: 72,
    industry: "SaaS",
    country: "USA",
    source: "AI Investigation",
    added: "Jul 4, 2025",
  },
  {
    id: 7,
    name: "Yuki Tanaka",
    role: "Sales Lead",
    company: "SmartHR",
    email: "y.tanaka@smarthr.jp",
    emailVerified: false,
    phone: "+81 3 555 0218",
    instagram: "@yukitanaka",
    tiktok: "@yukisales",
    avatar: "https://storage.googleapis.com/banani-avatars/avatar/female/25-35/Asian/1",
    score: 68,
    industry: "HR Tech",
    country: "Japan",
    source: "Manual Import",
    added: "Jul 3, 2025",
  },
  {
    id: 8,
    name: "Carlos Romero",
    role: "CRO",
    company: "Clip MX",
    email: "c.romero@clip.mx",
    emailVerified: true,
    phone: "+52 55 555 0321",
    instagram: "@cromero_clip",
    tiktok: "@carlosclip",
    avatar: "https://storage.googleapis.com/banani-avatars/avatar/male/35-45/Latino/0",
    score: 82,
    industry: "Fintech",
    country: "Mexico",
    source: "AI Investigation",
    added: "Jul 2, 2025",
  },
];

export default function DataHubPage() {
  const [selectedLead, setSelectedLead] = useState<typeof leads[0] | null>(leads[0]);
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set([1]));

  const toggleSelect = (id: number) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleAll = () => {
    if (selectedIds.size === leads.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(leads.map((l) => l.id)));
    }
  };

  return (
    <>
      <div className="flex items-center justify-between px-8 py-4 border-b border-border bg-background">
        <div>
          <h1 className="font-headings font-semibold text-foreground text-[20px]">
            Data Hub
          </h1>
          <p className="text-muted-foreground text-[13px] mt-0.5">
            Manage, filter and export all your discovered leads.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 bg-background border border-border rounded-md px-3 py-2 text-[13px] text-foreground">
            <Import className="size-3.5" />
            Import
          </button>
          <button className="flex items-center gap-1.5 bg-background border border-border rounded-md px-3 py-2 text-[13px] text-foreground">
            <Download className="size-3.5" />
            Export CSV
          </button>
          <button className="flex items-center gap-1.5 bg-primary text-primary-foreground rounded-md px-3 py-2 text-[13px] font-medium">
            <Plus className="size-3.5" />
            Add Lead
          </button>
        </div>
      </div>
      <div className="flex flex-1 min-w-0">
        <div className="flex-1 min-w-0 px-8 py-6 overflow-y-auto">
          <DataHubStats />
          <div className="flex items-center gap-2 mt-6 mb-4 flex-wrap">
            <div className="flex items-center gap-2 bg-input rounded-md px-3 py-2 border border-border w-[200px]">
              <svg className="size-3.5 text-muted-foreground flex-shrink-0" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
              <span className="text-muted-foreground text-[13px]">Search leads...</span>
            </div>
            <button className="flex items-center gap-1.5 bg-background border border-border rounded-md px-3 py-2 text-[13px] text-foreground">
              <svg className="size-3.5" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14a9 3 0 0 0 18 0V5"/><path d="M3 12a9 3 0 0 0 18 0"/></svg>
              Industry
              <ChevronDown className="size-3 text-muted-foreground" />
            </button>
            <button className="flex items-center gap-1.5 bg-background border border-border rounded-md px-3 py-2 text-[13px] text-foreground">
              <svg className="size-3.5" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>
              Country
              <ChevronDown className="size-3 text-muted-foreground" />
            </button>
            <button className="flex items-center gap-1.5 bg-background border border-border rounded-md px-3 py-2 text-[13px] text-foreground">
              <svg className="size-3.5" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>
              Score
              <ChevronDown className="size-3 text-muted-foreground" />
            </button>
            <button className="flex items-center gap-1.5 bg-background border border-border rounded-md px-3 py-2 text-[13px] text-foreground">
              <svg className="size-3.5" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 10h16"/><path d="M4 14h16"/><path d="M4 18h16"/><path d="M4 6h16"/><circle cx="8" cy="6" r="2"/><circle cx="16" cy="14" r="2"/></svg>
              Platform
              <ChevronDown className="size-3 text-muted-foreground" />
            </button>
            <button className="flex items-center gap-1.5 bg-background border border-border rounded-md px-3 py-2 text-[13px] text-success">
              <CheckCircle2 className="size-3.5" />
              Verified only
            </button>
            <span className="text-muted-foreground text-[12px] ml-2">
              48,320 results
            </span>
            <button className="flex items-center gap-1.5 text-muted-foreground text-[12px] ml-auto">
              <svg className="size-3.5" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>
              Columns
            </button>
          </div>
          <div className="bg-card border border-border rounded-lg overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="w-10 px-4 py-3">
                    <input
                      type="checkbox"
                      checked={selectedIds.size === leads.length}
                      onChange={toggleAll}
                      className="rounded border-border"
                    />
                  </th>
                  <th className="text-left text-[12px] font-medium text-muted-foreground px-4 py-3">
                    NAME
                  </th>
                  <th className="text-left text-[12px] font-medium text-muted-foreground px-4 py-3">
                    COMPANY
                  </th>
                  <th className="text-left text-[12px] font-medium text-muted-foreground px-4 py-3">
                    EMAIL
                  </th>
                  <th className="text-left text-[12px] font-medium text-muted-foreground px-4 py-3">
                    PHONE
                  </th>
                  <th className="text-left text-[12px] font-medium text-muted-foreground px-4 py-3">
                    INSTAGRAM
                  </th>
                  <th className="text-left text-[12px] font-medium text-muted-foreground px-4 py-3">
                    TIKTOK
                  </th>
                </tr>
              </thead>
              <tbody>
                {leads.map((lead) => (
                  <tr
                    key={lead.id}
                    className={`border-b border-border last:border-b-0 cursor-pointer ${
                      selectedLead?.id === lead.id ? "bg-secondary" : "hover:bg-muted/50"
                    }`}
                    onClick={() => setSelectedLead(lead)}
                  >
                    <td className="px-4 py-3">
                      <input
                        type="checkbox"
                        checked={selectedIds.has(lead.id)}
                        onChange={(e) => {
                          e.stopPropagation();
                          toggleSelect(lead.id);
                        }}
                        className="rounded border-border"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <Image
                          src={lead.avatar}
                          alt=""
                          className="rounded-full size-8"
                          width={32}
                          height={32}
                        />
                        <div>
                          <div className="text-foreground text-[13px] font-medium">
                            {lead.name}
                          </div>
                          <div className="text-muted-foreground text-[12px]">
                            {lead.role}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-[13px] text-foreground">
                      {lead.company}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1.5 text-[13px] text-foreground">
                        {lead.emailVerified && (
                          <CheckCircle2 className="size-3.5 text-success flex-shrink-0" />
                        )}
                        {lead.email}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-[13px] text-foreground">
                      {lead.phone}
                    </td>
                    <td className="px-4 py-3 text-[13px] text-foreground">
                      {lead.instagram || <span className="text-muted-foreground">—</span>}
                    </td>
                    <td className="px-4 py-3 text-[13px] text-foreground">
                      {lead.tiktok || <span className="text-muted-foreground">—</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex items-center justify-between mt-4">
            <span className="text-muted-foreground text-[13px]">
              Showing 1–8 of 48,320 leads
            </span>
            <div className="flex items-center gap-1">
              <button className="size-8 flex items-center justify-center rounded-md text-muted-foreground hover:text-foreground">
                <svg className="size-4" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
              </button>
              <button className="size-8 flex items-center justify-center rounded-md bg-primary text-primary-foreground text-[13px] font-medium">
                1
              </button>
              <button className="size-8 flex items-center justify-center rounded-md text-[13px] text-foreground hover:bg-muted">
                2
              </button>
              <button className="size-8 flex items-center justify-center rounded-md text-[13px] text-foreground hover:bg-muted">
                3
              </button>
              <span className="size-8 flex items-center justify-center text-muted-foreground text-[13px]">
                ...
              </span>
              <button className="size-8 flex items-center justify-center rounded-md text-[13px] text-foreground hover:bg-muted">
                4032
              </button>
              <button className="size-8 flex items-center justify-center rounded-md text-muted-foreground hover:text-foreground">
                <svg className="size-4" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
              </button>
            </div>
          </div>
        </div>
        {selectedLead && (
          <LeadProfile lead={selectedLead} onClose={() => setSelectedLead(null)} />
        )}
      </div>
    </>
  );
}
