import Sidebar from "@/components/sidebar";

export default function OpportunityFinderLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex bg-background min-h-full">
      <Sidebar activeItem="Opportunity Finder" />
      <div className="flex flex-col flex-1 min-w-0">{children}</div>
    </div>
  );
}
