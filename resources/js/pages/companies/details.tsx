import CompanyDetails, { type CompanyType } from '@/components/company-details';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';


export default function ShowCompany({ company }: { company: CompanyType}) {

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
                    <Link href={''}>
                        <Button>Create Job</Button>
                    </Link>
                </div>
            </div>
        </AppLayout>
    );
}
