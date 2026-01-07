"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useSession } from "next-auth/react";
import { Button } from "@mui/material";
import swal from "sweetalert2";
import mammoth from "mammoth";

import { useMaterial } from "@/context/service/material";
import { useSearchParams } from "next/navigation";
import { useAnswer } from "@/context/service/answer";
import Link from "next/link";

/* ===============================
   PAGE
================================ */
export default function MateriStudy() {
  const { data: session } = useSession();
  const { handleEditFile, oneMateri } = useMaterial();
  const [dokument, setDokument] = useState("Loading...");
  const [error, setError] = useState<string | null>(null);
  const [fileEditDokumen, setFileEditDokumen] = useState<File | null>(null);
  const params = useSearchParams()

  const mid = params.get("mid")

  /* ===============================
     EDIT FILE (GURU)
  ================================ */
  const handleSubmitEditMateri = async () => {
    if (!fileEditDokumen) return;

    const formData = new FormData();
    formData.append("file", fileEditDokumen);

    await handleEditFile(formData);
  };


  if (error) {
    return (
      <div className="p-4 bg-red-50 text-red-600 rounded">
        ❌ {error}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* ================= GURU ================= */}
      {session?.user.role === "guru" && (
        <div className="flex flex-col bg-white p-4 rounded border space-y-2">
          <label className="font-medium">Edit Materi</label>
          <div>
            <input
              type="file"
              accept=".pdf"
              onChange={(e) => setFileEditDokumen(e.target.files?.[0] || null)}
            />
            <Button variant="contained" onClick={handleSubmitEditMateri}>
              Save
            </Button>
          </div>
        </div>
      )}
      {/* ================= PREVIEW PDF ================= */}
      <div className="bg-white shadow overflow-hidden">
        <iframe
          src={`/api/service/material/view/${mid}`}
          className="w-full h-[80vh]"
          title="PDF Viewer"
        />
      </div>


      {/* ================= GURU - NILAI ================= */}
      {session?.user.role === "guru" &&
        oneMateri?.type === "tugas" &&
        oneMateri?.Answers?.length > 0 && (
          <NilaiGuru data={oneMateri.Answers} />
        )}

      {/* ================= SISWA ================= */}
      {session?.user.role === "siswa" &&
        oneMateri?.type === "tugas" &&
        (oneMateri?.Answers?.length > 0 ? (
          <JawabanInfo data={oneMateri.Answers} />
        ) : (
          <TugasEditor />
        ))}

    </div>
  );
}

/* ===============================
   SUBMIT JAWABAN
================================ */
/* ===============================
   EDITOR
================================ */
function TugasEditor() {
  const [value, setValue] = useState("");
  const { handleCreate } = useAnswer();
  const { oneMateri } = useMaterial();
  const [fileJawaban, setFileJawaban] = useState<File | null>(null);

  const confirmSubmit = () => {
    if (!fileJawaban) return;

    const formData = new FormData();
    formData.append("title", oneMateri.title);
    formData.append("material_id", String(oneMateri.id));
    formData.append("file", fileJawaban);

    handleCreate(formData);
  };

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ align: [] }],
      ["link"],
      ["clean"],
    ],
  };

  return (
    <div className="bg-white p-4 rounded border space-y-3">
      <div className="flex flex-col bg-white p-4 rounded border space-y-2">
        <label className="font-medium">Upload file jawaban</label>
        <div>
          <input
            type="file"
            accept=".pdf"
            onChange={(e) => setFileJawaban(e.target.files?.[0] || null)}
          />
          <Button variant="contained" onClick={confirmSubmit}>
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}

function JawabanInfo({ data }: { data: any[] }) {
  return (
    <div className="bg-white rounded-lg p-5 border space-y-4">
      <h2 className="font-semibold text-lg text-gray-800">
        📄 Jawaban Terkirim
      </h2>

      {data.map((item) => (
        <div
          key={item.id}
          className="border rounded-lg p-4 bg-gray-50 space-y-3"
        >
          <div>
            <p className="font-medium text-gray-700">{item.title}</p>
            <p className="text-sm text-gray-500">
              Dikirim: {new Date(item.createdAt).toLocaleString("id-ID")}
            </p>
          </div>

          {item.Grades.length > 0 ? (
            <div className="space-y-2">
              <p className="font-medium text-sm text-gray-600">
                Riwayat Nilai:
              </p>

              {item.Grades.map((grade: any) => (
                <div
                  key={grade.id}
                  className="flex justify-between text-sm bg-white p-2 rounded border"
                >
                  <span className="font-semibold text-lg">
                    {grade.score}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <span className="inline-block px-3 py-1 text-sm rounded-full bg-yellow-100 text-yellow-700">
              Belum Dinilai
            </span>
          )}
        </div>
      ))}
    </div>
  );
}

function NilaiGuru({ data }: { data: any[] }) {
  const [scores, setScores] = useState<Record<number, number>>({});

  const handleChange = (answerId: number, value: string) => {
    const num = Number(value);
    if (num >= 0 && num <= 100) {
      setScores((prev) => ({ ...prev, [answerId]: num }));
    }
  };

  const handleSubmitNilai = async (answerId: number, student_id: number) => {
    const score = scores[answerId];
    if (score === undefined) return;

    try {
      await fetch("/api/service/grade", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          answer_id: answerId,
          student_id,
          score,
        }),
      });

      swal("Berhasil", "Nilai berhasil disimpan", "success");
    } catch {
      swal("Error", "Gagal menyimpan nilai", "error");
    }
  };

  return (
    <div className="bg-white rounded-lg p-5 border space-y-4">
      <h2 className="font-semibold text-lg text-gray-800">
        Penilaian Tugas Siswa
      </h2>

      {data.map((item) => {
        const grades = item.Grades || [];
        const lastGrade = grades[grades.length - 1];

        return (
          <div
            key={item.id}
            className="border rounded-lg p-4 bg-gray-50 space-y-3"
          >
            <h1 className="text-sm font-semibold">
              Name: {item.User?.name}
            </h1>
            <div>
              <p className="font-medium text-gray-700">{item.title}</p>
              <p className="text-sm text-gray-500">
                Dikirim: {new Date(item.createdAt).toLocaleString("id-ID")}
              </p>
            </div>

            {/* RIWAYAT NILAI */}
            {grades.length > 0 && (
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-600">
                  Riwayat Penilaian:
                </p>

                {grades.map((grade: any) => (
                  <div
                    key={grade.id}
                    className="flex justify-between text-sm bg-white p-2 rounded border"
                  >
                    <span className="font-semibold">{grade.score}</span>
                    <span>dibuat pada: {grade.createdAt}</span>
                  </div>
                ))}
              </div>
            )}

            {/* INPUT NILAI */}
            <div className="flex items-center gap-3 pt-2">
              <input
                type="number"
                min={0}
                max={100}
                defaultValue={lastGrade?.score ?? ""}
                placeholder="0 - 100"
                className="w-24 px-3 py-1 border rounded focus:outline-none focus:ring"
                onChange={(e) => handleChange(item.id, e.target.value)}
              />

              <Button
                variant="contained"
                onClick={() =>
                  handleSubmitNilai(item.id, item.student_id)
                }
              >
                Simpan Nilai
              </Button>
            </div>
            <div>
              <Link
              passHref
              target="_blank"
              href={`/jawaban/${item.id}`}
              className="text-blue-600"
              >
                Lihat jawaban
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
}
