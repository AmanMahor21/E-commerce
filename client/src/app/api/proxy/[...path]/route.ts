// /app/api/proxy/[...path]/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const BACKEND_BASE_URL = 'https://e-commerce-backend.onrender.com/api';

export async function GET(req: NextRequest, { params }: { params: { path: string[] } }) {
  const cookieStore = await cookies(); // ✅ await this
  const token = cookieStore.get('_Tt')?.value;

  const targetUrl = `${BACKEND_BASE_URL}/${params.path.join('/')}`;
  const backendRes = await fetch(targetUrl, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  const data = await backendRes.json();
  return NextResponse.json(data, { status: backendRes.status });
}

export async function POST(req: NextRequest, { params }: { params: { path: string[] } }) {
  const cookieStore = await cookies(); // ✅ again here
  const token = cookieStore.get('_Tt')?.value;
  const body = await req.json();

  const targetUrl = `${BACKEND_BASE_URL}/${params.path.join('/')}`;
  const backendRes = await fetch(targetUrl, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  const data = await backendRes.json();
  return NextResponse.json(data, { status: backendRes.status });
}
