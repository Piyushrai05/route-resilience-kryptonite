"use client";

import React, { useState } from "react";
import { Bell, Search, Globe, Shield, CheckCircle2, AlertCircle } from "lucide-react";
import { useAppStore } from "@/store/useAppStore";
import Link from "next/link";

export default function Navbar() {
  const { notifications, markNotificationsRead } = useAppStore();
  const [showNotifications, setShowNotifications] = useState(false);
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <header className="h-16 border-b border-border bg-white flex items-center justify-between px-6 z-40 select-none shadow-sm shrink-0">
      {/* Brand Logo & Name */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center text-white shadow-md shadow-primary/20">
          <Globe className="w-5 h-5 animate-pulse" />
        </div>
        <div className="flex flex-col">
          <Link href="/" className="font-heading font-semibold text-[17px] leading-tight text-text tracking-wide hover:text-primary transition-colors">
            Route Resilience
          </Link>
          <span className="text-[10px] text-muted font-numbers tracking-widest uppercase">
            AI-GIS PLATFORM (PS-10)
          </span>
        </div>
      </div>

      {/* Global Search Bar */}
      <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-background border border-border rounded-xl w-96 hover:border-primary/50 transition-colors focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/10">
        <Search className="w-4 h-4 text-muted shrink-0" />
        <input
          id="global-search"
          type="text"
          placeholder="Search coordinates, segments, datasets..."
          className="bg-transparent text-xs text-text placeholder-muted w-full focus:outline-none font-body"
        />
        <span className="text-[9px] font-numbers bg-border text-muted px-1.5 py-0.5 rounded uppercase">
          Ctrl + K
        </span>
      </div>

      {/* Action Items */}
      <div className="flex items-center gap-4">
        {/* Status Indicators */}
        <div className="hidden lg:flex items-center gap-4 text-xs font-medium mr-4 border-r border-border pr-4">
          <div className="flex items-center gap-1.5 text-success">
            <CheckCircle2 className="w-4 h-4" />
            <span>AI Core Active</span>
          </div>
          <div className="flex items-center gap-1.5 text-primary">
            <Shield className="w-4 h-4" />
            <span>GIS Engine Ready</span>
          </div>
        </div>

        {/* Notifications */}
        <div className="relative">
          <button
            id="notification-bell"
            onClick={() => {
              setShowNotifications(!showNotifications);
              if (!showNotifications) markNotificationsRead();
            }}
            className="relative p-2 text-muted hover:text-text hover:bg-background rounded-xl border border-transparent hover:border-border transition-all"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-danger rounded-full ring-2 ring-white animate-bounce" />
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-3 w-80 bg-white border border-border rounded-2xl shadow-xl py-3 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="flex items-center justify-between px-4 pb-2 border-b border-border">
                <span className="font-heading font-semibold text-xs text-text">Notifications</span>
                {unreadCount > 0 && (
                  <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-semibold">
                    {unreadCount} new
                  </span>
                )}
              </div>
              <div className="max-h-60 overflow-y-auto mt-2">
                {notifications.length === 0 ? (
                  <div className="text-center py-6 text-xs text-muted">No notifications</div>
                ) : (
                  notifications.map((item) => (
                    <div
                      key={item.id}
                      className={`flex gap-3 px-4 py-2.5 hover:bg-background transition-colors border-b border-border/50 last:border-0 ${
                        !item.read ? "bg-primary/5" : ""
                      }`}
                    >
                      <AlertCircle className={`w-4 h-4 mt-0.5 shrink-0 ${!item.read ? "text-primary" : "text-muted"}`} />
                      <div className="flex flex-col gap-0.5">
                        <span className="text-xs text-text font-body leading-normal">{item.text}</span>
                        <span className="text-[10px] text-muted font-numbers">{item.time}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* User Profile */}
        <div className="flex items-center gap-3 border-l border-border pl-4">
          <div className="w-8 h-8 rounded-full bg-accent text-white flex items-center justify-center font-heading font-semibold text-xs shadow">
            AB
          </div>
          <div className="hidden sm:flex flex-col">
            <span className="text-xs font-semibold text-text leading-tight">Admin Bharat</span>
            <span className="text-[10px] text-muted">Hackathon Comm</span>
          </div>
        </div>
      </div>
    </header>
  );
}
