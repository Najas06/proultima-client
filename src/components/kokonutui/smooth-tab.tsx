"use client";

/**
 * @author: @dorian_baffier
 * @description: Smooth Tab
 * @version: 1.0.0
 * @date: 2025-06-26
 * @license: MIT
 * @website: https://kokonutui.com
 * @github: https://github.com/kokonut-labs/kokonutui
 */

import * as React from "react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";
import { Building, Building2, DollarSign, User, type LucideIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Badge } from "../ui/badge";

interface TabItem {
  id: string;
  title: string;
  icon?: LucideIcon;
  color: string;
  project_manager?: string;
  contracter?: string;
  description?: string;
  estimated_tons?: number;
  total_cost?: number;
  status?: string;
}

const WaveformPath = () => (
  <motion.path
    d="M0 50 
           C 20 40, 40 30, 60 50
           C 80 70, 100 60, 120 50
           C 140 40, 160 30, 180 50
           C 200 70, 220 60, 240 50
           C 260 40, 280 30, 300 50
           C 320 70, 340 60, 360 50
           C 380 40, 400 30, 420 50
           L 420 100 L 0 100 Z"
    initial={false}
    animate={{
      x: [0, 10, 0],
      transition: {
        duration: 5,
        ease: "linear",
        repeat: Number.POSITIVE_INFINITY,
      },
    }}
  />
);

const DEFAULT_TABS: TabItem[] = [
  {
    id: "Project 1",
    title: "Commercial Complex Alpha",
    project_manager: "Raj",
    contracter: "ABC Construction",
    color: "bg-blue-500 hover:bg-blue-600",
    description: "Project 1 description",
    estimated_tons: 1000,
    total_cost: 1000000,
    status: "Active",
  },
  {
    id: "Project 2",
    title: "Industrial Facility Beta",
    color: "bg-purple-500 hover:bg-purple-600",
    description: "Project 2 description",
    estimated_tons: 2000,
    total_cost: 2000000,
    project_manager: "Raj",
    contracter: "ABC Construction",
    status: "Active",
  },
  {
    id: "Project 3",
    title: "Warehouse Gamma",
    color: "bg-emerald-500 hover:bg-emerald-600",
    description: "Project 3 description",
    estimated_tons: 3000,
    total_cost: 3000000,
    project_manager: "Raj",
    contracter: "ABC Construction",
    status: "Active",
  },
  {
    id: "Project 4",
    title: "Residential Complex Delta",
    color: "bg-amber-500 hover:bg-amber-600",
    description: "Project 4 description",
    estimated_tons: 4000,
    total_cost: 4000000,
    project_manager: "Raj",
    contracter: "ABC Construction",
    status: "Active",
  },
];

interface SmoothTabProps {
  items?: TabItem[];
  defaultTabId?: string;
  className?: string;
  activeColor?: string;
  onChange?: (tabId: string) => void;
}

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? "100%" : "-100%",
    opacity: 0,
    filter: "blur(8px)",
    scale: 0.95,
    position: "absolute" as const,
  }),
  center: {
    x: 0,
    opacity: 1,
    filter: "blur(0px)",
    scale: 1,
    position: "absolute" as const,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? "100%" : "-100%",
    opacity: 0,
    filter: "blur(8px)",
    scale: 0.95,
    position: "absolute" as const,
  }),
};

const transition = {
  duration: 0.4,
  ease: [0.32, 0.72, 0, 1],
};

