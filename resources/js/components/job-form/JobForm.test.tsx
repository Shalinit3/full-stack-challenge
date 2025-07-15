import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import JobForm, { JobType } from './JobForm';

describe('JobForm', () => {
  const mockSetData = jest.fn();
  const mockOnSubmit = jest.fn();

  const defaultData: JobType = {
    title: '',
    description: '',
    contactEmail: '',
    contactPhone: '',
    contactFormUrl: '',
  };

  const renderForm = (
    data: Partial<JobType> = {},
    processing = false,
    errors: Record<string, string> = {}
  ) => {
    render(
      <JobForm
        data={{ ...defaultData, ...data }}
        setData={mockSetData}
        onSubmit={mockOnSubmit}
        processing={processing}
        errors={errors}
      />
    );
  };

  beforeEach(() => {
    mockSetData.mockClear();
    mockOnSubmit.mockClear();
  });

  it('renders all form fields', () => {
    renderForm();

    expect(screen.getByLabelText(/job title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/job description/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/contact email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/contact phone/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/contact form url/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
  });

  it('calls setData when inputs change', () => {
    renderForm();

    fireEvent.change(screen.getByLabelText(/job title/i), {
      target: { value: 'Senior Engineer' },
    });
    expect(mockSetData).toHaveBeenCalledWith('title', 'Senior Engineer');

    fireEvent.change(screen.getByLabelText(/contact email/i), {
      target: { value: 'test@example.com' },
    });
    expect(mockSetData).toHaveBeenCalledWith('contactEmail', 'test@example.com');

    fireEvent.change(screen.getByLabelText(/contact phone/i), {
      target: { value: '1234567890' },
    });
    expect(mockSetData).toHaveBeenCalledWith('contactPhone', '1234567890');

    fireEvent.change(screen.getByLabelText(/contact form url/i), {
      target: { value: 'https://form.com' },
    });
    expect(mockSetData).toHaveBeenCalledWith('contactFormUrl', 'https://form.com');
  });

  it('shows validation errors and prevents submission if fields are invalid', () => {
    renderForm();

    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    expect(screen.getByText(/job title is required/i)).toBeInTheDocument();
    expect(screen.getByText(/job description is required/i)).toBeInTheDocument();
    expect(screen.getByText(/contact email is required/i)).toBeInTheDocument();
    expect(screen.getByText(/contact form url is required/i)).toBeInTheDocument();

    expect(mockOnSubmit).toHaveBeenCalledWith(expect.any(Object), false);
  });

  it('submits with isValid true if inputs are valid', () => {
    renderForm({
      title: 'Dev',
      description: 'Cool job',
      contactEmail: 'dev@example.com',
      contactFormUrl: 'https://example.com/contact',
    });

    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    expect(mockOnSubmit).toHaveBeenCalledWith(expect.any(Object), true);
  });

  it('disables submit button when processing is true', () => {
    renderForm({}, true);

    const button = screen.getByRole('button', { name: /submit/i });
    expect(button).toBeDisabled();
  });

  it('displays server-side error messages if provided', () => {
    const errors = {
      title: 'Title is taken',
      contactEmail: 'Email format wrong',
    };

    renderForm({}, false, errors);

    expect(screen.getByText(/title is taken/i)).toBeInTheDocument();
    expect(screen.getByText(/email format wrong/i)).toBeInTheDocument();
  });
});