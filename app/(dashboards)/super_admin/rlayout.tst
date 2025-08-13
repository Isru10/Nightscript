import type React from "react"
import { SuperAdminSidebar } from "@/components/super_admin/SuperAdminSidebar"
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { ThemeWrapper } from "@/components/wrapper/ThemeWrapper"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"

export default async function SuperAdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // const session = await getServerSession(authOptions)

  // if (!session || session.user.role !== "superadmin") {
  //   redirect("/")
  // }

  return (
    <ThemeWrapper>
      <SidebarProvider>
        <SuperAdminSidebar />
        <SidebarInset className="bg-black min-h-screen">
          <header className="flex h-16 shrink-0 items-center gap-2 border-b border-red-900 bg-black px-4">
            <SidebarTrigger className="text-red-500 hover:text-red-400" />
            <div className="text-red-100 font-semibold">Horror Hub - Super Admin Panel</div>
          </header>
          <main className="flex-1 p-6 bg-black text-red-100">{children}</main>
        </SidebarInset>
      </SidebarProvider>
    </ThemeWrapper>
  )
}
