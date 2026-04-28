import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
  // 临时方案：不进行任何认证拦截，所有路由公开
  return NextResponse.next()
}

export const config = {
  matcher: [], // 不匹配任何路由，相当于禁用中间件
}