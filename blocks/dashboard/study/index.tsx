"use client";

import React from "react";
import Link from "next/link";
import { useClassStudent } from "@/context/service/classStudent";

export const Study = () => {
  const { classStudent } = useClassStudent();

  if (!classStudent?.Teaching) {
    return (
      <div className="p-10 text-center text-red-500 font-semibold">
        Data study tidak ditemukan
      </div>
    );
  }

  const { Teaching } = classStudent;
  const meetings = Teaching.Meetings || [];

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="bg-white p-6 shadow">
        <h1 className="font-bold text-lg text-gray-800">
          Tahun Ajaran {Teaching.tahun}
        </h1>
      </div>

      {/* Pertemuan */}
      <div className="mt-4 space-y-4">
        {meetings.length > 0 ? (
          meetings.map((meeting: any, meetingIndex: any) => (
            <div
              key={meeting.id}
              className="bg-white shadow border rounded"
            >
              <h2 className="text-lg text-gray-700 p-4 border-b">
                Pertemuan {meetingIndex + 1} – {meeting.title}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 p-4">
                {meeting.Materials && meeting.Materials.length > 0 ? (
                  meeting.Materials.map((material: any, materialIndex: any) => (
                    <div
                      key={material.id}
                      className="flex items-center justify-between border p-4 rounded bg-gray-50"
                    >
                      <Link
                        href={`/materi?mid=${material.id}`}
                        className={`font-medium ${
                          material.type === "tugas"
                            ? ""
                            : "text-blue-600"
                        }`}
                      >
                        {meetingIndex + 1}.{materialIndex + 1}.{" "}
                        {material.title}
                        {material.type === "tugas" && " | Tugas"}
                      </Link>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 italic">
                    Tidak ada materi untuk pertemuan ini.
                  </p>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 italic">
            Belum ada pertemuan
          </p>
        )}
      </div>
    </div>
  );
};
