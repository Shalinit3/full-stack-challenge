import PlaceholderPage from '@/components/placeholder-page';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Companies',
        href: '/companies',
    },
];

export default function Companies() {
    return (
        <AppLayout
            breadcrumbs={breadcrumbs}
            headerButton={{
                href: route('companies.create'),
                title: 'Create Company',
            }}
        >
            <Head title="Companies" />
            <PlaceholderPage />
        </AppLayout>
    );
}
