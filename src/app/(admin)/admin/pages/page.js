import dynamic from 'next/dynamic';

const AdminPagesEditor = dynamic(() => import('@/app/components/Admin/AdminPagesEditor'), {
    loading: () => <p>Загрузка...</p>,
  })

export default function PagesPage() {
    return (
        <AdminPagesEditor/>
    );
}