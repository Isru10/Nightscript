import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { connectDB } from "@/lib/connectDB"
import User from "@/models/User"
import { redirect } from "next/navigation"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import CardList from "@/components/CardList"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { BadgeCheck, Shield, Crown, UserIcon, Skull } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import EditUser from "@/components/EditUser"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import AppLineChart from "@/components/AppLineChart"
/* eslint-disable @typescript-eslint/no-explicit-any */

const page = async ({ params }: { params: { user: string } }) => {
  const session = await getServerSession(authOptions)

  // if (!session || session.user.role !== "superadmin") {
  //   redirect("/auth/signin")
  // }

  await connectDB()
  const userData = await User.findById(params.user).lean()

  if (!userData) {
    redirect("/super_admin/users_management")
  }

  const userDoc = userData as any

  const user = {
    id: userDoc._id.toString(),
    name: userDoc.name || "",
    email: userDoc.email || "",
    role: userDoc.role || "user",
    emailVerified: userDoc.emailVerified || false,
    createdAt: userDoc.createdAt || new Date(),
  }

  const isOwnProfile = session?.user.email === user.email

  const profileFields = [user.name, user.email, user.emailVerified]
  const completedFields = profileFields.filter(Boolean).length
  const profileCompletion = Math.round((completedFields / profileFields.length) * 100)

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "superadmin":
        return { icon: Crown, color: "bg-red-500/30 border-red-500/50", label: "Super Admin" }
      case "admin":
        return { icon: Shield, color: "bg-orange-500/30 border-orange-500/50", label: "Admin" }
      default:
        return { icon: UserIcon, color: "bg-gray-500/30 border-gray-500/50", label: "User" }
    }
  }

  const roleBadge = getRoleBadge(user.role)

  return (
    <div className="bg-black text-red-100 min-h-screen p-6">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/super_admin" className="text-red-400 hover:text-red-300">
              Super Admin Dashboard
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator className="text-red-600" />
          <BreadcrumbItem>
            <BreadcrumbLink href="/super_admin/users_management" className="text-red-400 hover:text-red-300">
              Users Management
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator className="text-red-600" />
          <BreadcrumbItem>
            <BreadcrumbPage className="text-red-200">{user.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="mt-4 flex flex-col xl:flex-row gap-8">
        {/* left */}
        <div className="w-full xl:w-1/3 space-y-6">
          <div className="bg-gray-900 border border-red-900/50 p-4 rounded-lg">
            <h1 className="text-xl font-semibold text-red-400 flex items-center gap-2">
              <Skull size={20} />
              User Status
            </h1>
            <div className="flex gap-4 mt-4">
              <HoverCard>
                <HoverCardTrigger>
                  <BadgeCheck
                    size={36}
                    className={`rounded-full p-2 ${user.emailVerified ? "bg-green-500/30 border border-green-500/50" : "bg-red-500/30 border border-red-500/50"}`}
                  />
                </HoverCardTrigger>
                <HoverCardContent className="bg-gray-800 border-red-900/50">
                  <h1 className="font-bold mb-2 text-red-400">
                    {user.emailVerified ? "Verified User" : "Unverified User"}
                  </h1>
                  <p className="text-sm text-red-200">
                    {user.emailVerified ? "Email has been verified" : "Email verification pending"}
                  </p>
                </HoverCardContent>
              </HoverCard>

              <HoverCard>
                <HoverCardTrigger>
                  <roleBadge.icon size={36} className={`rounded-full p-2 ${roleBadge.color}`} />
                </HoverCardTrigger>
                <HoverCardContent className="bg-gray-800 border-red-900/50">
                  <h1 className="font-bold mb-2 text-red-400">{roleBadge.label}</h1>
                  <p className="text-sm text-red-200">User role in the horror platform</p>
                </HoverCardContent>
              </HoverCard>
            </div>
          </div>

          <div className="bg-gray-900 border border-red-900/50 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-semibold text-red-400">User Information</h1>
              <Sheet>
                <SheetTrigger asChild>
                  <Button className="bg-red-600 hover:bg-red-700 text-white">Edit User</Button>
                </SheetTrigger>
                <EditUser userId={params.user} isOwnProfile={isOwnProfile} />
              </Sheet>
            </div>

            <div className="space-y-4 mt-4">
              <div className="flex flex-col gap-2 mb-8">
                <p className="text-sm text-red-300">Profile Completion</p>
                <Progress value={profileCompletion} className="bg-gray-800" />
              </div>

              <div className="flex items-center gap-2">
                <span className="font-bold text-red-400">Name:</span>
                <span className="text-red-100">{user.name}</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="font-bold text-red-400">Email:</span>
                <span className="text-red-100">{user.email}</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="font-bold text-red-400">Role:</span>
                <Badge
                  className={`${user.role === "superadmin" ? "bg-red-600" : user.role === "admin" ? "bg-orange-600" : "bg-gray-600"} text-white`}
                >
                  {user.role}
                </Badge>
              </div>

              <div className="flex items-center gap-2">
                <span className="font-bold text-red-400">Email Verified:</span>
                <Badge className={user.emailVerified ? "bg-green-600" : "bg-red-600"}>
                  {user.emailVerified ? "Verified" : "Pending"}
                </Badge>
              </div>
            </div>

            <p className="text-sm text-red-300 mt-4">Joined on {new Date(user.createdAt).toLocaleDateString()}</p>
          </div>

          <div className="bg-gray-900 border border-red-900/50 p-4 rounded-lg">
            <CardList title="Recent Activity" />
          </div>
        </div>

        {/* right */}
        <div className="w-full xl:w-2/3 space-y-6">
          <div className="bg-gray-900 border border-red-900/50 p-4 rounded-lg space-y-2">
            <div className="flex items-center gap-2">
              <Avatar className="size-12 border-2 border-red-600">
                <AvatarImage src="/placeholder.svg" alt={user.name} />
                <AvatarFallback className="bg-red-600 text-white">{user.name?.charAt(0)?.toUpperCase()}</AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-xl font-semibold text-red-400">{user.name}</h1>
                <p className="text-sm text-red-300">{user.email}</p>
              </div>
            </div>
            <p className="text-sm text-red-200">
              {isOwnProfile ? "Your super admin profile" : `Managing user: ${user.name}`}
            </p>
          </div>

          <div className="bg-gray-900 border border-red-900/50 p-4 rounded-lg">
            <h1 className="text-xl font-semibold text-red-400">User Activity</h1>
            <AppLineChart />
          </div>
        </div>
      </div>
    </div>
  )
}

export default page
