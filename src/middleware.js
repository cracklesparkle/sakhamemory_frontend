import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req) {

  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const ip = req.headers.get('x-forwarded-for') || req.connection.remoteAddress;
  const isLocalhost = ip === '::1' || ip === '127.0.0.1' || ip.startsWith('192.') || ip.startsWith('10.');

  // Check if admin user exists by calling the API endpoint
  const response = await fetch(`${process.env.NEXTAUTH_URL}/api/setup/check`);
  const data = await response.json();
  const adminExists = await data.adminExists;

  if (req.nextUrl.pathname === '/setup') {
    if (!isLocalhost || adminExists) {
      const url = req.nextUrl.clone()
      url.pathname = '/'
      return NextResponse.rewrite(url);
    }
  }

  if (req.nextUrl.pathname.startsWith('/admin') && !token) {
    return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/auth/signin`);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/setup', '/admin/:path*'],
};