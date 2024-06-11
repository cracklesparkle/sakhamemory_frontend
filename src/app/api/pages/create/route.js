// src/app/api/pages/create/route.js

import { NextResponse } from 'next/server';
import { query } from '@/app/lib/db';
import { slugify } from 'transliteration';
import { verifyToken } from '@/app/puck/api/route';

// Function to check if an alias already exists for a given category_id
async function checkAlias(category_id, alias) {
    const sql = 'SELECT COUNT(*) AS count FROM content WHERE category_id = ? AND alias = ?';
    const values = [category_id, alias];
    const result = await query(sql, values);
    return result[0].count > 0;
}

// Function to generate a unique alias by appending a number if necessary
async function generateAlias(category_id, alias) {
    let newAlias = alias;
    let counter = 1;

    while (await checkAlias(category_id, newAlias)) {
        newAlias = `${alias}-${counter}`;
        counter++;
    }

    return newAlias;
}

export async function POST(req) {
    const isVerified = await verifyToken(request);
    if (!isVerified) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    } else {
        try {
            const { category_id, title, alias, content } = await req.json();

            // Check for required fields
            if (!category_id || !title || !alias || !content) {
                return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
            }

            // Generate a unique alias if necessary
            const uniqueAlias = await generateAlias(category_id, slugify(alias));

            // Insert the new page into the content table
            const sql = `
                INSERT INTO content (category_id, title, alias, data, created_at, updated_at)
                VALUES (?, ?, ?, ?, NOW(), NOW())
            `;
            const values = [category_id, title, uniqueAlias, JSON.stringify(content)];

            await query(sql, values);

            return NextResponse.json({ message: 'Page created successfully' });
        } catch (error) {
            console.error('Failed to create page:', error);
            return NextResponse.json({ error: 'Failed to create page' }, { status: 500 });
        }
    }
}