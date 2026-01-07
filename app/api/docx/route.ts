import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import mammoth from "mammoth";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const filename = searchParams.get("file");

    if (!filename) {
      return NextResponse.json({ error: "File tidak ditemukan" }, { status: 400 });
    }

    const filePath = path.join(process.cwd(), "public", filename);

    const buffer = fs.readFileSync(filePath);

    const result = await mammoth.convertToHtml({ buffer });

    return NextResponse.json({
      html: result.value, // hasil HTML (teks + gambar)
    });
  } catch (error) {
    return NextResponse.json({ error: "Gagal membaca file docx" }, { status: 500 });
  }
}
