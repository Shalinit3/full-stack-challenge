import CompanyForm from '@/components/company-form';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Companies',
        href: '/companies',
    },
    {
        title: 'Create Company',
        href: '',
    },
];

export default function CreateCompany() {
    const { data, setData, post, processing, errors, clearErrors } = useForm({
        name: '',
        email: '',
        phone: '',
        address: '',
        description: '',
    });

    const handleSubmit = (e: React.FormEvent, isValid: boolean) => {
        e.preventDefault();
        if (!isValid) return;
        clearErrors();
        post(route('companies.store'));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create New Company" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <CompanyForm data={data} setData={setData} onSubmit={handleSubmit} processing={processing} errors={errors} />
            </div>
        </AppLayout>
    );
}
