import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req) {
  const res = NextResponse.next()

  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const ip = req.headers.get('x-forwarded-for') || req.connection.remoteAddress;
  const isLocalhost = ip === '::1' || ip === '127.0.0.1' || ip.startsWith('192.') || ip.startsWith('10.');

  // Check if admin user exists by calling the API endpoint


  if (req.nextUrl.pathname === '/setup') {
    const response = await fetch(`${process.env.NEXTAUTH_URL}/api/setup/check`);
    const data = await response.json();
    const adminExists = await data.adminExists;

    if (!isLocalhost || adminExists) {
      const url = req.nextUrl.clone()
      url.pathname = '/'
      return NextResponse.rewrite(url);
    }
  }

  if (req.nextUrl.pathname.startsWith('/admin') && !token) {
    return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/auth/signin`);
  }

  if (req.method === "GET") {
    // Rewrite routes that match "/[...puckPath]/edit" to "/puck/[...puckPath]"
    if (req.nextUrl.pathname.endsWith("/edit") && token) {
      const pathWithoutEdit = req.nextUrl.pathname.slice(
        0,
        req.nextUrl.pathname.length - 5
      );
      const pathWithEditPrefix = `/puck${pathWithoutEdit}`;

      return NextResponse.rewrite(new URL(pathWithEditPrefix, req.url));
    }

    // Disable "/puck/[...puckPath]"
    if (req.nextUrl.pathname.startsWith("/puck")) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  return res
}

// export const config = {
//   matcher: ['/setup', '/admin/:path*'],
// };