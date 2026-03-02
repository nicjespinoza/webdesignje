
import { NextResponse } from 'next/server';

export const dynamic = "force-static";

export async function HEAD() {
    return new NextResponse(null, { status: 200 });
}

export async function GET() {
    return new NextResponse('pong', { status: 200 });
}
