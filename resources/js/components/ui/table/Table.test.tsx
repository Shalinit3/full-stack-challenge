import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Table, { Column } from './Table';

const columns: Column<{ name: string; email: string }>[] = [
  { header: 'Name', key: 'name' },
  { header: 'Email', key: 'email' },
];

const testData= [
  { id: 1, name: 'Alice', email: 'alice@example.com' },
  { id: 2, name: 'Bob', email: 'bob@example.com' },
];

describe('Table component', () => {
  it('renders column headers and row data', () => {
    render(<Table columns={columns} data={testData} />);

    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByText('bob@example.com')).toBeInTheDocument();
  });

  it('calls onRowClick when a row is clicked', () => {
    const onRowClick = jest.fn();
    render(<Table columns={columns} data={testData} onRowClick={onRowClick} />);

    fireEvent.click(screen.getByText('Alice'));
    expect(onRowClick).toHaveBeenCalledWith(testData[0]);
  });

  it('renders action buttons and handles click', () => {
    const actionClick = jest.fn();
    const actions = [
      {
        icon: <span>Edit</span>,
        onClick: actionClick,
        label: 'Edit',
      },
    ];

    render(<Table columns={columns} data={testData} actions={actions} />);
    const button = screen.getAllByRole('button', { name: 'Edit' })[0];
    fireEvent.click(button);
    expect(actionClick).toHaveBeenCalledTimes(1);
  });

  it('does not trigger onRowClick when action button is clicked', () => {
    const onRowClick = jest.fn();
    const actionClick = jest.fn();
    const actions = [
      {
        icon: <span>Delete</span>,
        onClick: actionClick,
        label: 'Delete',
      },
    ];

    render(<Table columns={columns} data={testData} actions={actions} onRowClick={onRowClick} />);
    fireEvent.click(screen.getAllByRole('button', { name: 'Delete' })[0]);
    expect(onRowClick).not.toHaveBeenCalled();
    expect(actionClick).toHaveBeenCalledTimes(1);
  });

  it('renders empty state when no data is provided', () => {
    render(<Table columns={columns} data={[]} />);
    expect(screen.getByText(/no data available/i)).toBeInTheDocument();
  });
});