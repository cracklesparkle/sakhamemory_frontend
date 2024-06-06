import { NextResponse } from 'next/server';
import { query } from '@/app/lib/db';

export async function GET(req, res) {
    try {
        // Check if an admin user exists in the database
        const existingAdmin = await query('SELECT * FROM users WHERE role = ?', ['admin']);

        // Return whether admin user exists
        return NextResponse.json({ adminExists: existingAdmin.length > 0 });
    } catch (error) {
        console.error('Error checking admin existence:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}