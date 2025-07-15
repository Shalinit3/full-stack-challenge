import CompanyForm, { type CompanyType } from '@/components/company-form';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Companies',
        href: '/companies',
    },
    {
        title: 'Edit Company',
        href: '',
    },
];

export default function EditCompany({ company }: { company: CompanyType }) {
    const { data, setData, put, processing, errors, clearErrors } = useForm({
        name: company.name,
        email: company.email,
        phone: company.phone,
        address: company.address,
        description: company.description,
    });

    const handleSubmit = (e: React.FormEvent, isValid: boolean) => {
        e.preventDefault();
        if (!isValid) return;
        clearErrors();
        put(route('companies.update', company.id));
    };

    return (
        <AppLayout
            breadcrumbs={breadcrumbs}
        >
            <Head title="WiseJobs - Edit Company" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <CompanyForm data={data} setData={setData} onSubmit={handleSubmit} processing={processing} errors={errors} />
            </div>
        </AppLayout>
    );
}
