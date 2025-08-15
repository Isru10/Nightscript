import { cookies } from "next/headers";
import { SidebarProvider } from "@/components/ui/sidebar";
import Navbar from "@/components/Navbar";
import { ThemeWrapper } from "@/components/wrapper/ThemeWrapper";
import { SuperAdminSidebar } from "@/components/super_admin/SuperAdminSidebar";
import { SessionProvider } from "next-auth/react";
export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";

  return (
    

    <ThemeWrapper>
      <SidebarProvider defaultOpen={defaultOpen}>
        <SuperAdminSidebar/>
        <main className="w-full">
          <Navbar />
          <div className="px-4">{children}</div>
    
        </main>
      </SidebarProvider>
    </ThemeWrapper>

    
  );
}
