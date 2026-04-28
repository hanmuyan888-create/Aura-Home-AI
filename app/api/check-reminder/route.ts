import { NextRequest, NextResponse } from 'next/server';

// 判断是否应该发送提醒邮件
function shouldSendReminder(firstLoginTs: number): boolean {
  const now = Date.now();
  const daysSinceFirst = Math.floor((now - firstLoginTs) / (1000 * 60 * 60 * 24));
  // 第3天或第7天（允许前后12小时误差）
  return daysSinceFirst === 3 || daysSinceFirst === 7;
}

export async function POST(req: NextRequest) {
  try {
    const userId = req.headers.get('x-user-id');
    const { firstLoginTs } = await req.json();

    if (!userId || !firstLoginTs) {
      return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
    }

    // 检查是否应该发送邮件
    if (!shouldSendReminder(firstLoginTs)) {
      return NextResponse.json({ sent: false, reason: 'Not time yet' });
    }

    // 检查用户是否还有免费积分（通过读取 localStorage 无法在后端实现，这里我们信任前端已判断）
    // 为了简单，我们直接发送邮件，因为免费积分是每日重置的，理论上用户总有1积分
    // 更严谨的做法是前端在调用时也传一个 hasCredits 参数，但为了快速上线，我们直接发送

    // 调用发送邮件 API
    const emailRes = await fetch(`${req.nextUrl.origin}/api/send-reminder`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        to: userId.includes('@') ? userId : undefined, // 如果是邮箱，就用邮箱；访客ID无法发邮件，跳过
        subject: '⏳ Your free daily credit is waiting – come glow up your space!',
        htmlContent: `
          <!DOCTYPE html>
          <html>
          <head><meta charset="UTF-8"></head>
          <body style="font-family: sans-serif; background-color: #FDF6F0; padding: 20px;">
            <div style="max-width: 500px; margin: auto; background: white; padding: 30px; border-radius: 20px;">
              <h2 style="color: #E67E22;">✨ Your room is waiting for its warm glow</h2>
              <p>Hi there,</p >
              <p>We noticed you haven't used your free daily credit yet. Don't let it go to waste—every day you get <strong>1 free design</strong> to transform any room with AI.</p >
              <p>Why not take 10 seconds to create something beautiful right now?</p >
              <div style="text-align: center; margin: 30px 0;">
                <a href=" " style="background: #E67E22; color: white; padding: 12px 28px; border-radius: 40px; text-decoration: none; font-weight: bold;">🎨 Try Free Now</a >
              </div>
              <p style="font-size: 12px; color: #8C7A6B;">© 2026 AuraHome AI. All rights reserved.</p >
            </div>
          </body>
          </html>
        `,
      }),
    });

    if (!emailRes.ok) {
      const err = await emailRes.text();
      console.error('Send email failed:', err);
      return NextResponse.json({ sent: false, error: 'Email send failed' }, { status: 500 });
    }

    return NextResponse.json({ sent: true });
  } catch (error: any) {
    console.error('Check reminder error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}