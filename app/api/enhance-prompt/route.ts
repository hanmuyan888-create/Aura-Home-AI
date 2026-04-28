import { NextRequest, NextResponse } from 'next/server';

const CHAT_API_URL = 'https://api.302.ai/v1/chat/completions';

export async function POST(req: NextRequest) {
  try {
    const AI_API_KEY = process.env.AI_API_KEY;
    if (!AI_API_KEY) {
      return NextResponse.json({ error: 'AI API Key not configured' }, { status: 500 });
    }
    const { prompt } = await req.json();
    if (!prompt) return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
    const response = await fetch(CHAT_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${AI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: 'You are an expert interior design prompt engineer. Enhance the user\'s brief description into a detailed, professional prompt for an AI image generator. Include style, lighting, materials, and atmosphere. Output only the enhanced prompt, no extra text.' },
          { role: 'user', content: prompt },
        ],
        temperature: 0.7,
        max_tokens: 200,
      }),
    });
    const data = await response.json();
    const enhanced = data.choices?.[0]?.message?.content || prompt;
    return NextResponse.json({ enhanced });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}