import CompanyDetails, { type CompanyType } from '@/components/company-details';
import { type JobType } from '@/components/job-form';
import { Button } from '@/components/ui/button';
import Table from '@/components/ui/table';
import { TrashIcon } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { useCallback, useEffect, useMemo } from 'react';

interface PageProps {
    flash: {
        message?: string;
    };
}

export default function ShowCompany({ company, jobListings }: { company: CompanyType, jobListings: JobType[] }) {
  const { delete: deleteJob, processing } = useForm();
      const { flash } = usePage().props as Partial<PageProps>;
      const message = useMemo(() => flash?.message ?? '', [flash]);

    const handleDelete = useCallback((job: JobType) => {
        if (processing || !confirm('Are you sure you want to delete this job?')) return;
        deleteJob(route('jobs.destroy', job.id));
    }, [processing, deleteJob]);

        useEffect(() => {
            if (message.length) {
                // Display the flash message, e.g., using a toast or alert
                alert(message);
            }
        }, [message]);

    return (
        <AppLayout
            breadcrumbs={[
                { title: 'Companies', href: route('companies.index') },
                { title: company.name, href: '' },
            ]}
        >
            <Head title={company.name} />
            <div className="space-y-6 p-6">
                <CompanyDetails company={company} />
                <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-xl font-semibold">Job Listings</h3>
                    <Link href={route('jobs.create', company.id)}>
                        <Button>Create Job</Button>
                    </Link>
                </div>
                <Table
                    data={jobListings ?? []}
                    columns={[
                        { header: 'Title', key: 'title' },
                        { header: 'Description', key: 'description' },
                        { header: 'Contact Email', key: 'contactEmail' },
                        { header: 'Contact Phone', key: 'contactPhone' },
                        { header: 'Created At', key: 'createdAt' },
                        { header: 'Contact Form URL', key: 'contactFormUrl' },
                    ]}
                    actions={[
                        {
                            icon: <TrashIcon />,
                            onClick: handleDelete,
                        },
                    ]}
                />
            </div>
        </AppLayout>
    );
}
