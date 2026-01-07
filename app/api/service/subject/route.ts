import { NextResponse } from "next/server";
import axios from "axios";

// Misal kamu punya middleware `auth` yang menambahkan `req.auth`
import { auth } from "@/lib/auth";

export const GET = auth(async (req: Request & { auth?: any }) => {
    try {
        // Pastikan middleware menambahkan req.auth
        const user = req.auth?.user;
        const accessToken = req.auth?.accessToken;
        console.log("user", user)
        if (!accessToken) {
            return NextResponse.json(
                { message: "Unauthorized", success: false },
                { status: 401 }
            );
        }

        // Panggil API backend dengan token dari req.auth
        const res = await axios.get(`${process.env.BACKEND_URL}/api/subjects`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        return NextResponse.json({ success: true, data: res.data });
    } catch (err: any) {
        console.error("getSubjects error:", err.message);
        return NextResponse.json(
            { message: "Internal Server Error", success: false },
            { status: 500 }
        );
    }
});
