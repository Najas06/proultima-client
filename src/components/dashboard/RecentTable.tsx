import { IconReportSearch } from "@tabler/icons-react";
import React from "react";
import {
  Table,
  TableRow,
  TableFooter,
  TableCell,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
} from "../ui/table";
import ProductTable from "../product-table";

const RecentTable = () => {
  return (
    <div className="lg:px-6">
      <ProductTable />
    </div>
  );
};
export default RecentTable;

const subscriptions = [
  {
    subscriptionId: "SUB001",
    customerName: "John Doe",
    plan: "Pro",
    status: "Active",
    renewalDate: "2024-02-15",
    amount: "$49.99",
  },
  {
    subscriptionId: "SUB002",
    customerName: "Jane Smith",
    plan: "Basic",
    status: "Cancelled",
    renewalDate: "2024-01-10",
    amount: "$19.99",
  },
  {
    subscriptionId: "SUB003",
    customerName: "Michael Brown",
    plan: "Enterprise",
    status: "Pending",
    renewalDate: "2024-03-01",
    amount: "$99.99",
  },
  {
    subscriptionId: "SUB004",
    customerName: "Emily Johnson",
    plan: "Pro",
    status: "Active",
    renewalDate: "2024-02-20",
    amount: "$49.99",
  },
  {
    subscriptionId: "SUB005",
    customerName: "David Wilson",
    plan: "Basic",
    status: "Active",
    renewalDate: "2024-02-05",
    amount: "$19.99",
  },
];
