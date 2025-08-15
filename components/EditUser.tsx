"use client"
import type React from "react"
import { useState } from "react"
import { SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Skull } from "lucide-react"

interface EditUserProps {
  userId: string
  isOwnProfile: boolean
}

const EditUser = ({ userId, isOwnProfile }: EditUserProps) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "user",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log("[v0] Updating user:", formData)
  }

  return (
    <SheetContent className="bg-gray-900 border-red-900/50 text-red-100">
      <SheetHeader>
        <SheetTitle className="text-red-400 flex items-center gap-2">
          <Skull size={20} />
          {isOwnProfile ? "Edit Your Profile" : "Edit User"}
        </SheetTitle>
        <SheetDescription className="text-red-300">
          {isOwnProfile
            ? "Update your profile information. Note: You cannot change your own role."
            : "Update user information and manage their role."}
        </SheetDescription>
      </SheetHeader>

      <form onSubmit={handleSubmit} className="space-y-6 mt-6">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-red-400">
            Name
          </Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="bg-gray-800 border-red-900/50 text-red-100 focus:border-red-500"
            placeholder="Enter name"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="text-red-400">
            Email
          </Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="bg-gray-800 border-red-900/50 text-red-100 focus:border-red-500"
            placeholder="Enter email"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="role" className="text-red-400">
            Role
          </Label>
          {isOwnProfile ? (
            <div className="flex items-center gap-2">
              <Badge className="bg-red-600 text-white">superadmin</Badge>
              <span className="text-sm text-red-300">You cannot change your own role</span>
            </div>
          ) : (
            <Select value={formData.role} onValueChange={(value) => setFormData({ ...formData, role: value })}>
              <SelectTrigger className="bg-gray-800 border-red-900/50 text-red-100">
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-red-900/50">
                <SelectItem value="user" className="text-red-100">
                  User
                </SelectItem>
                <SelectItem value="admin" className="text-red-100">
                  Admin
                </SelectItem>
                <SelectItem value="superadmin" className="text-red-100">
                  Super Admin
                </SelectItem>
              </SelectContent>
            </Select>
          )}
        </div>

        <div className="flex gap-2 pt-4">
          <Button type="submit" className="bg-red-600 hover:bg-red-700 text-white flex-1">
            Save Changes
          </Button>
          <Button
            type="button"
            variant="outline"
            className="border-red-900/50 text-red-400 hover:bg-red-900/20 bg-transparent"
          >
            Cancel
          </Button>
        </div>
      </form>
    </SheetContent>
  )
}

export default EditUser
