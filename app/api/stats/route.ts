import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    console.log('[Stats]', body)
    // 可以存储到外部数据库
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Invalid data' }, { status: 400 })
  }
}