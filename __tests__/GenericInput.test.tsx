/* eslint-disable no-undef */
import React from 'react';
import { render } from '@testing-library/react';
import GenericInput from '@/app/[locale]/components/ui/inputs/generic/GenericInput';

const mock = {
  label: 'form input',
  value: 'form input value',
};

describe('GenericInput', () => {
  it('renders', () => {
    const handleChange = jest.fn();
    const { container } = render(
      <GenericInput 
        label={mock.label}
        value={mock.value}
        type='text'
        onChange={handleChange} 
      />
    );
    expect(container).toMatchSnapshot();
  })
})