export default function SmoothTab({
  items = DEFAULT_TABS,
  defaultTabId = DEFAULT_TABS[0].id,
  className,
  activeColor = "bg-[#1F9CFE]",
  onChange,
}: SmoothTabProps) {
  const [selected, setSelected] = React.useState<string>(defaultTabId);
  const [direction, setDirection] = React.useState(0);
  const [dimensions, setDimensions] = React.useState({ width: 0, left: 0 });

  // Reference for the selected button
  const buttonRefs = React.useRef<Map<string, HTMLButtonElement>>(new Map());
  const containerRef = React.useRef<HTMLDivElement>(null);

  // Update dimensions whenever selected tab changes or on mount
  React.useLayoutEffect(() => {
    const updateDimensions = () => {
      const selectedButton = buttonRefs.current.get(selected);
      const container = containerRef.current;

      if (selectedButton && container) {
        const rect = selectedButton.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();

        setDimensions({
          width: rect.width,
          left: rect.left - containerRect.left,
        });
      }
    };

    // Initial update
    requestAnimationFrame(() => {
      updateDimensions();
    });

    // Update on resize
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, [selected]);

  const handleTabClick = (tabId: string) => {
    const currentIndex = items.findIndex((item) => item.id === selected);
    const newIndex = items.findIndex((item) => item.id === tabId);
    setDirection(newIndex > currentIndex ? 1 : -1);
    setSelected(tabId);
    onChange?.(tabId);
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLButtonElement>,
    tabId: string
  ) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleTabClick(tabId);
    }
  };

  const selectedItem = items.find((item) => item.id === selected);

  return (
    <div className="flex flex-col h-full">
      <div
        ref={containerRef}
        role="tablist"
        aria-label="Smooth tabs"
        className={cn(
          "flex items-center justify-start gap-1 py-1 mt-auto relative",
          "bg-background w-full mx-auto my-5 text-black",
          "border-none rounded-xl",
          "transition-all duration-200",
          className
        )}
      >
        {/* Sliding Background */}
        <motion.div
          className={cn(
            "absolute rounded-lg z-[1] border-none w-full",
            selectedItem?.color || activeColor
          )}
          initial={false}
          animate={{
            width: dimensions.width - 8,
            x: dimensions.left + 4,
            opacity: 1,
          }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 30,
          }}
          style={{ height: "calc(100% - 8px)", top: "4px" }}
        />

        <div className="grid grid-cols-4 w-full gap-1 relative z-[2]">
          {items.map((item) => {
            const isSelected = selected === item.id;
            return (
              <motion.button
                key={item.id}
                ref={(el) => {
                  if (el) buttonRefs.current.set(item.id, el);
                  else buttonRefs.current.delete(item.id);
                }}
                type="button"
                role="tab"
                aria-selected={isSelected}
                aria-controls={`panel-${item.id}`}
                id={`tab-${item.id}`}
                tabIndex={isSelected ? 0 : -1}
                onClick={() => handleTabClick(item.id)}
                onKeyDown={(e) => handleKeyDown(e, item.id)}
                className={cn(
                  "relative flex items-center justify-center gap-0.5 rounded-lg px-2 py-1.5",
                  "text-sm font-medium transition-all duration-300",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  "truncate",
                  isSelected
                    ? "text-black"
                    : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                )}
              >
                <span className="truncate">{item.title}</span>
              </motion.button>
            );
          })}
        </div>
      </div>
      {/* Card Content Area */}
      <div className="flex-1 mb-4 relative">
        <div className="bg-secondary/10 border-none rounded-lg  w-full relative p-4 ">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                {selectedItem?.title}{" "}
                <Badge
                  className={cn(
                    selectedItem
                      ? selectedItem.color
                      : "bg-blue-500 hover:bg-blue-600"
                  )}
                >
                  {selectedItem?.status}
                </Badge>
              </CardTitle>
              <CardDescription>{selectedItem?.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                <div className="flex flex-col gap-2">
                  <p className="flex gap-2 items-center"><User className="w-4 h-4" /> Project Manager</p>
                  <p>{selectedItem?.project_manager}</p>
                </div>
                <div className="flex flex-col gap-2">
                  <p className="flex gap-2 items-center"><Building className="w-4 h-4" /> Contracter</p>
                  <p>{selectedItem?.contracter}</p>
                </div>
                <div className="flex flex-col gap-2">
                  <p className="flex gap-2 items-center"><Building2 className="w-4 h-4" /> Estimated Tons</p>
                  <p>{selectedItem?.estimated_tons}</p>
                </div>
                <div className="flex flex-col gap-2">
                  <p className="flex gap-2 items-center"><DollarSign className="w-4 h-4" /> Total Cost</p>
                  <p>{selectedItem?.total_cost}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
        </div>
      </div>

      {/* Bottom Toolbar */}
    </div>
  );
}
