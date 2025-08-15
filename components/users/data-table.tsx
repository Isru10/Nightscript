"use client"

import {
  type ColumnDef,
  type ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type SortingState,
  useReactTable,
} from "@tanstack/react-table"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DataTablePagination } from "@/components/TablePagination"
import { useState } from "react"
import { IoSearch, IoClose } from "react-icons/io5"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function DataTable<TData, TValue>({ columns, data }: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [rowSelection, setRowSelection] = useState({})

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(), // Added filtering functionality
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters, // Added column filters state
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters, // Added column filters to state
      rowSelection,
    },
  })

  const clearFilters = () => {
    setColumnFilters([])
  }

  return (
    <div className="space-y-4">
      <div className="bg-gray-900 p-4 rounded-lg border border-red-900/20">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-red-100">Filter Users</h3>
          <Button
            variant="outline"
            size="sm"
            onClick={clearFilters}
            className="border-red-800 text-red-100 hover:bg-red-900/20 bg-transparent"
          >
            <IoClose className="w-4 h-4 mr-2" />
            Clear Filters
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Name Filter */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-red-200">Name</label>
            <div className="relative">
              <IoSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Filter by name..."
                value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
                onChange={(event) => table.getColumn("name")?.setFilterValue(event.target.value)}
                className="pl-10 bg-gray-800 border-gray-700 text-red-100"
              />
            </div>
          </div>

          {/* Email Filter */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-red-200">Email</label>
            <div className="relative">
              <IoSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Filter by email..."
                value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
                onChange={(event) => table.getColumn("email")?.setFilterValue(event.target.value)}
                className="pl-10 bg-gray-800 border-gray-700 text-red-100"
              />
            </div>
          </div>

          {/* Status Filter */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-red-200">Status</label>
            <Select
              value={(table.getColumn("status")?.getFilterValue() as string) ?? ""}
              onValueChange={(value) => table.getColumn("status")?.setFilterValue(value === "all" ? "" : value)}
            >
              <SelectTrigger className="bg-gray-800 border-gray-700 text-red-100">
                <SelectValue placeholder="All statuses" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="verified">Verified</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Role Filter */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-red-200">Role</label>
            <Select
              value={(table.getColumn("role")?.getFilterValue() as string) ?? ""}
              onValueChange={(value) => table.getColumn("role")?.setFilterValue(value === "all" ? "" : value)}
            >
              <SelectTrigger className="bg-gray-800 border-gray-700 text-red-100">
                <SelectValue placeholder="All roles" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="user">User</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="superadmin">Super Admin</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Registration Date Filter */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-red-200">Registration Date</label>
            <Input
              type="date"
              value={(table.getColumn("registeredAt")?.getFilterValue() as string) ?? ""}
              onChange={(event) => table.getColumn("registeredAt")?.setFilterValue(event.target.value)}
              className="bg-gray-800 border-gray-700 text-red-100"
            />
          </div>

          {/* Last Login Filter */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-red-200">Last Login</label>
            <Input
              type="date"
              value={(table.getColumn("lastLogin")?.getFilterValue() as string) ?? ""}
              onChange={(event) => table.getColumn("lastLogin")?.setFilterValue(event.target.value)}
              className="bg-gray-800 border-gray-700 text-red-100"
            />
          </div>
        </div>
      </div>

      <div className="rounded-md border border-red-900/20">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        <DataTablePagination table={table} />
      </div>
    </div>
  )
}
