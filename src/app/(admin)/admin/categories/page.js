import { Loader } from '@mantine/core';
import dynamic from 'next/dynamic';

const AdminCategoryEditor = dynamic(() => import('@/app/components/Admin/AdminCategoryEditor'), {
    loading: () => <Loader color='blue'/>,
})

export default function CategoriesPage() {
    return (
        <div>
            <AdminCategoryEditor />
        </div>
    );
}