import { NextResponse } from "next/server";
import axios from "axios";
import { auth } from "@/lib/auth";


export const PUT = auth(async (...args: any) => {
    const [req, { params }] = args;

    const formData = await req.formData();

    try {
        const { id } = params

        const user = req.auth?.user;
        const accessToken = req.auth?.accessToken;

        // 1. Validasi Auth
        if (!user || !accessToken) {
            return NextResponse.json(
                { message: "Unauthorized", success: false },
                { status: 401 }
            );
        }

        // 2. Validasi ID
        if (!id) {
            return NextResponse.json(
                { message: "ID diperlukan", success: false },
                { status: 400 }
            );
        }

        // 3. Panggil API Backend (Express/Sequelize)
        const res = await axios.put(`${process.env.BACKEND_URL}/api/materials/${id}/file`, formData, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        return NextResponse.json({
            success: true,
            message: "Materi berhasil diupdate",
            data: res.data
        });

    } catch (err: any) {
        console.error("materiUser error:", err.response?.data?.error || err.message);
        return NextResponse.json(
            {
                message: err.response?.data?.error || "Gagal menghapus materi",
                success: false
            },
            { status: err.response?.status || 500 }
        );
    }
});