import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import Navbar from "@/components/dashboard/navbar";
import { Toaster } from "react-hot-toast";
import { auth } from "@/auth";

// Optimize font loading by preloading only latin subset
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap", // Improve perceived performance with font-display swap
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

// Separate viewport configuration
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#ffffff",
};

// Enhanced metadata without viewport settings
export const metadata: Metadata = {
  title: "Dashboard | Your App Name",
  description: "Manage and monitor your dashboard efficiently with real-time updates and insights",
  robots: "noindex, nofollow", // Prevent indexing of dashboard pages for security
};

interface DashboardLayoutProps {
  readonly children: React.ReactNode;
}

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  // Authentication check
  const session = await auth();

  return (
    <div
      className={`
        ${geistSans.variable} 
        ${geistMono.variable} 
        font-sans 
        antialiased 
        min-h-screen 
        bg-gray-50
        flex
        flex-col
      `}
    >
      <Navbar />
      <div className="flex-1 flex">
        <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 flex gap-6">
          <main className="flex-1 bg-white">
            <div className="p-2">
              {children}
              <Toaster position="top-right" />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}