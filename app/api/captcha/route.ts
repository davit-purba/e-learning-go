export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { createCanvas } from "canvas";

export async function GET() {
    const width = 150;
    const height = 60;

    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext("2d");

    // TEXT
    const text = Math.random().toString(36).substring(2, 7).toUpperCase();

    // COOKIE HEADER
    const headers: Record<string, string> = {
        "Content-Type": "image/png",
        "Cache-Control": "no-store",
        "Set-Cookie": `captcha=${text}; Path=/; HttpOnly; SameSite=Strict; Max-Age=300`,
    };

    // --------------------------
    // STYLE PRESETS
    // --------------------------

    const styles = [
        {
            name: "soft-pastel",
            bg: () => `rgb(${200 + Math.random()*55}, ${200 + Math.random()*55}, ${200 + Math.random()*55})`,
            shadow: "rgba(0,0,0,0.25)",
            lineColor: () => `rgba(50,50,50,0.4)`,
            font: "bold 38px Arial",
        },
        {
            name: "neon-glow",
            bg: () => `rgba(139, 131, 131, 0.21)`,
            shadow: "rgba(0,255,200,0.5)",
            lineColor: () => `rgba(${Math.random()*255}, 255, ${Math.random()*255}, 0.5)`,
            font: "bold 40px Verdana",
        },
        {
            name: "comic",
            bg: () => `rgb(${250}, ${240}, ${200})`,
            shadow: "rgba(0,0,0,0.4)",
            lineColor: () => `rgba(0,0,0,0.5)`,
            font: "bold 42px Comic Sans MS",
        },
        {
            name: "dark-tech",
            bg: () => `rgba(139, 131, 131, 0.21)`,
            shadow: "rgba(0,255,150,0.4)",
            lineColor: () => `rgba(0,255,150,0.4)`,
            font: "bold 36px 'Courier New'",
        },
        {
            name: "rgb-crazy",
            bg: () => `rgb(${Math.random()*255}, ${Math.random()*255}, ${Math.random()*255})`,
            shadow: () => `rgba(${Math.random()*255}, ${Math.random()*255}, ${Math.random()*255}, 0.7)`,
            lineColor: () => `rgba(${Math.random()*255}, ${Math.random()*255}, ${Math.random()*255}, 0.6)`,
            font: "bold 40px Arial Black",
        }
    ];

    // Pick random style every refresh
    const style = styles[Math.floor(Math.random() * styles.length)];

    // --------------------------
    // APPLY BACKGROUND
    // --------------------------
    ctx.fillStyle = typeof style.bg === "function" ? style.bg() : style.bg;
    ctx.fillRect(0, 0, width, height);

    // --------------------------
    // NOISE DOTS
    // --------------------------
    for (let i = 0; i < 700; i++) {
        ctx.fillStyle = `rgba(255,255,255,${Math.random() * 0.3})`;
        ctx.fillRect(Math.random() * width, Math.random() * height, 1, 1);
    }

    // --------------------------
    // DRAW TEXT WITH RANDOM COLORS
    // --------------------------
    ctx.font = style.font;

    for (let i = 0; i < text.length; i++) {
        const angle = (Math.random() - 0.5) * 0.5;
        const offsetY = Math.random() * 10 - 5;

        const r = Math.floor(100 + Math.random() * 155);
        const g = Math.floor(100 + Math.random() * 155);
        const b = Math.floor(100 + Math.random() * 155);

        ctx.save();
        ctx.translate(30 + i * 30, 50 + offsetY);
        ctx.rotate(angle);

        ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
        ctx.shadowColor = typeof style.shadow === "function" ? style.shadow() : style.shadow;
        ctx.shadowBlur = 5;

        ctx.fillText(text[i], 0, 0);
        ctx.restore();
    }

    // --------------------------
    // RANDOM ANTI-OCR LINES
    // --------------------------
    for (let i = 0; i < 3; i++) {
        ctx.beginPath();

        const c = typeof style.lineColor === "function"
            ? style.lineColor()
            : style.lineColor;

        ctx.strokeStyle = c;
        ctx.lineWidth = 1.5;
        ctx.moveTo(Math.random() * width, Math.random() * height);
        ctx.lineTo(Math.random() * width, Math.random() * height);
        ctx.stroke();
    }

    // --------------------------
    // RETURN PNG
    // --------------------------
    const buffer = canvas.toBuffer("image/png");
    const uint8 = new Uint8Array(buffer);

    return new NextResponse(uint8, {
        status: 200,
        headers,
    });
}
