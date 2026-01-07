// app/api/material/route.ts
import { NextResponse } from "next/server";
import axios from "axios";
import { auth } from "@/lib/auth";

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

    // ⬇️ AMBIL multipart/form-data
    const formData = await req.formData();

    // ⬇️ teruskan apa adanya ke backend
    const res = await axios.post(
      `${process.env.BACKEND_URL}/api/answers`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return NextResponse.json({ success: true, data: res.data });
  } catch (err: any) {
    console.error("postAnswer error:", err.message);
    return NextResponse.json(
      { message: "Internal Server Error", success: false },
      { status: 500 }
    );
  }
});
