import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import axios from 'axios';
import { cookies } from 'next/headers';
import { serialize } from 'cookie';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { mail, otp } = body;

  try {
    console.log(mail, otp, 'i m heeeee');
    console.log('i m heeeee');
    const response = await axios.post(
      // 'http://localhost:8000/api/storefront-customer/verify-otp',
      'https://e-commerce-backend-n6zh.onrender.com/api/storefront-customer/verify-otp',
      {
        mail,
        otp,
      },
    );

    const { accessToken, refreshToken } = response.data;
    console.log(response.data, 'zzzzzzzz');
    // Serialize cookies
    const accessCookie = serialize('_Tt', accessToken, {
      path: '/',
      httpOnly: false,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 24 * 60 * 60 * 1000,
    });

    const refreshCookie = serialize('_Trt', refreshToken, {
      path: '/',
      httpOnly: false,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 180 * 24 * 60 * 60 * 1000,
    });

    const res = NextResponse.json(response.data);
    res.headers.set('Set-Cookie', accessCookie);
    res.headers.append('Set-Cookie', refreshCookie);

    return res;
  } catch (err) {
    return NextResponse.json({ error: 'Login failed' }, { status: 401 });
  }
}
