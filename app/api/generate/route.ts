import { NextRequest, NextResponse } from 'next/server';

const AI_API_URL = 'https://api.laozhang.ai/v1/images/edits';

export async function POST(req: NextRequest) {
  try {
    const AI_API_KEY = process.env.AI_API_KEY;
    if (!AI_API_KEY) {
      return NextResponse.json({ error: 'AI API Key 未配置' }, { status: 500 });
    }

    const body = await req.json();
    const { imageBase64, prompt, localEditPrompt } = body;

    let finalPrompt = `Keep the exact room layout, window positions, and camera angle. `;
    if (localEditPrompt?.trim()) {
      finalPrompt += `Only modify the specific areas described: ${localEditPrompt}. `;
    }
    finalPrompt += prompt || '';

    const formData = new FormData();
    formData.append('model', 'flux-kontext-max');
    formData.append('prompt', finalPrompt);
    formData.append('guidance_scale', '8');
    formData.append('steps', '45');
    formData.append('response_format', 'url');

    // 将 Base64 转换为 Blob，再传给老张 API
    const base64Data = imageBase64.split(',')[1] || imageBase64;
    const byteCharacters = atob(base64Data);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: 'image/png' });
    formData.append('image', blob, 'image.png');

    const response = await fetch(AI_API_URL, {
      method: 'POST',
      headers: { Authorization: `Bearer ${AI_API_KEY}` },
      body: formData,
    });

    const responseText = await response.text();

    if (!response.ok) {
      console.error('老张 API 错误响应:', responseText);
      return NextResponse.json(
        { error: `AI API 错误 (${response.status})`, detail: responseText },
        { status: response.status }
      );
    }

    let result;
    try {
      result = JSON.parse(responseText);
    } catch (e) {
      console.error('老张 API 返回非 JSON 内容:', responseText);
      return NextResponse.json(
        { error: 'AI 返回了无效的响应格式', detail: responseText },
        { status: 500 }
      );
    }

    const returnedImageUrl = result.data?.[0]?.url || result.url || result.output;
    if (!returnedImageUrl) {
      return NextResponse.json({ error: 'AI 未返回图片 URL' }, { status: 500 });
    }

    const imgRes = await fetch(returnedImageUrl);
    if (!imgRes.ok) {
      return NextResponse.json({ error: `下载图片失败: ${imgRes.status}` }, { status: 500 });
    }

    const imgBlob = await imgRes.blob();
    const buffer = await imgBlob.arrayBuffer();
    const base64 = Buffer.from(buffer).toString('base64');
    const finalImageBase64 = `data:${imgBlob.type || 'image/png'};base64,${base64}`;

    return NextResponse.json({ success: true, imageBase64: finalImageBase64 });
  } catch (error: any) {
    console.error('生成失败:', error);
    return NextResponse.json({ error: error.message || '生成失败' }, { status: 500 });
  }
}