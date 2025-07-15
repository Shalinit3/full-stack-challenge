import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CompanyForm from './CompanyForm';

describe('CompanyForm', () => {
    const mockSetData = jest.fn();
    const mockOnSubmit = jest.fn();

    const defaultData = {
        name: '',
        email: '',
        phone: '',
        address: '',
        description: '',
    };

    const renderForm = (overrides = {}) =>
        render(<CompanyForm data={{ ...defaultData, ...overrides }} setData={mockSetData} onSubmit={mockOnSubmit} processing={false} errors={{}} />);

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders all input fields', () => {
        renderForm();
        expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/phone/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/address/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
    });

    it('calls setData when inputs change', async () => {
        renderForm();
        const nameInput = screen.getByLabelText(/name/i);
        await userEvent.type(nameInput, 'My Company');
        expect(mockSetData).toHaveBeenCalledWith('name', 'M');
    });

    it('validates required fields and shows errors on submit', async () => {
        renderForm();
        await fireEvent.submit(screen.getByRole('button', { name: /submit/i }));

        await waitFor(() => {
            expect(mockOnSubmit).toHaveBeenCalledWith(expect.anything(), false);
        });

        expect(screen.getByText(/name is required/i)).toBeInTheDocument();
        expect(screen.getByText(/email is required/i)).toBeInTheDocument();
        expect(screen.getByText(/phone is required/i)).toBeInTheDocument();
        expect(screen.getByText(/address is required/i)).toBeInTheDocument();
    });

    it('shows email format error for invalid email', async () => {
        renderForm({ email: 'bademail' });
        await fireEvent.submit(screen.getByRole('button', { name: /submit/i }));

        await waitFor(() => {
            expect(screen.getByText(/email is invalid/i)).toBeInTheDocument();
        });
    });

    it('shows phone format error for non-10-digit numbers', async () => {
        renderForm({ phone: '12345' });
        await fireEvent.submit(screen.getByRole('button', { name: /submit/i }));

        await waitFor(() => {
            expect(screen.getByText(/phone number must be 10 digits/i)).toBeInTheDocument();
        });
    });

    it('submits the form when data is valid', async () => {
        renderForm({
            name: 'Company',
            email: 'test@example.com',
            phone: '123-456-7890',
            address: '123 Street',
        });

        await fireEvent.submit(screen.getByRole('button', { name: /submit/i }));

        await waitFor(() => {
            expect(mockOnSubmit).toHaveBeenCalledWith(expect.anything(), true);
        });
    });
});
