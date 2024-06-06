'use client'

import { SessionProvider, useSession, signOut } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { redirect } from 'next/navigation';
import AssetsTree from '../components/AssetsTree';
import MenuTree from '../components/MenuTree';

function AdminPageContent() {
    const { data: session, status } = useSession();

    useEffect(() => {
        const fetchData = async () => {
            if (status === 'authenticated') {
                try {
                    const response = await fetch('/api/setup/check');
                    const data = await response.json();
                    const adminExists = data.adminExists;

                    if (!adminExists) {
                        redirect('/setup');
                    } else if (session && session.user.role !== 'admin') {
                        redirect('/auth/signin');
                    }
                } catch (error) {
                    console.error('Error checking admin existence:', error);
                    // Handle error
                }
            } else if (status === 'loading') {
                // Session is still loading
            } else {
                redirect('/auth/signin');
            }
        };

        fetchData();
    }, [session, status]);

    const handleSignOut = async () => {
        await signOut();
    };

    if (status === 'loading') {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Панель управления</h1>
            {session && <p>Welcome, {session.user.email}!</p>}
            <button onClick={handleSignOut}>Sign Out</button>

            <MenuTree/>
            {/* Your CMS functionalities here */}
        </div>
    );
}

export default function AdminPage() {
    return (
        <SessionProvider>
            <AdminPageContent />
        </SessionProvider>
    );
}