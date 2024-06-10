import { NextResponse } from 'next/server';
import { query } from '@/app/lib/db';

export async function GET() {
    try {
        const [countResult] = await query('SELECT COUNT(*) as total FROM content');
        const total = countResult.total;

        return NextResponse.json({ total });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch content count' }, { status: 500 });
    }
}