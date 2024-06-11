import dynamic from 'next/dynamic';

const AdminMenuEditor = dynamic(() => import('@/app/components/Admin/AdminMenuEditor'), {
    loading: () => <p>Загрузка...</p>,
})

export default function CategoriesPage() {
    return (
        <AdminMenuEditor />
    );
}