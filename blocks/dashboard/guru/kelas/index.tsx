"use client";

import Link from "next/link";
import { ArrowUpRight, GraduationCap, Users, Calendar, UserCheck, Plus } from "lucide-react";
import swal from "sweetalert2";
import { useState } from "react";
import { useModalContext } from "@/context/modal-context";
import OpenModalButton from "./open-modal";
import { useTeaching } from "@/context/service/teaching";
import { useSession } from "next-auth/react";
export default function KelasByGuru({
  params,
}: {
  params: { id: string; materi: string };
}) {
  const session = useSession()
  const { id } = params;
  const idkelas = Number(id);
  const idGuru = Number(session.data?.user.id);
  const { isOpen, setIsOpen } = useModalContext();
  const { teachings, subjects, classes, setClassId } = useTeaching();
  // Study yang diajar guru di kelas ini
  const studyByKelasGuru = teachings.filter(
    (s: any) => s.class_id === idkelas && s.teacher_id === idGuru
  );

  const toggleModal = () => {
    setIsOpen(!isOpen);
    setClassId(idkelas)
  }

  // Siswa di kelas ini
  // const siswaKelas = joinClass.filter((j) => j.id_kelas === idkelas);

  return (
    <div className="p-6 bg-gray-50 min-h-screen space-y-12 text-black">

      {/* ====================== SECTION STUDY (CARD GRID) ====================== */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-600 text-white">
              <GraduationCap size={24} />
            </div>
            <h3 className="text-xl font-bold tracking-tight">Mata Pelajaran Anda</h3>
          </div>
          <div className="pt-2">
            <OpenModalButton openDrawer={toggleModal} />
          </div>
          {/* <button
            className="flex items-center gap-2 px-3 rounded py-2 bg-blue-600 text-white hover:bg-blue-700 transition"
          onClick={handleAddMapel}
          >
            <Plus size={18} />
          </button> */}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {studyByKelasGuru.map((item: any) => {
            const studyData = subjects.find((s: any) => s.id === item.subject_id);
            return (
              <div key={item.id} className="bg-white p-6 border-2 border-transparent hover:border-blue-500 shadow-sm hover:shadow-xl transition-all duration-300 group">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h4 className="text-xl font-extrabold text-gray-800 group-hover:text-blue-600 transition-colors">
                      {studyData?.name ?? "Materi"}
                    </h4>
                    <p className="text-sm text-gray-400 font-medium">Kurikulum {studyData?.curiculum ?? "null"}</p>
                  </div>
                  <Link
                    href={`/dashboard/guru/kelas/${id}/${item.id}/x`}
                    className="p-3 bg-gray-100 group-hover:bg-blue-600 group-hover:text-white transition-all"
                  >
                    <ArrowUpRight size={20} />
                  </Link>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <Calendar size={18} className="text-blue-500" />
                    <span className="font-semibold">{item.schedule ?? "Belum ada jadwal"}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <UserCheck size={18} className="text-green-500" />
                    <span>Status: <span className="text-green-600 font-bold uppercase text-[10px]">Aktif Mengajar</span></span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}