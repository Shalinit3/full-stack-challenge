export interface CompanyType {
    id: number;
    name: string;
    email: string;
    phone: string;
    address: string;
    description: string;
}

interface Props {
    company: CompanyType;
}

export default function CompanyDetails({ company }: Props) {
    return (
        <div className="rounded bg-white p-4 shadow">
            <h2 className="text-2xl font-bold">{company.name}</h2>
            <p className="text-sm text-gray-600">{company.description}</p>
            <p className="mt-2 text-sm">
                <strong>Email:</strong> {company.email}
            </p>
            <p className="text-sm">
                <strong>Phone:</strong> {company.phone}
            </p>
            <p className="text-sm">
                <strong>Address:</strong> {company.address}
            </p>
        </div>
    );
}
