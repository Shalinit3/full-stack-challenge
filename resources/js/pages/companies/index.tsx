import Table from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { useEffect, useMemo } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Companies',
        href: '/companies',
    },
];

interface PageProps {
    flash: {
        message?: string;
    };
    companies: Array<{
        id: number;
        name: string;
        email: string;
        phone: string;
        address: string;
        description: string;
        logo?: string | null;
    }>;
}

export default function Companies() {
    const { flash, companies } = usePage().props as Partial<PageProps>;
    const message = useMemo(() => flash?.message ?? '', [flash]);
    
    useEffect(() => {
        if (message.length) {
            // Display the flash message, e.g., using a toast or alert
            alert(message);
        }
    }, [message]);

    return (
        <AppLayout
            breadcrumbs={breadcrumbs}
            headerButton={{
                href: route('companies.create'),
                title: 'Create Company',
            }}
        >
            <Head title="Companies" />
                <div className="mx-auto flex h-full w-full max-w-4xl flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <Table
                    columns={[
                        { header: 'Name', key: 'name' },
                        { header: 'Email', key: 'email' },
                        { header: 'Phone', key: 'phone' },
                        { header: 'Address', key: 'address' },
                        { header: 'Description', key: 'description' },
                    ]}
                    data={companies ?? []}
                />
            </div>
        </AppLayout>
    );
}
