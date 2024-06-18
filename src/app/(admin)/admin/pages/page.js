import { Loader } from '@mantine/core';
import dynamic from 'next/dynamic';

const AdminPagesEditor = dynamic(() => import('@/app/components/Admin/AdminPagesEditor'), {
    loading: () => <Loader color='blue'/>,
  })

export default function PagesPage() {
    return (
        <AdminPagesEditor/>
    );
}