"use client";

import { useDrawerContext } from "@/context/drawer-context";
import { User2, LogOut, Search, X, History } from "lucide-react";
import OpenDrawerButton from "../sidebar/open-drawer-button";
import { signOut, useSession } from "next-auth/react";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";

export const Header = () => {
  const { isOpen, setIsOpen } = useDrawerContext();
  const { data: session } = useSession();
  const [openMenu, setOpenMenu] = useState(false);

  // State untuk Search
  const [searchQuery, setSearchQuery] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Load history dari localStorage saat komponen mount
  useEffect(() => {
    const savedHistory = localStorage.getItem("searchHistory");
    if (savedHistory) setHistory(JSON.parse(savedHistory));

    // Menutup modal history jika klik di luar area search
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowHistory(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function toggleDrawer() {
    setIsOpen(!isOpen);
  }

  function handleLogout() {
    signOut({ callbackUrl: "/sign-in" });
  }

  // Fungsi menyimpan pencarian
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    const newHistory = [
      searchQuery,
      ...history.filter((item) => item !== searchQuery),
    ].slice(0, 5); // Simpan 5 riwayat terakhir

    setHistory(newHistory);
    localStorage.setItem("searchHistory", JSON.stringify(newHistory));
    setSearchQuery("");
    setShowHistory(false);
    // Tambahkan logika pencarian Anda di sini
  };

  // Fungsi menghapus satu item riwayat
  const deleteHistoryItem = (itemToDelete: string) => {
    const updatedHistory = history.filter((item) => item !== itemToDelete);
    setHistory(updatedHistory);
    localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));
  };

  return (
    <div className="navbar bg-blue-600 shadow-sm px-4 flex items-center justify-between h-16">
      {/* LEFT: Drawer Toggle */}
      <div className="flex-none">
        <OpenDrawerButton openDrawer={toggleDrawer} />
      </div>
      {/* RIGHT: Profile Menu */}
      <div className="">
        <button
          onClick={() => setOpenMenu(!openMenu)}
          className="flex items-center gap-2 text-white hover:bg-blue-500 px-3 py-2 rounded-md transition"
        >
          <User2 />
          <span className="hidden sm:block">
            {session?.user?.name ?? "User"}
          </span>
        </button>

        {openMenu && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border z-50">
            <div className="px-4 py-3 border-b">
              <p className="text-sm font-medium text-gray-800">
                {session?.user?.name}
              </p>
              <p className="text-xs text-gray-500 capitalize">
                {session?.user?.role}
              </p>
            </div>

            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-gray-100 transition"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};