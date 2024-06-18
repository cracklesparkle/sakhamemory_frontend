import { Loader } from '@mantine/core';
import dynamic from 'next/dynamic';

const AdminMenuEditor = dynamic(() => import('@/app/components/Admin/AdminMenuEditor'), {
    loading: () => <Loader color='blue'/>,
})

export default function CategoriesPage() {
    return (
        <AdminMenuEditor />
    );
}