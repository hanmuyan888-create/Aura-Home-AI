import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const RESEND_API_KEY = process.env.RESEND_API_KEY;

export async function POST(req: NextRequest) {
  try {
    if (!RESEND_API_KEY) {
      return NextResponse.json({ error: 'Resend API key not configured' }, { status: 500 });
    }

    const { to, subject, htmlContent } = await req.json();
    
    const resend = new Resend(RESEND_API_KEY);

    const { data, error } = await resend.emails.send({
      from: 'AuraHome AI <noreply@myaurahomeai.com>',
      to: [to],
      subject: subject,
      html: htmlContent,
    });

    if (error) {
      console.error('Resend API error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    console.error('Send email error:', error);
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}