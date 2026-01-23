import { NextRequest, NextResponse } from 'next/server'

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'dailyido2025'
const AUTH_TOKEN = process.env.ADMIN_AUTH_TOKEN || 'dailyido-admin-token-2025'

export async function POST(req: NextRequest) {
  try {
    const { password } = await req.json()

    if (password === ADMIN_PASSWORD) {
      const response = NextResponse.json({ success: true })

      response.cookies.set('admin_auth', AUTH_TOKEN, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 7, // 1 week
        path: '/',
      })

      return response
    }

    return NextResponse.json({ error: 'Invalid password' }, { status: 401 })
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}
