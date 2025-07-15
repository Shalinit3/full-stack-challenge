import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import React, { ChangeEvent, useState } from 'react';

export interface CompanyType {
    id?: number;
    name: string;
    email: string;
    phone: string;
    address: string;
    description: string;
}

interface CompanyFormProps {
    data: CompanyType;
    setData: (key: string, value: string) => void;
    onSubmit: (e: React.FormEvent, isValid: boolean) => void;
    processing?: boolean;
    errors?: Record<string, string>;
}

const CompanyForm: React.FC<CompanyFormProps> = ({ data, setData, onSubmit, processing, errors: serverErrors }) => {
    const [localErrors, setLocalErrors] = useState<Record<string, string>>({});
    const combinedErrors = { ...serverErrors, ...localErrors };

    const validate = () => {
        const errors: Record<string, string> = {};

        if (!data.name.trim()) errors.name = 'Name is required.';
        if (!data.email.trim()) {
            errors.email = 'Email is required.';
        } else if (!/^\S+@\S+\.\S+$/.test(data.email)) {
            errors.email = 'Email is invalid.';
        }
        if (!data.phone.trim()) {
            errors.phone = 'Phone is required.';
        } else {
            const digits = data.phone.replace(/\D/g, '');
            if (digits.length !== 10) {
                errors.phone = 'Phone number must be 10 digits (excluding country code).';
            }
        }
        if (!data.address.trim()) errors.address = 'Address is required.';

        setLocalErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        const isValid = validate();
        onSubmit(e, isValid);
    };

    return (
        <form onSubmit={handleSubmit} className="mx-auto w-full max-w-4xl space-y-6 p-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                    <Label htmlFor="company-name" className="mb-1 block text-sm">
                        Name
                    </Label>
                    <Input
                        id="company-name"
                        type="text"
                        placeholder="Enter company name"
                        value={data.name}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setData('name', e.target.value)}
                        className="w-full rounded border px-3 py-2"
                    />
                    {combinedErrors?.name && <p className="text-sm text-red-500">{combinedErrors.name}</p>}
                </div>
                <div>
                    <Label htmlFor="company-email" className="mb-1 block text-sm">
                        Email
                    </Label>
                    <Input
                        id="company-email"
                        type="text"
                        placeholder="wisej@example.com"
                        value={data.email}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setData('email', e.target.value)}
                        className="w-full rounded border px-3 py-2"
                    />
                    {combinedErrors?.email && <p className="text-sm text-red-500">{combinedErrors.email}</p>}
                </div>
                <div>
                    <Label htmlFor="company-phone" className="mb-1 block text-sm">
                        Phone
                    </Label>
                    <Input
                        id="company-phone"
                        type="text"
                        placeholder="+1234567890"
                        value={data.phone}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setData('phone', e.target.value)}
                        className="w-full rounded border px-3 py-2"
                    />
                    {combinedErrors?.phone && <p className="text-sm text-red-500">{combinedErrors.phone}</p>}
                </div>
                <div>
                    <Label htmlFor="company-address" className="mb-1 block text-sm">
                        Address
                    </Label>
                    <Input
                        id="company-address"
                        type="text"
                        placeholder="Enter company address"
                        value={data.address}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setData('address', e.target.value)}
                        className="w-full rounded border px-3 py-2"
                    />
                    {combinedErrors?.address && <p className="text-sm text-red-500">{combinedErrors.address}</p>}
                </div>
            </div>
            <div>
                <Label htmlFor="company-description" className="mb-1 block text-sm">
                    Description
                </Label>
                <Textarea
                    id="company-description"
                    placeholder="Enter company description"
                    value={data.description}
                    onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setData('description', e.target.value)}
                    className="w-full rounded border px-3 py-2"
                />
            </div>
            <div>
                <Button type="submit" disabled={processing} className="rounded border px-4 py-2">
                    Submit
                </Button>
            </div>
        </form>
    );
};

export default CompanyForm;
