"use client";

import Link from "next/link";
import { X, Box, Home } from "lucide-react";
import { useSession } from "next-auth/react";

import { useDrawerContext } from "@/context/drawer-context";
import { useTeaching } from "@/context/service/teaching";
import { useClassStudent } from "@/context/service/classStudent";

/* =========================
    MENU STATIC
   ========================= */
const generalMenu = [
  { name: "Home", ref: "/dashboard/home", icon: Home },
  // { name: "Insight", ref: "/dashboard/insight", icon: Box },
];

const master = [
  // { name: "Guru", ref: "/dashboard/guru" },
  // { name: "Siswa", ref: "/dashboard/siswa" },
  { name: "User", ref: "/dashboard/user" },
  // { name: "Kelas", ref: "/dashboard/kelas" },
  // { name: "Mata Pelajaran", ref: "/dashboard/mata-pelajaran" },
];

export default function SideDrawer({ closeDrawer }: any) {
  const { isOpen } = useDrawerContext();
  const { data: session } = useSession();
  const { teachings } = useTeaching();
  const { classStudents } = useClassStudent();

  const userGroup = session?.user?.role;

  /* =========================
      LOGIKA GURU (KELAS)
     ========================= */
  const kelasGuru = Object.values(
    (teachings ?? []).reduce((acc: any, item: any) => {
      const kelas = item.Class;
      if (!kelas) return acc;

      if (!acc[kelas.id]) {
        acc[kelas.id] = {
          id_kelas: kelas.id,
          nama_kelas: kelas.name,
          tahun: kelas.tahun,
        };
      }
      return acc;
    }, {})
  );

  /* =========================
      LOGIKA SISWA (KELAS)
     ========================= */
  const kelasSiswa = Object.values(
    (classStudents ?? []).reduce((acc: any, item: any) => {
      const kelas = item.Teaching?.Class;
      if (!kelas) return acc;

      if (!acc[kelas.id]) {
        acc[kelas.id] = {
          id: kelas.id,
          name: kelas.name,
          tahun: kelas.tahun,
        };
      }
      return acc;
    }, {})
  );

  /* =========================
      LOGIKA SISWA (MAPEL)
     ========================= */
  const mapelSiswa = Object.values(
    (classStudents ?? []).reduce((acc: any, item: any) => {
      const teaching = item.Teaching;
      if (!teaching || !teaching.Subject) return acc;

      if (!acc[teaching.id]) {
        acc[teaching.id] = {
          id: teaching.id,
          tahun: teaching.tahun,
          schedule: teaching.schedule,
          kelas: teaching.Class?.name,
          nama_mapel: teaching.Subject.name,
          kode_mapel: teaching.Subject.code,
        };
      }
      return acc;
    }, {})
  );

  return (
    <div>
      {isOpen && <div className="back-drop" onClick={closeDrawer}></div>}

      <div
        className={`side-drawer w-[80%] sm:w-[50%] md:w-[35%] lg:w-[25%] ${isOpen ? "show" : "hide"
          }`}
      >
        {/* ================= HEADER ================= */}
        <div className="flex justify-between items-center p-4 border-b bg-blue-600">
          <h1 className="text-lg text-white font-semibold tracking-widest">
            E - LEARNING
          </h1>
          <button
            className="p-1 bg-gray-200 rounded"
            onClick={closeDrawer}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="overflow-y-auto h-[calc(100vh-60px)] pb-10 text-black">
          {/* ================= GENERAL ================= */}
          <div className="p-4 text-gray-500 uppercase text-xs">General</div>
          <ul className="flex flex-col gap-1 px-6">
            {generalMenu.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.ref}>
                  <Link
                    href={item.ref}
                    onClick={closeDrawer}
                    className="flex items-center gap-3 py-2 px-2 rounded-md hover:bg-gray-100"
                  >
                    <Icon className="w-5 h-5 text-blue-600" />
                    <span>{item.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* ================= ADMIN ================= */}
          {userGroup === "admin" && (
            <>
              <div className="mt-6 p-4 text-gray-500 uppercase text-xs">
                Master
              </div>
              <ul className="flex flex-col gap-1 px-6 mb-6">
                {master.map((x) => (
                  <li key={x.ref}>
                    <Link
                      href={x.ref}
                      onClick={closeDrawer}
                      className="flex py-2 px-2 rounded-md hover:bg-gray-100"
                    >
                      {x.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          )}

          {/* ================= SISWA ================= */}
          {userGroup === "siswa" && (
            <>
              {/* KELAS */}
              <div className="mt-6 p-4 text-gray-500 uppercase text-xs">
                Kelas Saya
              </div>
              <ul className="flex flex-col gap-1 px-6 mb-6">
                {kelasSiswa.map((x: any) => (
                  <li key={x.id}>
                    <Link
                      href={`/dashboard/siswa/kelas/${x.id}`}
                      onClick={closeDrawer}
                      className="flex py-2 px-2 rounded-md hover:bg-gray-100"
                    >
                      {x.name} / {x.tahun}
                    </Link>
                  </li>
                ))}
              </ul>

              {/* MAPEL */}
              <div className="mt-6 p-4 text-gray-500 uppercase text-xs">
                Daftar Pelajaran
              </div>
              <Link href="/study" className="flex flex-col gap-1 px-6 mb-6">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Cari materi..."
                    className="input"
                    readOnly
                  />
                </div>
              </Link>
              <ul className="flex flex-col gap-1 px-6 mb-6">
                {mapelSiswa.map((item: any) => (
                  <li key={item.id}>
                    <Link
                      href={`/dashboard/study/${item.nama_mapel}?tid=${item.id}`}
                      onClick={closeDrawer}
                      className="flex py-2 px-2 rounded-md hover:bg-gray-100"
                    >
                      {item.nama_mapel} ({item.kode_mapel})
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          )}

          {/* ================= GURU ================= */}
          {userGroup === "guru" && (
            <>
              <div className="mt-6 p-4 text-gray-500 uppercase text-xs">
                <Link
                  href={'/dashboard/guru'}>
                  Daftar Kelas
                </Link>
              </div>
              <ul className="flex flex-col gap-1 px-6 mb-6">
                {kelasGuru.map((item: any) => (
                  <li key={item.id_kelas}>
                    <Link
                      href={`/dashboard/guru/kelas/${item.id_kelas}`}
                      onClick={closeDrawer}
                      className="flex py-2 px-2 rounded-md hover:bg-gray-100 font-medium"
                    >
                      {item.nama_kelas} / {item.tahun}
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
