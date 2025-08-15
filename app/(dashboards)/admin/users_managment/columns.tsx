"use client"

import { cn } from "@/lib/utils"
import type { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { ArrowUpDown, MoreHorizontal, Shield, User, Crown } from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"

// Renamed User type to avoid redeclaration
export type AdminUser = {
  id: string
  name: string
  email: string
  role: "user" | "admin" | "superadmin"
  status: "active" | "inactive" | "verified" | "unverified"
  registeredAt: string
  lastLogin: string
}

const getRoleIcon = (role: string) => {
  switch (role) {
    case "superadmin":
      return <Crown className="h-3 w-3" />
    case "admin":
      return <Shield className="h-3 w-3" />
    default:
      return <User className="h-3 w-3" />
  }
}

export const columns: ColumnDef<AdminUser>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
      />
    ),
    cell: ({ row }) => (
      <Checkbox onCheckedChange={(value) => row.toggleSelected(!!value)} checked={row.getIsSelected()} />
    ),
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      const name = row.getValue("name") as string
      return <div className="font-medium">{name}</div>
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => {
      const role = row.getValue("role") as string
      return (
        <Badge
          variant="outline"
          className={cn(
            "flex items-center gap-1 w-max",
            role === "superadmin" && "border-red-500 text-red-500",
            role === "admin" && "border-orange-500 text-orange-500",
            role === "user" && "border-gray-500 text-gray-500",
          )}
        >
          {getRoleIcon(role)}
          {role}
        </Badge>
      )
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string
      return (
        <div
          className={cn(
            "p-1 rounded-md w-max text-xs font-medium",
            status === "active" && "bg-green-500/20 text-green-700",
            status === "inactive" && "bg-gray-500/20 text-gray-700",
            status === "verified" && "bg-blue-500/20 text-blue-700",
            status === "unverified" && "bg-yellow-500/20 text-yellow-700",
          )}
        >
          {status}
        </div>
      )
    },
  },
  {
    accessorKey: "registeredAt",
    header: "Registered",
    cell: ({ row }) => {
      const date = new Date(row.getValue("registeredAt"))
      return <div className="text-sm text-muted-foreground">{date.toLocaleDateString()}</div>
    },
  },
  {
    accessorKey: "lastLogin",
    header: "Last Login",
    cell: ({ row }) => {
      const date = new Date(row.getValue("lastLogin"))
      return <div className="text-sm text-muted-foreground">{date.toLocaleDateString()}</div>
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const user = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-black border-red-900">
            <DropdownMenuLabel className="text-red-100">Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(user.id)}
              className="text-red-100 hover:bg-red-900/20"
            >
              Copy user ID
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-red-900" />
            <DropdownMenuItem className="text-red-100 hover:bg-red-900/20">View profile</DropdownMenuItem>
            <DropdownMenuItem className="text-red-100 hover:bg-red-900/20">Promote to admin</DropdownMenuItem>
            <DropdownMenuItem className="text-red-100 hover:bg-red-900/20">Send email</DropdownMenuItem>
            <DropdownMenuSeparator className="bg-red-900" />
            <DropdownMenuItem className="text-red-500 hover:bg-red-900/20">Suspend user</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
