import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { query } from '@/app/lib/db';

export async function POST(req) {
    const { token, password } = await req.json();

    // Verify token and check expiry date
    const result = await query('SELECT * FROM users WHERE reset_token = ? AND reset_token_expiration > NOW()', [token]);

    if (result.length === 0) {
        return NextResponse.json({ error: 'Invalid or expired token' }, { status: 400 });
    }

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Update user's password and remove the reset token
    await query('UPDATE users SET password = ?, reset_token = NULL, reset_token_expiration = NULL WHERE reset_token = ?', [hashedPassword, token]);

    return NextResponse.json({ message: 'Password reset successfully' });
}