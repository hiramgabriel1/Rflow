import Sidebar from "@/components/sidebar";

export default function UniversityLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex bg-background min-h-full">
      <Sidebar activeItem="University" />
      <div className="flex flex-col flex-1 min-w-0">{children}</div>
    </div>
  );
}
