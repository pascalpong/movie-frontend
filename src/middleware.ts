

import { NextResponse } from 'next/server';

import { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
    const token = req.cookies.get('access_token');    
    if (token) {
        if (req.nextUrl.pathname === '/admin') {
            return NextResponse.next();
        }
       
        return NextResponse.redirect(new URL('/', req.url));
    }


    return NextResponse.redirect(new URL('/', req.url));
}
export const config = {
    matcher: ['/admin'], 
};