import { AppSidebar } from "@/components/app-sidebar";
import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { DataTable } from "@/components/data-table";
import { SectionCards } from "@/components/section-cards";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import data from "./data.json";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Box, Calendar } from "lucide-react";
import RecentTable from "@/components/dashboard/RecentTable";
import RecentTableComponent from "@/components/dashboard/RecentTable";
import ProjectHistory from "@/components/dashboard/ProjectHistory";

export default function Page() {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader title="User Name" />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              {/* 4 cards here */}
              <SectionCards />
              <div className="grid grid-cols-1 gap-4 px-4 lg:px-6 @xl/main:grid-cols-2 ">
                {/* 1st card */}
                <Card className="border-none bg-secondary/10 shadow-none">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Box className="size-4" /> Yet to be Detailed from
                      Proultima
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-2 text-2xl font-semibold tabular-nums">
                        1500 Tons
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        Total weight of the project
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-none bg-secondary/10 shadow-none">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="size-4" /> Next Job Availability
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-2 text-2xl font-semibold tabular-nums">
                        05/12/2025
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        Next job availability date
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              {/* Recent Table */}
              <RecentTableComponent />
              {/* Project History  */}
              <ProjectHistory/>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
