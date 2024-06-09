'use client'

import { SessionProvider, useSession, signOut } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { redirect } from 'next/navigation';
import AssetsTree from '@/app/components/AssetsTree';
import MenuTree from '@/app/components/MenuTree';
import CategoryTree from '@/app/components/CategoryTree';

export default function CategoriesPage() {
    return (
        <div>
            <CategoryTree/>
        </div>
    );
}