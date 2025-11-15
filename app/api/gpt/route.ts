import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();
    
    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    }

    // Call your Nexura GPT backend instead of OpenAI directly
    const response = await fetch("https://nexura-ai-backend-rdrf.vercel.app/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message: prompt  // Changed from 'prompt' to 'message' to match your backend
      })
    });

    const data = await response.json();
    const result = data.reply || "No response";
    
    return NextResponse.json({ result });
    
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}