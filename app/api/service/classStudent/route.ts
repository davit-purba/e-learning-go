// app/api/users/route.ts
import { NextResponse } from "next/server";
import axios from "axios";

// Misal kamu punya middleware `auth` yang menambahkan `req.auth`
import { auth } from "@/lib/auth";

// GET /api/users
export const GET = auth(async (req: Request & { auth?: any }) => {
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

        // Panggil API backend dengan token dari req.auth
        const res = await axios.get(`${process.env.BACKEND_URL}/api/classStudents/student`, {
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

export const POST = auth(async (req: Request & { auth?: any }) => {
  try {
    const user = req.auth?.user;
    const accessToken = req.auth?.accessToken;

    if (!user || user.role !== "siswa" || !accessToken) {
      return NextResponse.json(
        { message: "Unauthorized", success: false },
        { status: 401 }
      );
    }

    const body = await req.json();
console.log(body)
    const res = await axios.post(
      `${process.env.BACKEND_URL}/api/classStudents`,
      body,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return NextResponse.json({ success: true, data: res.data });
  } catch (err: any) {
    console.error("postClassStudent error:", err.message);
    return NextResponse.json(
      { message: "Internal Server Error", success: false },
      { status: 500 }
    );
  }
});
