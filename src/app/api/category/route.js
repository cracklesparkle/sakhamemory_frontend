import { NextResponse } from 'next/server';
import { query } from '@/app/lib/db';

export async function GET() {
    try {
        const rows = await query('SELECT * FROM categories');
        return NextResponse.json(rows);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch category items' }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        const { title, link, parent_id } = await request.json();

        if (!title) {
            return NextResponse.json({ error: 'Title is required' }, { status: 400 });
        }

        const result = await query(
            'INSERT INTO categories (title, link, parent_id) VALUES (?, ?, ?)',
            [title, link, parent_id || null]
        );

        return NextResponse.json({ message: 'Category item added successfully', id: result.insertId }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to add menu item' }, { status: 500 });
    }
}