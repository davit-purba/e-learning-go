
export const study = [
    { id: 1, name: "Bahasa Inggris", curiculum: "2014", tahun: 2025, ref: "dashboard/study" },
    { id: 2, name: "Matematika", curiculum: "2013", tahun: 2025, ref: "dashboard/study" },
    { id: 3, name: "IPA", curiculum: "2013", tahun: 2024, ref: "dashboard/study" },
    { id: 4, name: "IPS", curiculum: "2022", tahun: 2025, ref: "dashboard/study" },
    { id: 5, name: "Bahasa Indonesia", curiculum: "2014", tahun: 2025, ref: "dashboard/study" },
];


export const pertemuan = [
    { id: 1, id_study: 1, id_kelas: 1, id_user: 201, },
    { id: 2, id_study: 1, id_kelas: 1, id_user: 201, },
    { id: 3, id_study: 2, id_kelas: 1, id_user: 201, },
    { id: 4, id_study: 2, id_kelas: 1, id_user: 201, }
];


export const joinClass = [
    { id: 1, id_kelas: 1, id_user: 101 },
    { id: 2, id_kelas: 1, id_user: 102 },
    { id: 3, id_kelas: 1, id_user: 103 },
    { id: 4, id_kelas: 2, id_user: 104 },
    { id: 5, id_kelas: 2, id_user: 105 },
    { id: 6, id_kelas: 2, id_user: 106 },

]

export const studyByGuru = [
    { id: 1, id_study: 1, id_kelas: 1, id_user: 201, id_jadwal: 1 },
    { id: 2, id_study: 2, id_kelas: 1, id_user: 202, id_jadwal: 3 },
    { id: 3, id_study: 3, id_kelas: 1, id_user: 203, id_jadwal: 2 },
    { id: 4, id_study: 4, id_kelas: 1, id_user: 204, id_jadwal: 2 },
    { id: 5, id_study: 5, id_kelas: 1, id_user: 205, id_jadwal: 1 },
]

export const kelas = [
    { id: 1, name: "Kelas 7A", password: "123", tahun: 2025, wali_kelas: 1, ref: "/dashboard/kelas" },
    { id: 2, name: "Kelas 7B", password: "1234", tahun: 2025, wali_kelas: 2, ref: "/dashboard/kelas" },
    { id: 3, name: "Kelas 8A", password: "12345", tahun: 2025, wali_kelas: 3, ref: "/dashboard/kelas" },
];

export const user = [
    { id: 101, name: "Budi", id_role: 1 },
    { id: 102, name: "Budi2", id_role: 1 },
    { id: 103, name: "Budi3", id_role: 1 },
    { id: 104, name: "Budi4", id_role: 1 },
    { id: 105, name: "Budi5", id_role: 1 },
    { id: 106, name: "Budi6", id_role: 1 },
    { id: 201, name: "Jhon", id_role: 2 },
    { id: 202, name: "Jhon1", id_role: 2 },
    { id: 301, name: "Ani", id_role: 2 },
];

export const role = [
    { id: 1, name: "siswa", },
    { id: 2, name: "guru", },
];


export const jadwal = [
    { id: 1, jadwal: "Senin 08.00" },
    { id: 2, jadwal: "Selasa 10.00" },
    { id: 3, jadwal: "Rabu 09.00" },
    { id: 4, jadwal: "Kamis 11.00" },
];


export const materi = [
    {
        id: 1,
        title: "vocabulary",
        type: "teori",
        id_study: 1,
        id_pertemuan: 1,
        file: "vocabulary.docx"
    },
    {
        id: 2,
        title: "verba",
        type: "teori",
        id_study: 1,
        id_pertemuan: 1,
        file: "verba.pdf"
    },
    {
        id: 3,
        title: "grammar",
        type: "teori",
        id_study: 1,
        id_pertemuan: 1,
        file: "grammar.docx"
    },
    {
        id: 4,
        title: "Pythagoras",
        type: "teori",
        id_study: 2,
        id_pertemuan: 3,
        file: "pythagoras.pdf"
    },
    {
        id: 5,
        title: "bilangan",
        type: "teori",
        id_study: 2,
        id_pertemuan: 3,
        file: "bilangan.pdf"
    },
    {
        id: 6,
        title: "pecahan",
        type: "teori",
        id_study: 2,
        id_pertemuan: 3,
        file: "pecahan.pdf"
    },
    {
        id: 7,
        title: "desimal",
        type: "teori",
        id_study: 2,
        id_pertemuan: 3,
        file: "desimal.pdf"
    },
    {
        id: 8,
        title: "speaking",
        type: "teori",
        id_study: 1,
        id_pertemuan: 2,
        file: "speaking.pdf"
    },
    {
        id: 9,
        title: "practice",
        type: "tugas",
        id_study: 1,
        id_pertemuan: 2,
        file: "practice.docx"
    },
];

export const viewMateri = [
    { id: 1, id_materi: 1, id_study: 1, id_user: "abc", is_view: true },
    { id: 2, id_materi: 2, id_study: 1, id_user: "abc", is_view: true },
    { id: 3, id_materi: 3, id_study: 1, id_user: "abc", is_view: true },
    { id: 4, id_materi: 4, id_study: 2, id_user: "abc", is_view: true },
    { id: 5, id_materi: 5, id_study: 2, id_user: "abc", is_view: true },
    { id: 6, id_materi: 6, id_study: 2, id_user: "abc", is_view: true },
    { id: 7, id_materi: 7, id_study: 2, id_user: "abc", is_view: false },

];


export const jawaban = [
  {
    id: 1,
    id_user: 109,
    id_study: 2,
    id_pertemuan: 1,
    id_materi: 9,
    jawaban: "answer.docx",
    nilai: 85,
    updatedAt: "16 Agustus 2025",
    createdAt: "14 Agustus 2025",
  },
  {
    id: 2,
    id_user: 102,
    id_study: 2,
    id_pertemuan: 1,
    id_materi: 9,
    jawaban: "jawaban 102.pdf",
    nilai: 70,
    updatedAt: "15 Agustus 2025",
    createdAt: "13 Agustus 2025",
  },
];



export const latihan = [
    {
        id: 1,
        id_pertemuan: 1,
        latihan: "/latihan_1.pdf"
    }
];


export const ujian = [
    {
        id: 1,
        id_materi: 1,
        type: "uas",
        ujian: "/uas_1.pdf"
    }
];
