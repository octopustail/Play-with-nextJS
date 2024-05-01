import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import jwt from 'jsonwebtoken'

const PUBLIC_PATH = ['/signup', '/login',  '/verify-email'];

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname
    const isPublic = PUBLIC_PATH.includes(path);

    const token = request.cookies.get('token')?.value ?? '';

    //todo: validate token
    
    // with valid token, redirect to profile page
    if (isPublic && token) {
        return NextResponse.redirect(new URL('/profile', request.nextUrl))
    }

    // without valid token, need to login
    if (!isPublic && !token) {
        return NextResponse.redirect(new URL('/login', request.nextUrl))
    }



}

// See "Matching Paths" below to learn more
export const config = {
    matcher: [
        '/',
        '/profile',
        '/login',
        '/signup',
        '/verify-email'
    ]
}