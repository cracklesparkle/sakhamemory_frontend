// app/api/assets/[id].js
import { NextResponse } from 'next/server';
import { query } from '@/app/lib/db';

export async function GET(request, { params }) {   
    const parentId = params.id;

    try {
        const rows = await query('SELECT * FROM categories WHERE parent_id = ?', [parentId]);
        return NextResponse.json(rows);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch children' }, { status: 500 });
    }
}