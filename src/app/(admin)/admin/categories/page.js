'use client'

import { SessionProvider, useSession, signOut } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { redirect } from 'next/navigation';
import AssetsTree from '@/app/components/AssetsTree';
import MenuTree from '@/app/components/MenuTree';
import CategoryTree from '@/app/components/CategoryTree';
import AdminCategoryEditor from '@/app/components/Admin/AdminCategoryEditor';

export default function CategoriesPage() {
    return (
        <div>
            <AdminCategoryEditor/>
        </div>
    );
}