import { NextResponse } from 'next/server';
import transporter from '@/app/lib/nodemailer';
import crypto from 'crypto';
import { query } from '@/app/lib/db';

function generateResetToken() {
    return crypto.randomBytes(32).toString('hex');
}

async function associateTokenWithEmail(email, token) {
    const expiryDate = new Date(Date.now() + 3600000); // Token expires in 1 hour
    await query('UPDATE users SET reset_token = ?, reset_token_expiration = ? WHERE email = ?', [token, expiryDate, email]);
}

async function sendResetEmail(email, token) {
    const resetUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/reset-password/${token}`;
    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Password Reset Request',
        html: `<p>You requested a password reset. Click <a href="${resetUrl}">here</a> to reset your password.</p>`,
    });
}

export async function POST(req) {
    const { email } = await req.json();

    // Generate a unique token
    const resetToken = generateResetToken();

    // Associate the token with the user's account
    await associateTokenWithEmail(email, resetToken);

    // Send password reset email with the token
    await sendResetEmail(email, resetToken);

    // Respond with success message
    return NextResponse.json({ message: 'Password reset email sent successfully' });
}
