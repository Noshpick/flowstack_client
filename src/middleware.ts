import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const has = req.cookies.get('i18next')?.value
  if (!has) {
    res.cookies.set('i18next', 'ru', { path: '/', maxAge: 60 * 60 * 24 * 365 })
  }
  return res
}

export const config = {
  matcher: ['/', '/((?!_next|.*\\..*).*)'],
}