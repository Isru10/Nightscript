import { type AdminUser, columns } from "./columns"
import { DataTable } from "@/components/users/data-table"

const getUserData = async (): Promise<AdminUser[]> => {
  return [
    {
      id: "user_001",
      name: "John Doe",
      email: "johndoe@gmail.com",
      role: "user",
      status: "active",
      registeredAt: "2024-01-15T10:30:00Z",
      lastLogin: "2024-01-20T14:22:00Z",
    },
    {
      id: "user_002",
      name: "Jane Smith",
      email: "janesmith@gmail.com",
      role: "admin",
      status: "verified",
      registeredAt: "2024-01-10T09:15:00Z",
      lastLogin: "2024-01-21T11:45:00Z",
    },
    {
      id: "user_003",
      name: "Mike Horror",
      email: "mikehorror@gmail.com",
      role: "user",
      status: "unverified",
      registeredAt: "2024-01-18T16:20:00Z",
      lastLogin: "2024-01-19T08:30:00Z",
    },
    {
      id: "user_004",
      name: "Sarah Nightmare",
      email: "sarahnightmare@gmail.com",
      role: "user",
      status: "active",
      registeredAt: "2024-01-12T13:45:00Z",
      lastLogin: "2024-01-21T19:15:00Z",
    },
    {
      id: "user_005",
      name: "Admin Dark",
      email: "admindark@gmail.com",
      role: "admin",
      status: "verified",
      registeredAt: "2024-01-05T12:00:00Z",
      lastLogin: "2024-01-21T20:30:00Z",
    },
    {
      id: "user_006",
      name: "Ghost Walker",
      email: "ghostwalker@gmail.com",
      role: "user",
      status: "inactive",
      registeredAt: "2024-01-08T15:30:00Z",
      lastLogin: "2024-01-15T10:20:00Z",
    },
    {
      id: "user_007",
      name: "Demon Hunter",
      email: "demonhunter@gmail.com",
      role: "user",
      status: "active",
      registeredAt: "2024-01-14T11:10:00Z",
      lastLogin: "2024-01-21T16:45:00Z",
    },
    {
      id: "user_008",
      name: "Vampire Lord",
      email: "vampirelord@gmail.com",
      role: "user",
      status: "verified",
      registeredAt: "2024-01-16T14:25:00Z",
      lastLogin: "2024-01-20T22:10:00Z",
    },
    {
      id: "user_009",
      name: "Witch Craft",
      email: "witchcraft@gmail.com",
      role: "user",
      status: "unverified",
      registeredAt: "2024-01-17T09:40:00Z",
      lastLogin: "2024-01-18T15:20:00Z",
    },
    {
      id: "user_010",
      name: "Zombie King",
      email: "zombieking@gmail.com",
      role: "admin",
      status: "active",
      registeredAt: "2024-01-03T08:15:00Z",
      lastLogin: "2024-01-21T12:30:00Z",
    },
  ]
}

const page = async () => {
  const data = await getUserData()

  const totalUsers = data.length
  const activeUsers = data.filter((user) => user.status === "active").length
  const verifiedUsers = data.filter((user) => user.status === "verified").length
  const adminUsers = data.filter((user) => user.role === "admin" || user.role === "superadmin").length

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-black border border-red-900 rounded-lg p-4">
          <h3 className="text-sm font-medium text-red-100">Total Users</h3>
          <p className="text-2xl font-bold text-red-500">{totalUsers}</p>
        </div>
        <div className="bg-black border border-red-900 rounded-lg p-4">
          <h3 className="text-sm font-medium text-red-100">Active Users</h3>
          <p className="text-2xl font-bold text-green-500">{activeUsers}</p>
        </div>
        <div className="bg-black border border-red-900 rounded-lg p-4">
          <h3 className="text-sm font-medium text-red-100">Verified Users</h3>
          <p className="text-2xl font-bold text-blue-500">{verifiedUsers}</p>
        </div>
        <div className="bg-black border border-red-900 rounded-lg p-4">
          <h3 className="text-sm font-medium text-red-100">Admin Users</h3>
          <p className="text-2xl font-bold text-orange-500">{adminUsers}</p>
        </div>
      </div>

      <div className="mb-8 px-4 py-2 bg-red-900/20 border border-red-900 rounded-md">
        <h1 className="font-semibold text-red-100">All Users Management</h1>
        <p className="text-sm text-red-300 mt-1">Manage all registered users and their permissions</p>
      </div>

      <DataTable columns={columns} data={data} />
    </div>
  )
}

export default page
