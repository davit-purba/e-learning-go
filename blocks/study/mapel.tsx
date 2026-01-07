"use client";

import React, { useState } from "react";
import { Search, Calendar, User } from "lucide-react";
import { useModalContext } from "@/context/modal-context";
import ModalMateri from "./modal";
import { useTeaching } from "@/context/service/teaching";

export const Mapel = () => {
  const { teachingStudies } = useTeaching();
  const [searchTerm, setSearchTerm] = useState("");
  const { isOpen, setIsOpen } = useModalContext();
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const handleOpenModal = (id: number) => {
    setSelectedId(id);
    setIsOpen(true);
  };

  const filteredData = teachingStudies.filter((item: any) =>
    item.Subject?.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      {/* Search */}
      <div className="relative max-w-md mx-auto">
        <input
          type="text"
          placeholder="Cari mata pelajaran..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none shadow-sm"
        />
        <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
      </div>

      {/* Card */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredData.map((item: any) => (
          <div
            key={item.id}
            className="bg-white border p-5 flex flex-col justify-between shadow-sm"
          >
            <div>
              <div className="flex justify-between items-start mb-3">
                <span className="text-xs font-semibold px-2 py-1 bg-gray-100 rounded">
                  {item.Subject.code}
                </span>
                <span className="text-xs text-gray-500">
                  {item.schedule}
                </span>
              </div>

              <h3 className="text-lg font-bold mb-2">
                {item.Subject.name}
              </h3>

              <div className="space-y-1 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <User size={14} />
                  <span>{item.User.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={14} />
                  <span>Tahun {item.tahun}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => handleOpenModal(item.id)}
              className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm"
            >
              Pilih Materi
            </button>
          </div>
        ))}
      </div>

      {isOpen && (
        <ModalMateri
          teaching_id={selectedId}
          title="Input Password Materi"
          closeDrawer={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};
