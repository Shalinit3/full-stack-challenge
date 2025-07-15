import Table from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm, usePage } from '@inertiajs/react';
import { PenIcon as EditIcon, TrashIcon } from 'lucide-react';
import { useCallback, useEffect, useMemo } from 'react';

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
    const { delete: deleteCompany, processing } = useForm();
    const { flash, companies } = usePage().props as Partial<PageProps>;
    const message = useMemo(() => flash?.message ?? '', [flash]);

    const handleEdit = useCallback(
        () => {
            if (processing) return;
           // TODO: Implement the edit functionality
        },
        [processing],
    );

    const handleDelete = useCallback(
        (row: { id: number }) => {
            if (processing || !confirm('Are you sure you want to delete this company?')) return;
            deleteCompany(route('companies.destroy', row.id));
        },
        [processing, deleteCompany],
    );
    
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
                    actions={[
                        {
                            icon: <EditIcon />,
                            onClick: handleEdit,
                        },
                        {
                            icon: <TrashIcon />,
                            onClick: handleDelete,
                        },
                    ]}
                    data={companies ?? []}
                />
            </div>
        </AppLayout>
    );
}
