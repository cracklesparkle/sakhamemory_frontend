import dynamic from 'next/dynamic';

const AdminCategoryEditor = dynamic(() => import('@/app/components/Admin/AdminCategoryEditor'), {
    loading: () => <p>Загрузка...</p>,
})

export default function CategoriesPage() {
    return (
        <div>
            <AdminCategoryEditor />
        </div>
    );
}