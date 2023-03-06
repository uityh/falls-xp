import { NextResponse } from 'next/server';

export default function middleware(req) {
	if (req.nextUrl.pathname === req.nextUrl.pathname.toLowerCase())
		return NextResponse.next();
	return NextResponse.redirect(
		new URL(req.nextUrl.pathname.toLowerCase(), req.url)
	);
}
