import JobForm from '@/components/job-form';
import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';

interface CreateJobProps {
    companyId: number;
    companyName: string;
}

export default function CreateJob({ companyId, companyName }: CreateJobProps) {
    const { data, setData, post, processing, errors, clearErrors } = useForm({
        title: '',
        description: '',
        contactEmail: '',
        contactPhone: '',
        contactFormUrl: '',
    });

    const handleSubmit = (e: React.FormEvent, isValid: boolean) => {
        e.preventDefault();
        if (!isValid) return;
        clearErrors();
        post(route('jobs.store', { company: companyId }));
    };

    return (
        <AppLayout breadcrumbs={[
        {
            title: companyName,
            href: route('companies.details', companyId),
        },
        {
            title: 'Create Job',
            href: '', 
        },
    ]}>
            <Head title="WiseJobs - Create New Job" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <JobForm
                    data={data}
                    setData={setData}
                    onSubmit={handleSubmit}
                    processing={processing}
                    errors={errors}
                />
            </div>
        </AppLayout>
    );
}
