import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("image") as File;
    const tone = formData.get("tone") as string;

    if (!file) {
      return NextResponse.json({ error: "No image provided" }, { status: 400 });
    }

    // Convert image to Base64 for Gemini
    const bytes = await file.arrayBuffer();
    const base64Image = Buffer.from(bytes).toString("base64");

   const response = await fetch(
  `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${process.env.GEMINI_API_KEY}`,
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      contents: [
        {
          parts: [
            { 
  text: `You are an expert social media manager. Write ONE single, high-quality ${tone} social media caption for this image. 
  
  Rules:
  - Return ONLY the caption text. 
  - Do NOT include "Here are some options" or "Option 1".
  - Do NOT use quotes around the caption.
  - Include 2-3 relevant emojis.
  - Include 3-5 trending hashtags at the end.
  - If the tone is professional, sound like a thought leader. 
  - If the tone is funny, use dry humor or a witty one-liner.` 
},
            {
              inline_data: {
                mime_type: file.type,
                data: base64Image,
              },
            },
          ],
        },
      ],
    }),
  }
);

    const data = await response.json();

    if (!response.ok) {
      console.error("Gemini Error:", data);
      return NextResponse.json({ error: data.error?.message || "Gemini failed" }, { status: response.status });
    }

    // Gemini's response structure is a bit nested
    const caption = data.candidates[0].content.parts[0].text;
    
    return NextResponse.json({ caption });

  } catch (error) {
    console.error("Server Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}