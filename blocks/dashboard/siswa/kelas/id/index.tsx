"use client";

import React from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useClassStudent } from "@/context/service/classStudent";

/* =========================
   Helper Style Mapel
========================= */
const getStudyStyle = (name: string) => {
  const n = name.toLowerCase();
  if (n.includes("matematika"))
    return { icon: "🧮", bg: "bg-blue-600", accent: "text-blue-600" };
  if (n.includes("inggris"))
    return { icon: "EN", bg: "bg-purple-600", accent: "text-purple-600" };
  if (n.includes("indonesia"))
    return { icon: "🇮🇩", bg: "bg-red-600", accent: "text-red-600" };
  if (n.includes("ipa"))
    return { icon: "🧪", bg: "bg-green-600", accent: "text-green-600" };
  if (n.includes("ips"))
    return { icon: "🌍", bg: "bg-yellow-600", accent: "text-yellow-600" };
  return { icon: "📚", bg: "bg-gray-600", accent: "text-gray-600" };
};

export default function KelasSiswa({ params }: { params: { id: string } }) {
  const { data: session } = useSession();
  const router = useRouter();
  const { classStudents } = useClassStudent();

  const classId = Number(params.id);
  const userId = Number(session?.user?.id);

  if(!classStudents) 
  {
    return;
  }

  /* =========================
      Validasi Akses
  ========================= */
  const joinedClass = classStudents.some(
    (item: any) =>
      item.student_id === userId &&
      item.Teaching?.class_id === classId
  );

  if (!joinedClass) {
    return (
      <div className="p-10 text-center text-red-500 font-semibold">
        Anda tidak memiliki akses ke kelas ini.
      </div>
    );
  }

  /* =========================
      Ambil Mapel per Kelas
  ========================= */
  const mapelByKelas = Object.values(
    classStudents.reduce((acc: any, item: any) => {
      const teaching = item.Teaching;
      if (!teaching) return acc;
      if (teaching.class_id !== classId) return acc;

      acc[teaching.id] ??= teaching;
      return acc;
    }, {})
  );

  const pushLink = (name: string, tid: string) => {
    router.push(`/dashboard/study/${name}?tid=${tid}`);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-black mb-8 text-gray-800">
        Materi Pembelajaran Kelas #{classId}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mapelByKelas.map((teaching: any) => {
          const subjectName = `Mapel ID ${teaching.Subject.name}`;
          const style = getStudyStyle(subjectName);

          return (
            <div
              key={teaching.id}
              className="bg-white shadow-xl flex flex-col hover:scale-105 transition"
            >
              <div className={`${style.bg} p-6 text-center`}>
                <span className="text-6xl text-white">{style.icon}</span>
              </div>

              <div className="p-5 flex-grow">
                <h3 className={`text-xl font-black ${style.accent}`}>
                  {subjectName}
                </h3>

                <div className="flex gap-2 my-3">
                  <span className="badge">{teaching.tahun}</span>
                  <span className="badge">{teaching.schedule}</span>
                </div>

                <p className="text-sm">
                  Pertemuan: {teaching.Meetings?.length || 0}
                </p>
                <p className="text-xs text-gray-400">
                  Total Materi:{" "}
                  {teaching.Meetings?.reduce(
                    (t: number, m: any) => t + (m.Materials?.length || 0),
                    0
                  )}
                </p>
              </div>

              <div className="p-5">
                <button
                  onClick={() => pushLink(teaching.Subject.name, teaching.id)}
                  className={`w-full py-2 font-bold text-white ${style.bg}`}
                >
                  MULAI BELAJAR
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
