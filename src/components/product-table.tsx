"use client";

import { useEffect, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
  ColumnDef,
  VisibilityState,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IconReportSearch } from "@tabler/icons-react";

type Product = {
  id: string;
  projectName: string;
  assignedDate: string;
  pmJob: string;
  status: string;
};

const generateDummyData = (): Product[] => {
  return Array.from({ length: 40 }, (_, i) => ({
    id: `PR-${i + 1}`,
    projectName: `Project Name ${i + 1}`,
    assignedDate: `2025-01-01`,
    pmJob: `PM/Job ${i + 1}`,
    status: ["Pending", "In Progress", "Completed"][i % 3],
  }));
};

const columns: ColumnDef<Product>[] = [
  { accessorKey: "id", header: "ID" },
  { accessorKey: "projectName", header: "Project Name" },
  { accessorKey: "assignedDate", header: "Assigned Date" },
  { accessorKey: "pmJob", header: "PM/Job" },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      const getBadgeClass = (status: string) => {
        if (status === "Pending") {
          return "bg-yellow-500 text-white border-transparent";
        }
        if (status === "In Progress") {
          return "bg-blue-500 text-white border-transparent";
        }
        if (status === "Completed") {
          return "bg-secondary text-secondary-foreground border-transparent";
        }
        return "";
      };
      return (
        <Badge className={getBadgeClass(status)}>
          {status}
        </Badge>
      );
    },
  },
];

export default function ProductTable() {
  const [data, setData] = useState<Product[]>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  useEffect(() => {
    setData(generateDummyData());
  }, []);

  const table = useReactTable({
    data,
    columns,
    state: {
      globalFilter,
      columnVisibility,
    },
    onGlobalFilterChange: setGlobalFilter,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="min-h-screen flex items-center justify-center -mt-16">
      <div className="w-full  space-y-6">
        {/* Header & Search */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 max-sm:px-4 ">
          <h2 className="text-xl font-semibold tracking-tight text-black flex items-center gap-2">
            <IconReportSearch className="size-6" /> Recent Assigened Projects to
            Proultima
          </h2>
          <div className="flex gap-2">
            <Input
              placeholder="Search..."
              value={globalFilter}
              onChange={(e) => setGlobalFilter(e.target.value)}
              className="border border-gray-300 bg-white text-black placeholder-gray-500"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-auto border border-gray-300 rounded">
          <Table className="w-full table-fixed text-sm text-black">
            <TableHeader className="bg-secondary/10 font-medium">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      className="whitespace-nowrap px-2 py-3 border-r border-gray-200"
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        key={cell.id}
                        className="px-2 py-2 border-t border-gray-200 truncate"
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                          
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="text-center py-4"
                  >
                    No data found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between text-sm text-gray-600">
          <span>
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </span>
          <div className="space-x-2">
            <Button
              variant="default"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="text-gray-800 border-gray-400"
            >
              Previous
            </Button>
            <Button
              variant="default"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="text-gray-800 border-gray-400"
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
