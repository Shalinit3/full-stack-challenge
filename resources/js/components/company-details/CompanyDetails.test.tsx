import React from 'react';
import { render, screen } from '@testing-library/react';
import CompanyDetails from './CompanyDetails';
import '@testing-library/jest-dom';

const mockCompany = {
  id: 1,
  name: 'WiseJobs Inc.',
  email: 'contact@wisejobs.com',
  phone: '123-456-7890',
  address: '123 Innovation Drive, Toronto, ON',
  description: 'A job platform for modern hiring.',
};

describe('CompanyDetails component', () => {
  it('renders company name and description', () => {
    render(<CompanyDetails company={mockCompany} />);

    expect(screen.getByText('WiseJobs Inc.')).toBeInTheDocument();
    expect(screen.getByText('A job platform for modern hiring.')).toBeInTheDocument();
  });

  it('displays company email', () => {
    render(<CompanyDetails company={mockCompany} />);
    expect(screen.getByText(/email:/i)).toBeInTheDocument();
    expect(screen.getByText('contact@wisejobs.com')).toBeInTheDocument();
  });

  it('displays company phone', () => {
    render(<CompanyDetails company={mockCompany} />);
    expect(screen.getByText(/phone:/i)).toBeInTheDocument();
    expect(screen.getByText('123-456-7890')).toBeInTheDocument();
  });

  it('displays company address', () => {
    render(<CompanyDetails company={mockCompany} />);
    expect(screen.getByText(/address:/i)).toBeInTheDocument();
    expect(screen.getByText('123 Innovation Drive, Toronto, ON')).toBeInTheDocument();
  });
});