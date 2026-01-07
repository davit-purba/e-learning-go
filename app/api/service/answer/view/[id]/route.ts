import { NextResponse } from "next/server";
import axios from "axios";
import { auth } from "@/lib/auth";

export const GET = auth(async (...args: any) => {
  const [req, { params }] = args;
  const { id } = params;

  try {
    const user = req.auth?.user;
    const accessToken = req.auth?.accessToken;

    if (!user || user.role !== "guru" || !accessToken) {
      return NextResponse.json(
        { message: "Unauthorized", success: false },
        { status: 401 }
      );
    }

    const res = await axios.get(
      `${process.env.BACKEND_URL}/api/answers/${id}/fileAnswer`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        responseType: "arraybuffer",
      }
    );

     return new NextResponse(await res.data, {
      status: 200,
      headers: {
        "Content-Type":
          res.headers["content-type"] || "application/octet-stream",
        "Content-Disposition":
          res.headers["content-disposition"] || "attachment",
      },
    });

  } catch (err: any) {
    console.error("getAnswer error:", err);
    return NextResponse.json(
      { message: "Internal Server Error", success: false },
      { status: 500 }
    );
  }
});
