"use client";

import { useState, useEffect, useRef } from "react";
import { useSession, signOut } from "next-auth/react";
import { User, LogOut } from "lucide-react";

export default function UserNav() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!session) return null;

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      {/* 1. TRIGGER BUTTON */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        type="button"
        className="text-foreground hover:text-primary transition-colors p-2 rounded-full hover:bg-secondary/60 focus:outline-none select-none flex items-center justify-center"
      >
        <User className="w-5 h-5" />
      </button>

      {/* 2. DROPDOWN CONTENT PANEL */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 origin-top-right rounded-md border border-border bg-card p-1 text-foreground shadow-md z-50 focus:outline-none animate-in fade-in slide-in-from-top-1 duration-100">
          
          {/* USER IDENTITY HEADER */}
          <div className="px-3 py-2.5">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-semibold leading-none text-foreground">
                {session.user?.name || "Orbit User"}
              </p>
              <p className="text-xs leading-none text-muted-foreground truncate">
                {session.user?.email}
              </p>
            </div>
          </div>
          
          {/* SEPARATOR */}
          <div className="h-px bg-border my-1" />

          {/* LOGOUT BUTTON ONLY INSIDE THE DROP WINDOW */}
          <button
            onClick={() => {
              setIsOpen(false);
              signOut({ callbackUrl: "/" }); // Safe routing reset redirection path
            }}
            type="button"
            className="w-full flex items-center gap-2 rounded-sm px-3 py-2 text-sm text-destructive font-medium hover:bg-destructive/10 transition-colors text-left cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Log Out Session</span>
          </button>

        </div>
      )}
    </div>
  );
}