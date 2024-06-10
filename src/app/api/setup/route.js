import { NextResponse } from 'next/server';
import { query } from '@/app/lib/db';
import bcrypt from 'bcryptjs';

export async function POST(req) {
    const ip = req.headers.get('x-forwarded-for') || req.connection.remoteAddress;
    const isLocalhost = ip === '::1' || ip === '127.0.0.1' || ip.startsWith('192.') || ip.startsWith('10.');

    if (!isLocalhost) {
        return NextResponse.json({ error: "Действие не разрешено" }, { status: 401 });
    } else {
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
}