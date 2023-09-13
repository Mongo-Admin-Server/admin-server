/* eslint-disable no-undef */
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import Checkbox from '@/app/[locale]/components/ui/inputs/checkbox/Checkbox';

const mock = {
  label: 'form checkbox',
  value: true
};

describe('Checkbox', () => {
  it('renders', () => {
    const handleChange = jest.fn();
    const { container } = render(
      <Checkbox 
        label={mock.label} 
        value={mock.value} 
        onChange={handleChange}
        disabled={false}
      />
    );

    expect(container).toMatchSnapshot();
  })
})