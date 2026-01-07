// app/api/users/route.ts
import { NextResponse } from "next/server";
import axios from "axios";

// Misal kamu punya middleware `auth` yang menambahkan `req.auth`
import { auth } from "@/lib/auth";

export const POST = auth(async (req: Request & { auth?: any }) => {
  try {
    const user = req.auth?.user;
    const accessToken = req.auth?.accessToken;

    if (!user || user.role !== "guru" || !accessToken) {
      return NextResponse.json(
        { message: "Unauthorized", success: false },
        { status: 401 }
      );
    }

    const body = await req.json();

    const res = await axios.post(
      `${process.env.BACKEND_URL}/api/meetings`,
      body,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return NextResponse.json({ success: true, data: res.data });
  } catch (err: any) {
    console.error("postMeeting error:", err.message);
    return NextResponse.json(
      { message: "Internal Server Error", success: false },
      { status: 500 }
    );
  }
});
