/* eslint-disable no-undef */
import React from 'react';
import { render } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import Table from '@/app/[locale]/components/ui/table/Table';

describe("Table", () => {
  it('renders', () => {
    const locale = 'fr';
    const message = require(`../../shared/locales/${locale}.json`)
    const handleClick = jest.fn();
    const { container } = render(
      <NextIntlClientProvider locale={locale} messages={message}>
        <Table
          data_header={['Mock title', 'Mock sub tile']}
          data_body={['mock title', 'mock sub title']} 
          actions={['trash']}
          onClick={handleClick}
        />
      </NextIntlClientProvider>

    );
    expect(container).toMatchSnapshot();
  })
})