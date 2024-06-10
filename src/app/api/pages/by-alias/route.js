// Import necessary modules
import { query } from '@/app/lib/db';
import { NextResponse } from 'next/server';

// Define the GET method
export async function GET(req) {
    const searchParams = req.nextUrl.searchParams
    const alias = searchParams.get('alias')
    try {
        // Extract the alias parameter from the request query
        // Query the content table for the row with the matching alias
        const rows = await query('SELECT data FROM content WHERE alias = ?', [alias]);

        // If a matching row is found, return the data value
        if (rows.length > 0) {
            return NextResponse.json({ data: rows[0].data });
        } else {
            // If no matching row is found, return an error response
            return NextResponse.json({ error: 'Page not found' }, { status: 404 });
        }
    } catch (error) {
        // If an error occurs, return an error response
        return NextResponse.json({ error: 'Failed to fetch page data' }, { status: 500 });
    }
}
