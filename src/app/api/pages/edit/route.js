// src/app/api/pages/edit/route.js

import { NextResponse } from 'next/server';
import { query } from '@/app/lib/db';
import { verifyToken } from '@/app/puck/api/route';

export async function POST(req) {
    const isVerified = await verifyToken(req);
    if (!isVerified) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    } else {
        try {
            const { id, category_id, data } = await req.json();

            // Check for required fields
            if (!id || !data) {
                return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
            }

            // Update the page in the content table
            let sql;
            let values;

            if (category_id !== null) {
                sql = `
                    UPDATE content
                    SET category_id = ?, data = ?, published_at = NOW()
                    WHERE id = ?
                `;
                values = [category_id, JSON.stringify(data), id];
            } else {
                sql = `
                    UPDATE content
                    SET data = ?, published_at = NOW()
                    WHERE id = ?
                `;
                values = [JSON.stringify(data), id];
            }

            await query(sql, values);

            return NextResponse.json({ message: 'Page updated successfully' });
        } catch (error) {
            console.error('Failed to update page:', error);
            return NextResponse.json({ error: 'Failed to update page' }, { status: 500 });
        }
    }
}
