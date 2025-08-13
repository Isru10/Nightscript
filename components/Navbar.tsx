"use client"
import { LogOut, Moon, Settings, Sun, User } from "lucide-react"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "./ui/button"
import { useTheme } from "next-themes"
import { SidebarTrigger } from "./ui/sidebar"
import { useSession, signOut } from "next-auth/react"

const Navbar = () => {
  const { theme, setTheme } = useTheme()
  const { data: session } = useSession()

  return (
    <nav className="p-4 flex justify-between items-center border-b border-red-900 bg-black">
      {/* left */}
      <div className="flex items-center gap-4">
        <SidebarTrigger className="text-red-500 hover:text-red-400" />
        <div className="text-red-100 font-semibold">Horror Hub - Super Admin Panel</div>
      </div>

      {/* right */}
      <div className="flex items-center gap-4">
        <Link href="/" className="text-red-400 hover:text-red-300 transition-colors">
          Dashboard
        </Link>

        {/* dark and light mode */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" className="border-red-700 bg-black hover:bg-red-950">
              <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90 text-red-400" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0 text-red-400" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-black border-red-700">
            <DropdownMenuItem onClick={() => setTheme("light")} className="text-red-100 hover:bg-red-950">
              Light
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("dark")} className="text-red-100 hover:bg-red-950">
              Dark
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("system")} className="text-red-100 hover:bg-red-950">
              System
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* user profile */}
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar className="border-2 border-red-700">
              <AvatarImage src={"https://github.com/shadcn.png"} />
              <AvatarFallback className="bg-red-900 text-red-100">
                {session?.user?.name?.charAt(0) || "U"}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent sideOffset={10} className="bg-black border-red-700">
            <DropdownMenuLabel className="text-red-100">{session?.user?.name || "My Account"}</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-red-700" />
            <DropdownMenuItem className="text-red-100 hover:bg-red-950">
              <User className="h-[1.2rem] w-[1.2rem] mr-2 text-red-400" /> Profile
            </DropdownMenuItem>
            <DropdownMenuItem className="text-red-100 hover:bg-red-950">
              <Settings className="h-[1.2rem] w-[1.2rem] mr-2 text-red-400" /> Settings
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => signOut()} className="text-red-400 hover:bg-red-950 hover:text-red-300">
              <LogOut className="h-[1.2rem] w-[1.2rem] mr-2" /> Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  )
}

export default Navbar
