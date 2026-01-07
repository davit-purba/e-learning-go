import { NextResponse } from "next/server";
import axios from "axios";
import { auth } from "@/lib/auth";

// app/api/users/route.ts

// ... (GET code yang sudah ada)

export const GET = auth(async (...args: any) => {
    const [req, { params }] = args;

    try {
        const { teaching_id } = params

        const user = req.auth?.user;
        const accessToken = req.auth?.accessToken;

        // 1. Validasi Auth
        if (!user || user.role !== "guru" || !accessToken) {
            return NextResponse.json(
                { message: "Unauthorized", success: false },
                { status: 401 }
            );
        }

        // 2. Validasi ID
        if (!teaching_id) {
            return NextResponse.json(
                { message: "ID user diperlukan", success: false },
                { status: 400 }
            );
        }

        // 3. Panggil API Backend (Express/Sequelize)
        const res = await axios.get(`${process.env.BACKEND_URL}/api/teachings/${teaching_id}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        return NextResponse.json({
            success: true,
            message: "User berhasil dihapus",
            data: res.data
        });

    } catch (err: any) {
        return NextResponse.json(
            {
                message: err.response?.data?.error || "Gagal menghapus user",
                success: false
            },
            { status: err.response?.status || 500 }
        );
    }
});