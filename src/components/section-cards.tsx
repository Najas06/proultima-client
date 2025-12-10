import {
  IconDashboard,
  IconReportSearch,
  IconTrendingDown,
  IconTrendingUp,
} from "@tabler/icons-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import {
  ArrowRightIcon,
  Building2Icon,
  ChartLineIcon,
  ClipboardIcon,
  Clock6,
} from "lucide-react";
import ProjectAllocation from "./dashboard/ProjectAllocation";

export function SectionCards() {
  return (
    <div className="bg-section bg-cover bg-center mx-2 p-4 rounded-lg">
      <div className="my-3 flex justify-between items-center">
        <h2 className="text-2xl font-semibold tracking-tight text-slate-100 flex items-center gap-2">
          <IconDashboard className="size-6" />Client Dashboard
        </h2>
        <ProjectAllocation />
      </div>
      <div className="grid grid-cols-1 gap-4   @xl/main:grid-cols-2 @5xl/main:grid-cols-4 ">
        <Card className="border-none shadow-none">
          <CardHeader>
            <CardDescription className="flex items-center gap-2">
              <Building2Icon className="size-4" /> Total Projects
            </CardDescription>
            <CardTitle className="text-5xl font-semibold tabular-nums">
              5
            </CardTitle>
            <CardAction></CardAction>
          </CardHeader>
          <CardFooter className="flex-col items-start  gap-1.5 text-sm">
            <div className="line-clamp-1 flex gap-2 font-medium">
              Last updated {new Date().toLocaleDateString()}
            </div>
            <Link
              href="/projects"
              className="flex items-center text-secondary hover:text-primary gap-2"
            >
              View All Projects <ArrowRightIcon className="size-4" />
            </Link>
          </CardFooter>
        </Card>
        <Card className="border-none shadow-none">
          <CardHeader>
            <CardDescription className="flex items-center gap-2">
              <ClipboardIcon className="size-4" />
              Detailing In Progress
            </CardDescription>
            <CardTitle className="text-5xl font-semibold tabular-nums">
              3
            </CardTitle>
            <CardAction></CardAction>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1.5 text-sm">
            <div className="line-clamp-1 flex gap-2 font-medium">
              Last updated {new Date().toLocaleDateString()}
            </div>
            <Link
              href="/projects"
              className="flex items-center text-secondary hover:text-primary gap-2"
            >
              View All Projects <ArrowRightIcon className="size-4" />
            </Link>
          </CardFooter>
        </Card>

        <Card className="border-none shadow-none">
          <CardHeader>
            <CardDescription className="flex items-center gap-2">
              <Clock6 className="size-4" /> Revision In Progress
            </CardDescription>
            <CardTitle className="text-5xl font-semibold tabular-nums">
              2
            </CardTitle>
            <CardAction></CardAction>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1.5 text-sm">
            <div className="line-clamp-1 flex gap-2 font-medium">
              Last updated {new Date().toLocaleDateString()}
            </div>
            <Link
              href="/projects"
              className="flex items-center text-secondary hover:text-primary gap-2"
            >
              View All Projects <ArrowRightIcon className="size-4" />
            </Link>
          </CardFooter>
        </Card>
        <Card className="border-none shadow-none">
          <CardHeader>
            <CardDescription className="flex items-center gap-2">
              <ChartLineIcon className="size-4" /> Release In Progress
            </CardDescription>
            <CardTitle className="text-5xl font-semibold tabular-nums">
              2
            </CardTitle>
            <CardAction></CardAction>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1.5 text-sm">
            <div className="line-clamp-1 flex gap-2 font-medium">
              Last updated {new Date().toLocaleDateString()}
            </div>
            <Link
              href="/projects"
              className="flex items-center text-secondary hover:text-primary gap-2"
            >
              View All Projects <ArrowRightIcon className="size-4" />
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
