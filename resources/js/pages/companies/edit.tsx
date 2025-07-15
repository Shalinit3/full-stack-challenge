import PlaceholderPage from '@/components/placeholder-page';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Edit Company',
        href: '/companies/edit',
    },
];

export default function EditCompany() {
    return (
        <AppLayout
            breadcrumbs={breadcrumbs}
        >
            <Head title="Edit Company" />
            <PlaceholderPage />
        </AppLayout>
    );
}
