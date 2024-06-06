// app/api/assets/route.js
import { NextResponse } from 'next/server';
import { query } from '@/app/lib/db';

export async function GET() {
  try {
    const [rows] = await query('SELECT * FROM imgac_menu WHERE id IN (SELECT DISTINCT parent_id FROM imgac_menu) AND published = 1');
    return NextResponse.json(rows);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch menu' }, { status: 500 });
  }
}