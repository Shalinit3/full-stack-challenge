import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import React, { ChangeEvent, useState } from 'react';

export interface JobType {
    id?: number;
    title: string;
    description: string;
    contactEmail: string;
    contactPhone?: string;
    contactFormUrl: string;
    createdAt?: string;
}

interface JobFormProps {
    data: JobType;
    setData: (key: string, value: string) => void;
    onSubmit: (e: React.FormEvent, isValid: boolean) => void;
    processing?: boolean;
    errors?: Record<string, string>;
}

const JobForm: React.FC<JobFormProps> = ({ data, setData, onSubmit, processing, errors: serverErrors }) => {
    const [localErrors, setLocalErrors] = useState<Record<string, string>>({});
    const combinedErrors = { ...serverErrors, ...localErrors };

    const validate = () => {
        const errors: Record<string, string> = {};

        if (!data.title.trim()) errors.title = 'Job title is required.';
        if (!data.description.trim()) errors.description = 'Job description is required.';

        if (!data.contactEmail.trim()) {
            errors.contactEmail = 'Contact email is required.';
        } else if (!/^\S+@\S+\.\S+$/.test(data.contactEmail)) {
            errors.contactEmail = 'Contact email is invalid.';
        }
        if (!data.contactPhone?.trim()) {
            errors.contactPhone = 'Contact phone is required.';
        } else if (!/^\+?[0-9\s-]+$/.test(data.contactPhone)) {
            errors.contactPhone = 'Contact phone is invalid.';
        }

        if (!data.contactFormUrl.trim()) {
            errors.contactFormUrl = 'Contact form URL is required.';
        } else {
            try {
                new URL(data.contactFormUrl);
            } catch {
                errors.contactFormUrl = 'Contact form URL is invalid.';
            }
        }

        setLocalErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const isValid = validate();
        onSubmit(e, isValid);
    };

    return (
        <form onSubmit={handleSubmit} className="mx-auto w-full max-w-4xl space-y-6 p-6">
            <div>
                <Label htmlFor="job-title" className="mb-1 block text-sm">
                    Job Title
                </Label>
                <Input
                    id="job-title"
                    type="text"
                    placeholder="Enter job title"
                    value={data.title}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setData('title', e.target.value)}
                    className="w-full rounded border px-3 py-2"
                />
                {combinedErrors?.title && <p className="text-sm text-red-500">{combinedErrors.title}</p>}
            </div>

                <div>
                <Label htmlFor="contact-email" className="mb-1 block text-sm">
                    Contact Email
                </Label>
                <Input
                    id="contact-email"
                    type="email"
                    placeholder="contact@example.com"
                    value={data.contactEmail}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setData('contactEmail', e.target.value)}
                    className="w-full rounded border px-3 py-2"
                />
                {combinedErrors?.contactEmail && <p className="text-sm text-red-500">{combinedErrors.contactEmail}</p>}
            </div>

            <div>
                <Label htmlFor="contact-phone" className="mb-1 block text-sm">
                    Contact Phone
                </Label>
                <Input
                    id="contact-phone"
                    type="tel"
                    placeholder="+1234567890"
                    value={data.contactPhone}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setData('contactPhone', e.target.value)}
                    className="w-full rounded border px-3 py-2"
                />
                {combinedErrors?.contactPhone && <p className="text-sm text-red-500">{combinedErrors.contactPhone}</p>}
            </div>
        

            <div>
                <Label htmlFor="job-description" className="mb-1 block text-sm">
                    Job Description
                </Label>
                <Textarea
                    id="job-description"
                    placeholder="Enter job description"
                    value={data.description}
                    onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setData('description', e.target.value)}
                    className="w-full rounded border px-3 py-2"
                />
                {combinedErrors?.description && <p className="text-sm text-red-500">{combinedErrors.description}</p>}
            </div>

            <div>
                <Label htmlFor="contact-form-url" className="mb-1 block text-sm">
                    Contact Form URL
                </Label>
                <Input
                    id="contact-form-url"
                    type="url"
                    placeholder="https://example.com/contact"
                    value={data.contactFormUrl}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setData('contactFormUrl', e.target.value)}
                    className="w-full rounded border px-3 py-2"
                />
                {combinedErrors?.contactFormUrl && <p className="text-sm text-red-500">{combinedErrors.contactFormUrl}</p>}
            </div>

            <div>
                <Button type="submit" disabled={processing} className="rounded border px-4 py-2">
                    Submit
                </Button>
            </div>
        </form>
    );
};

export default JobForm;
