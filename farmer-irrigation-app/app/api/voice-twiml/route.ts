import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const crop = searchParams.get("crop") || "Wheat";
  const liters = searchParams.get("liters") || "297564";

  const spokenText = `Dhyan dein kisan bhai. Aapke ${crop} khet me paani ki kami hai. ${Number(liters).toLocaleString()} Liters paani ki zaroorat hai. Immediate irrigation recommended.`;

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Say voice="alice" language="hi-IN">${spokenText}</Say>
</Response>`;

  return new NextResponse(xml, {
    status: 200,
    headers: {
      "Content-Type": "text/xml",
    },
  });
}

export async function POST(request: Request) {
  return GET(request);
}
