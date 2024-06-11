// src/app/api/pages/delete/route.js

import { NextResponse } from 'next/server';
import { query } from '@/app/lib/db';

export async function DELETE(req) {
    const isVerified = await verifyToken(request);
    if (!isVerified) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    } else {
        try {
            const { id } = await req.json();

            // Check if id is provided
            if (!id) {
                return NextResponse.json({ error: 'Missing page ID' }, { status: 400 });
            }

            // Delete the page from the content table
            const sql = `
                DELETE FROM content
                WHERE id = ?
            `;
            await query(sql, [id]);

            return NextResponse.json({ message: 'Page deleted successfully' });
        } catch (error) {
            console.error('Failed to delete page:', error);
            return NextResponse.json({ error: 'Failed to delete page' }, { status: 500 });
        }
    }
}
