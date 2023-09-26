/* eslint-disable no-undef */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import GenericModal from '@/app/[locale]/components/modal/generic/GenericModal';

describe('Generic Modal', () => {
  const locale = 'fr';
  const message = require(`../../shared/locales/${locale}.json`)
  it("renders", () => {
    const handleClose = jest.fn();
    const handleValidate= jest.fn();
    const { container } = render(
      <NextIntlClientProvider locale={locale} messages={message}>
        <GenericModal 
          open={true}
          title="Title Generic Modal"
          onClose={handleClose}
          onValidate={handleValidate} 
        >
        </GenericModal>
      </NextIntlClientProvider>
    )
    expect(screen.findByText('Title Generic Modal')).toBeInTheDocument
    expect(container).toMatchSnapshot();
  })
})