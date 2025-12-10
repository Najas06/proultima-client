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


