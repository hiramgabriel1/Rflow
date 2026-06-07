"use client";

import { useState } from "react";
import Sidebar from "@/components/sidebar";
import MobileSidebar from "@/components/mobile-sidebar";
import AuthGuard from "@/components/auth-guard";
import { Menu } from "lucide-react";

export default function OpportunityFinderLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <AuthGuard>
      <div className="flex bg-background min-h-full">
        <Sidebar activeItem="Opportunity Finder" />
        <MobileSidebar isOpen={mobileOpen} onClose={() => setMobileOpen(false)}>
          <Sidebar activeItem="Opportunity Finder" />
        </MobileSidebar>
        <div className="flex flex-col flex-1 min-w-0">
          <button
            onClick={() => setMobileOpen(true)}
            className="lg:hidden fixed top-4 left-4 z-30 size-9 flex items-center justify-center rounded-md border border-border bg-background text-muted-foreground"
          >
            <Menu className="size-4" />
          </button>
          {children}
        </div>
      </div>
    </AuthGuard>
  );
}
