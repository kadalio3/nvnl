"use client"

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HomeIcon, UserIcon, Cog6ToothIcon, QuestionMarkCircleIcon, ArrowLeftOnRectangleIcon } from "@heroicons/react/24/outline";

interface NavItem {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const navItems: NavItem[] = [
  { href: "/dashboard", label: "Home", icon: HomeIcon },
  { href: "/dashboard/profile", label: "Profile", icon: UserIcon },
  { href: "/dashboard/settings", label: "Settings", icon: Cog6ToothIcon },
  { href: "/dashboard/help", label: "Help", icon: QuestionMarkCircleIcon },
];

const Sidebar = () => {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <aside className="h-[calc(100vh-2rem)] bg-white shadow-lg rounded-lg overflow-hidden flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-center h-16 border-b border-gray-200">
        <h1 className="text-xl font-bold text-gray-800">Dashboard</h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1" aria-label="Sidebar Navigation">
        {navItems.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={`
              flex items-center px-3 py-2 rounded-md text-sm font-medium
              transition-colors duration-150 ease-in-out
              ${isActive(href)
                ? "bg-blue-50 text-blue-700"
                : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
              }
            `}
            aria-current={isActive(href) ? "page" : undefined}
          >
            <Icon className={`h-5 w-5 mr-3 ${isActive(href) ? "text-blue-700" : "text-gray-400"}`} aria-hidden="true" />
            {label}
          </Link>
        ))}
      </nav>

      {/* Logout Button */}
      <div className="border-t border-gray-200 p-3">
        <Link
          href="/logout"
          className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors duration-150 ease-in-out"
        >
          <ArrowLeftOnRectangleIcon className="h-5 w-5 mr-3" aria-hidden="true" />
          Logout
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;