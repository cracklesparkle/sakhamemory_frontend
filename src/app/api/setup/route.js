import { NextResponse } from 'next/server';
import { query } from '@/app/lib/db';
import bcrypt from 'bcryptjs';

export async function POST(req) {
    const { username, password } = await req.json();

    // Check if an admin already exists
    const existingAdmin = await query('SELECT * FROM users WHERE role = ?', ['admin']);
    if (existingAdmin.length > 0) {
        return NextResponse.json({ error: 'Admin user already exists' }, { status: 400 });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await query('INSERT INTO users (email, password, role) VALUES (?, ?, ?)', [username, hashedPassword, 'admin']);
    return NextResponse.json({ message: 'Admin user created successfully' });
}