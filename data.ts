
export const study = [
    { id: 1, name: "Bahasa Inggris", curiculum: "2014", tahun: 2025, ref: "dashboard/study" },
    { id: 2, name: "Matematika", curiculum: "2013", tahun: 2025, ref: "dashboard/study" },
    { id: 3, name: "IPA", curiculum: "2013", tahun: 2024, ref: "dashboard/study" },
    { id: 4, name: "IPS", curiculum: "2022", tahun: 2025, ref: "dashboard/study" },
    { id: 5, name: "Bahasa Indonesia", curiculum: "2014", tahun: 2025, ref: "dashboard/study" },
];

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


export const pertemuan = [
    { id: 1, id_study: 1, id_kelas: 1, id_guru: 201, lock: false },
    { id: 2, id_study: 1, id_kelas: 1, id_guru: 201, lock: false },
    { id: 3, id_study: 2, id_kelas: 1, id_guru: 201, lock: false },
    { id: 4, id_study: 2, id_kelas: 1, id_guru: 201, lock: false }
];


export const joinClass = [
    { id: 1, id_study: 1, id_siswa: 101 },
    { id: 2, id_study: 1, id_siswa: 102 },
    { id: 3, id_study: 1, id_siswa: 103 },
    { id: 4, id_study: 2, id_siswa: 104 },
    { id: 5, id_study: 2, id_siswa: 105 },
    { id: 6, id_study: 2, id_siswa: 106 },

]

export const studyByGuru = [
    { id: 1, id_study: 1, id_kelas: 1, id_guru: 201, jadwal: "" },
    { id: 2, id_study: 2, id_kelas: 1, id_guru: 202, jadwal: "" },
    { id: 3, id_study: 3, id_kelas: 1, id_guru: 203, jadwal: "" },
    { id: 4, id_study: 4, id_kelas: 1, id_guru: 204, jadwal: "" },
    { id: 5, id_study: 5, id_kelas: 1, id_guru: 205, jadwal: "" },
]


export const role = [
    { id: 1, name: "siswa", },
    { id: 2, name: "guru", },
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
    { id: 1, id_materi: 1, id_siswa: 101, is_view: true },
    { id: 2, id_materi: 2, id_siswa: 101, is_view: true },
    { id: 3, id_materi: 3, id_siswa: 101, is_view: true },
    { id: 4, id_materi: 4, id_siswa: 101, is_view: true },
    { id: 5, id_materi: 5, id_siswa: 101, is_view: true },
    { id: 6, id_materi: 6, id_siswa: 101, is_view: true },
];


export const jawaban = [
    {
        id: 1,
        id_user: 109,
        type: "uas",
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
        type: "tugas",
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

export type Study = {
    id: number;
    name: string;
    curiculum: string;
    tahun: number;
    ref: string;
};

export type Pertemuan = {
    id: number;
    id_study: number;
    id_kelas: number;
    id_guru: number;
    lock: boolean;
};

export type JoinClass = {
    id: number;
    id_study: number;
    id_siswa: number;
};


export type StudyByGuru = {
    id: number;
    id_study: number;
    id_kelas: number;
    id_guru: number;
    jadwal: string;
};


export type Role = {
    id: number;
    name: "siswa" | "guru" | "admin";
};

export type Materi = {
    id: number;
    title: string;
    type: "teori" | "tugas";
    id_study: number;
    id_pertemuan: number;
    file: string;
};


export type ViewMateri = {
    id: number;
    id_materi: number;
    id_siswa: number;
    is_view: boolean;
};


export type Jawaban = {
    id: number;
    id_user: number;
    type: "tugas" | "uas" | "uts";
    id_study: number;
    id_pertemuan: number;
    id_materi: number;
    jawaban: string;
    nilai: number;
    updatedAt: string;
    createdAt: string;
};

export type Ujian = {
    id: number;
    id_materi: number;
    type: "uas" | "uts";
    ujian: string;
};



export type Teacher = {
    id: number;
    isActive: boolean;
    name: string;
    nip: string;            // nomor induk pegawai
    subject: string;        // mata pelajaran
    phone: string;
    email: string;
    address: string;
    city: string;           // kota/kabupaten
    province: string;       // provinsi
    photo: string;          // URL foto guru
    joinDate: string;       // tanggal bergabung
};

// Helper utk buat tanggal random
export type Roster = {
    id: number;
    id_study: number;
    id_kelas: number;
    id_user: number;
    id_jadwal: number;
};


export type Kelas = {
    id: number;
    name: string;
    password: string;
    tahun: string;
    id_user: number;
    isActive: boolean;
};

// Helper utk buat tanggal random
// Helper utk buat tanggal random
export type MataPelajaran = {
    id: number;
    code: string;
    name: string;
};



export type Person = {
    id: number;
    isActive: boolean;
    studentStatus: string;
    name: string;
    phone: string;
    parentName: string;
    address: string;
    city: string;             // kota/kabupaten
    province: string;         // provinsi
    nis: string;              // nomor induk siswa
    photo: string;            // URL foto siswa
    enrollmentDate: string;   // tanggal masuk
};

export type User = {
    id: number;
    name: string;
    username: string;
    password: string;
    user_group: string;
    isActive: boolean;
};


export type Question = {
    id: number;
    id_pertemuan: number;
    questionText: string;
    choices: Choice[];
    createdAt: Date;
};

export type Choice = {
    id: number;
    questionId: number;
    choiceText: string;
    isCorrect: boolean;
};

export type StudentAnswer = {
    id: number;
    id_question: number;
    id_choice: number;
    id_siswa: number;
    is_correct: boolean;
    answeredAt: Date;
};

export type StudentRecap = {
    id_siswa: number;
    id_pertemuan: number;
    totalQuestion: number;
    correct: number;
    wrong: number;
    score: number; // misal 0–100
};

