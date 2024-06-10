'use client';

import { useState } from 'react';

export default function ResetPasswordRequestPage() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await fetch('/api/auth/reset-password-request', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
        });

        if (res.ok) {
            setMessage('Password reset email sent successfully.');
        } else {
            const { error } = await res.json();
            setError(error);
        }
    };

    return (
        <div>
            <h1>Request Password Reset</h1>
            {message && <p style={{ color: 'green' }}>{message}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <label>Email</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <button type="submit">Send Reset Email</button>
            </form>
        </div>
    );
}