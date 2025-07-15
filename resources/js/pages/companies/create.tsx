import PlaceholderPage from '@/components/placeholder-page';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Create Company',
        href: '/companies/create',
    },
];

export default function CreateCompany() {
    return (
        <AppLayout
            breadcrumbs={breadcrumbs}
        >
            <Head title="Create Company" />
            <PlaceholderPage />
        </AppLayout>
    );
}
