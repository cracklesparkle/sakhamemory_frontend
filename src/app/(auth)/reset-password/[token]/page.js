'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ResetPasswordPage({ params }) {
    const { token } = params;
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        const res = await fetch('/api/auth/reset-password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token, password }),
        });

        if (res.ok) {
            router.push('/auth/signin');
        } else {
            const { error } = await res.json();
            setError(error);
        }
    };

    return (
        <div>
            <h1>Reset Password</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <label>New Password</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <label>Confirm New Password</label>
                <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                <button type="submit">Reset Password</button>
            </form>
        </div>
    );
}