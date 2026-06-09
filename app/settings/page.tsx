"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Settings as SettingsIcon, User, Building2, Mail, LogOut } from "lucide-react";
import { api, type UserProfile } from "@/lib/api";
import { useAuth } from "@/lib/auth";

export default function SettingsPage() {
  const router = useRouter();
  const { logout } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const data = await api.getMe();
      setProfile(data);
    } catch (e: unknown) {
      if (e instanceof Error && e.message.includes("Token")) {
        router.push("/auth");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    router.push("/auth");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center flex-1">
        <span className="text-muted-foreground text-[13px]">Loading...</span>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex items-center justify-center flex-1">
        <span className="text-muted-foreground text-[13px]">Unable to load profile</span>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="px-8 py-6 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center bg-primary rounded-md size-8">
            <SettingsIcon className="size-4 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-foreground font-headings font-semibold text-[18px]">
              Settings
            </h1>
            <p className="text-muted-foreground text-[13px]">
              Manage your account and organization
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-2xl px-8 py-8 flex flex-col gap-8">
        <div>
          <h2 className="text-[15px] font-semibold text-foreground mb-4 flex items-center gap-2">
            <User className="size-4 text-muted-foreground" />
            Account Information
          </h2>
          <div className="bg-card border border-border rounded-xl divide-y divide-border">
            <div className="flex items-center justify-between px-5 py-4">
              <div>
                <span className="text-muted-foreground text-[12px]">Name</span>
                <p className="text-foreground text-[14px] font-medium mt-0.5">{profile.name}</p>
              </div>
            </div>
            <div className="flex items-center justify-between px-5 py-4">
              <div>
                <span className="text-muted-foreground text-[12px]">Email</span>
                <p className="text-foreground text-[14px] font-medium mt-0.5 flex items-center gap-2">
                  <Mail className="size-3.5 text-muted-foreground" />
                  {profile.email}
                </p>
              </div>
            </div>
            <div className="flex items-center justify-between px-5 py-4">
              <div>
                <span className="text-muted-foreground text-[12px]">Plan</span>
                <p className="mt-0.5">
                  <span className="text-[12px] px-2 py-0.5 rounded-full bg-primary/10 text-primary capitalize">
                    {profile.plan}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-[15px] font-semibold text-foreground mb-4 flex items-center gap-2">
            <Building2 className="size-4 text-muted-foreground" />
            Organization
          </h2>
          <div className="bg-muted/50 border border-border rounded-xl px-5 py-8 text-center">
            <p className="text-muted-foreground text-[13px]">
              No organization linked to your account.
            </p>
          </div>
        </div>

        <div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-red-500 hover:text-red-600 text-[13px] font-medium transition-colors"
          >
            <LogOut className="size-4" />
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}
