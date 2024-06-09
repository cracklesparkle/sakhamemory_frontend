import { NextResponse } from 'next/server';
import { query } from '@/app/lib/db';

export async function POST(request) {
    try {
        const { items } = await request.json();

        const updatePromises = items.map((item, index) => {
            return query('UPDATE menu SET `order` = ?, parent_id = ? WHERE id = ?', [
                index,
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