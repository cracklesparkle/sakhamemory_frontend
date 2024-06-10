import { NextResponse } from 'next/server';
import { query } from '@/app/lib/db';
import { verifyToken } from '@/app/puck/api/route';

export async function GET() {
  try {
    const rows = await query('SELECT * FROM menu ORDER BY `order` ASC');
    return NextResponse.json(rows);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch menu items' }, { status: 500 });
  }
}

export async function POST(request) {
  const isVerified = await verifyToken(request);
  if (!isVerified) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  } else {
    try {
      const { title, link, parent_id, order, published_at } = await request.json();

      if (!title) {
        return NextResponse.json({ error: 'Title is required' }, { status: 400 });
      }

      const result = await query(
        'INSERT INTO menu (title, link, parent_id, `order`, published_at) VALUES (?, ?, ?, ?, ?)',
        [title, link, parent_id || null, order || 0, published_at || null]
      );

      return NextResponse.json({ message: 'Menu item added successfully', id: result.insertId }, { status: 201 });
    } catch (error) {
      return NextResponse.json({ error: 'Failed to add menu item' }, { status: 500 });
    }
  }
}