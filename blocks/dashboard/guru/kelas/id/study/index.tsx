"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useTeaching } from "@/context/service/teaching";
import { useModalContext } from "@/context/modal-context";

import OpenModalButton from "@/blocks/dashboard/study/pertemuan/open-modal";

import {
  Lock,
  Settings,
  Trash2,
  Plus,
} from "lucide-react";

import swal from "sweetalert2";
import OpenModalButtonPertemuan from "./modal/open-modal";
import { useMeeting } from "@/context/service/meeting";
import { useMaterial } from "@/context/service/material";

interface PageProps {
  params: {
    id: string;     // class_id
    teaching_id: string;  // subject_id
  };
}

export default function StudyKelas({ params }: PageProps) {
  const { data: session } = useSession();
  const { teachings, isOpenMeet, setIsOpenMeet, setTeachingId } = useMeeting();
  const { handleDeleteMateri } = useMaterial();
  const { isOpen, setIsOpen } = useModalContext()
  const { setActiveMeetingId } = useMaterial()
  const idGuru = Number(session?.user?.id);
  const idKelas = Number(params.id);

  const toggleModalPertemuan = (idTeaching: number) => {
    setTeachingId(idTeaching)
    setIsOpenMeet(!isOpenMeet);
  }

  return (
    <div className="p-4 space-y-6">
      {/* ================= HEADER ================= */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">
          {teachings?.Subject?.name ?? "Mata Pelajaran"}
          <span className="text-sm text-gray-500 ml-2">
            ({teachings?.Class?.name})
          </span>
        </h2>

        <div className="pt-2">
          <OpenModalButtonPertemuan openDrawer={() => toggleModalPertemuan(teachings.id)} />
        </div>
      </div>

      {/* ================= LIST PERTEMUAN ================= */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {teachings.Meetings?.map((p: any, index: number) => (
          <div
            key={p.id}
            className="border p-4 bg-white shadow-sm space-y-3"
          >
            {/* Header Pertemuan */}
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-lg">
                Pertemuan {index + 1}
              </h3>

              <div className="flex gap-3 text-gray-600">
                <button className="hover:text-black">
                  <Lock size={18} />
                </button>
                <button className="hover:text-black">
                  <Settings size={18} />
                </button>
              </div>
            </div>

            <div className="text-sm text-gray-600">{p.title}</div>

            {/* ================= MATERI ================= */}
            {p.Materials?.length === 0 && (
              <p className="text-gray-500 italic text-sm">
                Belum ada materi.
              </p>
            )}

            {p.Materials?.map((m: any) => (
              <div
                key={m.id}
                className="border-b py-2 flex justify-between items-center"
              >
                <div>
                  <div className="text-sm font-medium">{m.title}</div>
                  <span
                    className={`inline-block mt-1 px-2 py-0.5 text-xs text-white rounded ${m.type === "teori"
                      ? "bg-green-600"
                      : "bg-purple-600"
                      }`}
                  >
                    {m.type.toUpperCase()}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <a
                    href={`/materi?mid=${m.id}`}
                    className="text-blue-600 text-sm hover:underline"
                  >
                    Buka
                  </a>

                  <Trash2
                    size={16}
                    className="text-red-600 cursor-pointer"
                    onClick={() => handleDeleteMateri(m.id)}
                  />
                </div>
              </div>
            ))}

            {/* Tambah Materi */}
            <div className="pt-2">
              <OpenModalButton
                openDrawer={() => {
                  setActiveMeetingId(p.id);
                  setIsOpen(true);
                }}
              />            </div>
          </div>
        ))}
      </div>

      {/* ================= EMPTY STATE ================= */}
      {teachings.Meetings?.length === 0 && (
        <div className="text-center p-4 bg-red-100 border text-red-700">
          Tidak ada pertemuan.
        </div>
      )}
    </div>
  );
}
