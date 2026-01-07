"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const time = now.toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  const date = now.toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-blue-600 text-white shadow-xl p-6 w-full max-w-md">
        <p className="text-sm opacity-80">Selamat datang</p>

        <h1 className="text-2xl font-bold mt-1">
          {session?.user?.name}
        </h1>

        <div className="mt-4 border-t border-white/30 pt-4 flex items-center justify-between">
          <div>
            <p className="text-xs opacity-80">Tanggal</p>
            <p className="text-sm font-medium">{date}</p>
          </div>

          <div className="text-right">
            <p className="text-xs opacity-80">Waktu</p>
            <p className="text-xl font-mono font-bold tracking-wider">
              {time}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
