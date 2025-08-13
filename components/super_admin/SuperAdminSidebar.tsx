"use client"
import { useState } from "react"
import {
  Sidebar,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarFooter,
  SidebarSeparator,
  SidebarGroupLabel,
} from "@/components/ui/sidebar"
import {
  ChevronDown,
  ChevronUp,
  Users,
  Video,
  Shield,
  Brain,
  Mail,
  Settings,
  User2,
  BarChart3,
  Flag,
  Eye,
} from "lucide-react"
import Link from "next/link"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible"
import { signOut } from "next-auth/react"

const SuperAdminSidebar = () => {
  const items = [
    {
      title: "Dashboard",
      url: "/super_admin/dashboard",
      icon: BarChart3,
    },
    {
      title: "Video Management",
      url: "/super_admin/videos",
      icon: Video,
    },
    {
      title: "User Management",
      url: "/super_admin/users",
      icon: Users,
    },
    {
      title: "Content Moderation",
      url: "/super_admin/moderation",
      icon: Shield,
    },
    {
      title: "AI Content Filter",
      url: "/super_admin/ai-filter",
      icon: Brain,
    },
    {
      title: "Email Settings",
      url: "/super_admin/email",
      icon: Mail,
    },
    {
      title: "System Settings",
      url: "/super_admin/settings",
      icon: Settings,
    },
  ]

  const [name, setName] = useState("Horror Hub Admin")

  return (
    <Sidebar collapsible="icon" className="bg-black border-red-900">
      <SidebarHeader className="py-4 border-b border-red-900">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="hover:bg-red-950">
              <Link href={"/super_admin/dashboard"}>
                <div className="w-5 h-5 bg-red-600 rounded flex items-center justify-center">
                  <Eye className="w-3 h-3 text-white" />
                </div>
                <span className="text-red-100">{name}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarSeparator className="bg-red-900" />

      <SidebarContent className="bg-black">
        <SidebarGroup>
          <SidebarGroupLabel className="text-red-400">Horror Platform</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="hover:bg-red-950 text-red-100 hover:text-white">
                    <Link href={item.url}>
                      <item.icon className="text-red-500" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <Collapsible defaultOpen className="group/collapsible">
          <SidebarGroup>
            <SidebarGroupLabel asChild>
              <CollapsibleTrigger className="text-red-400 hover:text-red-300">
                Quick Actions
                <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180 text-red-500" />
              </CollapsibleTrigger>
            </SidebarGroupLabel>

            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild className="hover:bg-red-950 text-red-100">
                      <Link href="/super_admin/videos/upload">
                        <Video className="text-red-500" />
                        Upload Horror Video
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>

                  <SidebarMenuItem>
                    <SidebarMenuButton asChild className="hover:bg-red-950 text-red-100">
                      <Link href="/super_admin/moderation/flagged">
                        <Flag className="text-red-500" />
                        Review Flagged Content
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>
      </SidebarContent>

      <SidebarSeparator className="bg-red-900" />

      <SidebarFooter className="bg-black border-t border-red-900">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton className="hover:bg-red-950 text-red-100">
                  <User2 className="text-red-500" /> Super Admin <ChevronUp className="ml-auto text-red-500" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="bg-black border-red-900">
                <DropdownMenuItem className="text-red-100 hover:bg-red-950">
                  <Link href="/super_admin/profile">Profile</Link>
                </DropdownMenuItem>

                <DropdownMenuItem className="text-red-100 hover:bg-red-950">
                  <Link href="/super_admin/settings">Settings</Link>
                </DropdownMenuItem>

                <DropdownMenuItem className="text-red-400 hover:bg-red-950 cursor-pointer" onClick={() => signOut()}>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}

export { SuperAdminSidebar }
