"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Brain,
  Network,
  ShieldAlert,
  FileSpreadsheet,
  Settings,
  HelpCircle,
  Activity
} from "lucide-react";

interface SidebarItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
}

export default function Sidebar() {
  const pathname = usePathname();

  const primaryItems: SidebarItem[] = [
    {
      name: "Dashboard",
      href: "/",
      icon: LayoutDashboard,
      description: "Overview & Quick Upload"
    },
    {
      name: "AI Road Extraction",
      href: "/extraction",
      icon: Brain,
      description: "Satellite Road Segmentation"
    },
    {
      name: "Graph Construction",
      href: "/graph",
      icon: Network,
      description: "Skeleton & Topology Repair"
    },
    {
      name: "Criticality & Simulation",
      href: "/simulation",
      icon: ShieldAlert,
      description: "Disaster Bottlenecks & Routing"
    },
    {
      name: "Reports",
      href: "/reports",
      icon: FileSpreadsheet,
      description: "Analytics & PDF/CSV Export"
    }
  ];

  const secondaryItems = [
    { name: "System Settings", href: "#", icon: Settings },
    { name: "Documentation", href: "#", icon: HelpCircle }
  ];

  return (
    <aside className="w-64 border-r border-border bg-white flex flex-col justify-between h-full select-none shrink-0 shadow-sm z-30">
      {/* Primary Links */}
      <div className="flex flex-col gap-1 p-4">
        <div className="px-3 pb-3 border-b border-border/60 mb-2">
          <span className="text-[10px] font-bold text-muted uppercase tracking-widest font-numbers">
            Navigation Menu
          </span>
        </div>
        {primaryItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-3.5 rounded-xl transition-all group relative ${
                isActive
                  ? "bg-primary text-white shadow-md shadow-primary/10"
                  : "text-muted hover:text-text hover:bg-background"
              }`}
            >
              <Icon className={`w-5 h-5 shrink-0 ${isActive ? "text-white" : "text-muted group-hover:text-primary transition-colors"}`} />
              <div className="flex flex-col">
                <span className="text-xs font-semibold leading-normal font-heading">
                  {item.name}
                </span>
                <span className={`text-[9px] ${isActive ? "text-white/70" : "text-muted"}`}>
                  {item.description}
                </span>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Footer System Status / Secondary Links */}
      <div className="p-4 border-t border-border flex flex-col gap-3">
        <div className="flex flex-col gap-1">
          {secondaryItems.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.name}
                href={item.href}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold text-muted hover:text-text hover:bg-background transition-all"
              >
                <Icon className="w-4 h-4" />
                <span>{item.name}</span>
              </a>
            );
          })}
        </div>

        {/* Live Engine Info */}
        <div className="p-3 bg-background rounded-xl border border-border flex flex-col gap-1.5">
          <div className="flex items-center justify-between text-[9px] font-numbers text-muted">
            <span>NETWORK LOAD</span>
            <span className="text-primary font-bold">18.4%</span>
          </div>
          <div className="w-full bg-border h-1 rounded-full overflow-hidden">
            <div className="bg-primary h-full rounded-full" style={{ width: "18.4%" }} />
          </div>
          <div className="flex items-center gap-1.5 text-[9px] font-medium text-success mt-0.5">
            <span className="w-1.5 h-1.5 bg-success rounded-full animate-ping" />
            <span>GIS Websocket Connected</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
