/* eslint-disable no-undef */
import React from 'react';
import { render } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import Pagination from '@/app/[locale]/components/ui/pagination/Pagination';

jest.mock('next-intl/client', () => ({
  usePathname() {
    return '';
  },
  useRouter() {
    return {
      push: () => jest.fn(),
      replace: () => jest.fn(),
    };
  },
}));
  
const locale = 'fr';
const message = require(`../../shared/locales/${locale}.json`)

const mockPagination = {
  total: 10,
  currentPage: 1,
  pageSizes: [10, 50, 100, 200],
  pageSize: 10,
}
describe("Pagination", () => {
  it('renders', () => {
    const handleChange = jest.fn();
    const handlePageSizeChange = jest.fn();
    const { container } = render(
    <NextIntlClientProvider locale={locale} messages={message}>
      <Pagination 
        total={mockPagination.total}
        currentPage={mockPagination.currentPage}
        pageSizes={mockPagination.pageSizes}
        pageSize={mockPagination.pageSize}
        onChange={handleChange}
        onPageSizeChange={handlePageSizeChange}
      />
    </NextIntlClientProvider>
    );
    expect(container).toMatchSnapshot();
  })
})