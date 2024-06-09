'use client'

import { SessionProvider, useSession, signOut } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { redirect } from 'next/navigation';
import AssetsTree from '@/app/components/AssetsTree';
import MenuTree from '@/app/components/MenuTree';
import AdminMenuEditor from '@/app/components/Admin/AdminMenuEditor';

export default function CategoriesPage() {
    return (
        <AdminMenuEditor/>
    );
}