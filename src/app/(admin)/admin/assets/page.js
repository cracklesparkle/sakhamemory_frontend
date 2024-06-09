'use client'

import { SessionProvider, useSession, signOut } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { redirect } from 'next/navigation';
import AssetsTree from '@/app/components/AssetsTree';
import MenuTree from '@/app/components/MenuTree';

export default function AssetsPage() {
    return (
        <div>
            <AssetsTree/>
        </div>
    );
}