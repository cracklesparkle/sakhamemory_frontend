import { NextResponse } from 'next/server';
import { query } from '@/app/lib/db';

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const offset = parseInt(searchParams.get('offset'), 10) || 0;
        const limit = parseInt(searchParams.get('limit'), 10) || 10;

        const sql = `
            SELECT content.*, categories.title as category_name 
            FROM content 
            LEFT JOIN categories ON content.category_id = categories.id 
            LIMIT ? OFFSET ?
        `;
        const rows = await query(sql, [limit, offset]);

        return NextResponse.json(rows);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch page items' }, { status: 500 });
    }
}