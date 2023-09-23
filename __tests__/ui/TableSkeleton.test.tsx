/* eslint-disable no-undef */
import React from 'react';
import { render, screen } from '@testing-library/react';
import TableSkeleton from '@/app/[locale]/components/ui/skeleton/table/TableSkeleton';

describe('TableSkeleton', () => {
  it('renders', () => {
    const { container } = render(<TableSkeleton />)
    const table = screen.getByRole('table');
    expect(table).toBeInTheDocument();
    expect(table).toHaveClass('table-skeleton')
    expect(container).toMatchSnapshot();
  })
})