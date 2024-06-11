import { NextResponse } from 'next/server';
import { query } from '@/app/lib/db';

export async function GET(req) {
    try {
        const searchParams = req.nextUrl.searchParams
        const pageId = searchParams.get('id');

        if (!pageId) {
            return NextResponse.json({ error: 'Page ID is required' }, { status: 400 });
        }

        // Step 1: Fetch the page data using the pageId
        const pageSql = 'SELECT alias, category_id FROM content WHERE id = ?';
        const pageData = await query(pageSql, [pageId]);

        if (pageData.length === 0) {
            return NextResponse.json({ error: 'Page not found' }, { status: 404 });
        }

        const { alias, category_id } = pageData[0];
        let parentId = category_id;
        let fullPath = alias;

        // Step 2: Traverse up the category hierarchy to build the full path
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

        // Step 3: Return the full path
        return NextResponse.json({ fullPath: `/${fullPath}` });
    } catch (error) {
        console.error('Failed to fetch full path:', error);
        return NextResponse.json({ error: 'Failed to fetch full path' }, { status: 500 });
    }
}