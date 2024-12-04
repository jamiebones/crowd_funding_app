"use client";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { usePathname } from "next/navigation";
import Link from "next/link";

const Navbar = () => {
  const pathname = usePathname();
  return (
    <header className="bg-white">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-blue-600">CrowdFund Dapp</h1>
          <div className="hidden md:flex space-x-6">
            <Link
              href="/"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                pathname === "/"
                  ? "bg-gray-900 text-white"
                  : "text-gray-600 hover:bg-gray-700 hover:text-white"
              }`}
            >
              Home
            </Link>
            <Link
              href="/dashboard"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                pathname === "/dashboard"
                  ? "bg-gray-900 text-white"
                  : "text-gray-600 hover:bg-gray-700 hover:text-white"
              }`}
            >
              Create
            </Link>

            <Link
              href="/explore"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                pathname === "/explore"
                  ? "bg-gray-900 text-white"
                  : "text-gray-600 hover:bg-gray-700 hover:text-white"
              }`}
            >
              Explore
            </Link>

            <Link
              href="/donations"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                pathname === "/donations"
                  ? "bg-gray-900 text-white"
                  : "text-gray-600 hover:bg-gray-700 hover:text-white"
              }`}
            >
              Donations
            </Link>

            <Link
              href="/user/projects"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                pathname === "/user/projects"
                  ? "bg-gray-900 text-white"
                  : "text-gray-600 hover:bg-gray-700 hover:text-white"
              }`}
            >
              Projects
            </Link>

            <Link
              href="/metrics"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                pathname === "/metrics"
                  ? "bg-gray-900 text-white"
                  : "text-gray-600 hover:bg-gray-700 hover:text-white"
              }`}
            >
              Metrics
            </Link>
          </div>
          <div className="space-x-4">
            <ConnectButton />
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
