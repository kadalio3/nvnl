"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import Image from "next/image";

interface NavbarClientProps {
  session: { user: { name: string; role: string; image?: string } } | null;
}

const NavbarDashboard = ({ session }: NavbarClientProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!session?.user) return null;

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left side - Logo/Brand */}
          <div className="flex-shrink-0">
            <span className="text-xl font-bold text-gray-900">NVNL</span>
          </div>

          {/* Right side - User Menu */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center space-x-4 hover:bg-gray-50 rounded-lg p-2 transition-colors"
              aria-expanded={isOpen}
              aria-haspopup="true"
            >
              {/* User Info */}
              <div className="flex flex-col items-end">
                <span className="text-sm font-semibold text-gray-900">
                  {session.user.name}
                </span>
                <div className="flex items-center space-x-1">
                  <span className="h-2 w-2 bg-green-500 rounded-full"></span>
                  <span className="text-xs text-gray-500 capitalize">
                    {session.user.role}
                  </span>
                </div>
              </div>

              {/* Avatar */}
              <div className="relative h-10 w-10 rounded-full overflow-hidden ring-2 ring-gray-200">
                {session.user.image ? (
                  <Image
                    src={session.user.image}
                    alt={session.user.name || "User avatar"}
                    fill
                    className="object-cover"
                    priority
                  />
                ) : (
                  <div className="h-full w-full flex items-center justify-center bg-gray-100 text-gray-600 font-semibold">
                    {session.user.name?.charAt(0).toUpperCase() || "U"}
                  </div>
                )}
              </div>
            </button>

            {/* Dropdown Menu */}
            <div
              className={`
                absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5
                transform transition-all duration-200 ease-in-out z-50
                ${
                  isOpen
                    ? "opacity-100 scale-100"
                    : "opacity-0 scale-95 pointer-events-none"
                }
              `}
            >
              {/* User Details Section */}
              <Link 
                href="/profile" 
                onClick={() => setIsOpen(false)}
                className="block p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <div className="relative h-12 w-12 rounded-full overflow-hidden ring-2 ring-gray-200">
                    {session.user.image ? (
                      <Image
                        src={session.user.image}
                        alt={session.user.name || "User avatar"}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center bg-gray-100 text-gray-600 font-semibold">
                        {session.user.name?.charAt(0).toUpperCase() || "U"}
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      {session.user.name}
                    </p>
                    <p className="text-xs text-gray-500 capitalize">
                      {session.user.role}
                    </p>
                  </div>
                </div>
              </Link>

              {/* Menu Items */}
              <div className="py-1">
                <button
                  onClick={() => signOut({ callbackUrl: "/login" })}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors flex items-center space-x-2"
                >
                  <svg
                    className="h-5 w-5 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavbarDashboard;
