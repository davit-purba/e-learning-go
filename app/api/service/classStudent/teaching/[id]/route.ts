import { NextResponse } from "next/server";
import axios from "axios";

import { auth } from "@/lib/auth";

// GET /api/users
export const GET = auth(async (...args: any) => {
    const [req, { params }] = args;

    const { id } = params
    console.log("teaching_id", id)
    try {
        // Pastikan middleware menambahkan req.auth
        const user = req.auth?.user;
        const accessToken = req.auth?.accessToken;
        console.log("user", user)
        if (!user || !accessToken) {
            return NextResponse.json(
                { message: "Unauthorized", success: false },
                { status: 401 }
            );
        }
        if (!id) {
            return NextResponse.json(
                { message: "ID user diperlukan", success: false },
                { status: 400 }
            );
        }

        // Panggil API backend dengan token dari req.auth
        const res = await axios.get(`${process.env.BACKEND_URL}/api/classStudents/student/${id}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        return NextResponse.json({ success: true, data: res.data });
    } catch (err: any) {
        console.error("getClassStudent error:", err.message);
        return NextResponse.json(
            { message: "Internal Server Error", success: false },
            { status: 500 }
        );
    }
});
