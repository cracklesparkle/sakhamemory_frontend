import { NextResponse } from 'next/server';
import { query } from '@/app/lib/db';

async function getFullPath(categoryId, alias) {
    try {
        let parentId = categoryId;
        let fullPath = alias;

        while (parentId !== null) {
            const categorySql = 'SELECT id, link, parent_id FROM categories WHERE id = ?';
            const categoryData = await query(categorySql, [parentId]);

            if (categoryData.length === 0) {
                throw new Error(`Category not found for ID: ${parentId}`);
            }

            const { link, parent_id } = categoryData[0];
            fullPath = `${link}/${fullPath}`;
            parentId = parent_id;
        }

        return `/${fullPath}`;
    } catch (error) {
        console.error('Failed to fetch full path:', error);
        throw error;
    }
}

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const offset = parseInt(searchParams.get('offset'), 10) || 0;
        const limit = parseInt(searchParams.get('limit'), 10) || 10;

        const sql = `
            SELECT content.*, categories.title as category_name 
            FROM content 
            LEFT JOIN categories ON content.category_id = categories.id 
            ORDER BY content.created_at DESC
            LIMIT ? OFFSET ?
        `;
        const rows = await query(sql, [limit, offset]);

        // Fetch full path for each row
        for (const row of rows) {
            const fullPath = await getFullPath(row.category_id, row.alias);
            row.path = fullPath;
        }

        return NextResponse.json(rows);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch page items' }, { status: 500 });
    }
}