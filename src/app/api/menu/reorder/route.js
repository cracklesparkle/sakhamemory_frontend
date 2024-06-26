import { NextResponse } from 'next/server';
import { query } from '@/app/lib/db';
import { verifyToken } from '@/app/puck/api/route';

export async function POST(request) {
    const isVerified = await verifyToken(request);
    if (!isVerified) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    } else {
        try {
            const { items } = await request.json();

            const updatePromises = items.map((item, index) => {
                return query('UPDATE menu SET `order` = ?, link = ?, parent_id = ? WHERE id = ?', [
                    index,
                    item.link,
                    item.parent_id || null,
                    item.id,
                ]);
            });

            await Promise.all(updatePromises);

            return NextResponse.json({ message: 'Menu order updated successfully' });
        } catch (error) {
            return NextResponse.json({ error: 'Failed to update menu order' }, { status: 500 });
        }
    }
}