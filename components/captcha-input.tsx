"use client";

import { useState, useCallback } from "react";
import { RefreshCcw } from "lucide-react";
import Image from "next/image";

export default function CaptchaInput({ register, errors }: any) {
  const [imgUrl, setImgUrl] = useState(`/api/captcha?ts=${Date.now()}`);
  const [loading, setLoading] = useState(false);

  const refresh = useCallback(() => {
    setLoading(true);
    const newUrl = `/api/captcha?ts=${Date.now()}`;
    setImgUrl(newUrl);

    // sedikit delay agar loading animation terasa
    setTimeout(() => setLoading(false), 300);
  }, []);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-3">
        <div className="relative w-[200px] h-[80px] border bg-white flex items-center justify-center">
          {loading && (
            <div className="absolute inset-0 bg-white/60 flex items-center justify-center text-gray-600 text-sm">
              loading...
            </div>
          )}

          <Image
            key={imgUrl} 
            src={imgUrl}
            alt="captcha"
            width={200}
            height={80}
            className="object-contain"
          />
        </div>

        <button
          type="button"
          onClick={refresh}
          aria-label="Refresh captcha"
          className="p-2 rounded hover:bg-gray-200 transition"
        >
          <RefreshCcw className="w-5 h-5" />
        </button>
      </div>

      <input
        type="text"
        placeholder="Masukkan kode pada gambar"
        {...register("captcha", { required: "Captcha wajib diisi" })}
        className="input"
      />

      {errors.captcha && (
        <span className="text-red-500 text-sm">
          {errors.captcha.message}
        </span>
      )}
    </div>
  );
}
