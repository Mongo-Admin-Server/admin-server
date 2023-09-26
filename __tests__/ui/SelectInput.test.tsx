/* eslint-disable no-undef */
import React from 'react';
import { render } from '@testing-library/react';
import SelectInput from '@/app/[locale]/components/ui/inputs/select/SelectInput';

const mock = {
  label: 'form Select',
  value: 'form Select value',
};
const optionsLanguages=  [
  { value: 'fr', label: 'Français', },
  { value: 'en', label: 'Anglais', },
  { value: 'es', label: 'Espagnol', },
];

describe('SelectInput', () => {
  it('renders', () => {
    const handleChange = jest.fn();
    const { container } = render(
      <SelectInput 
        label={mock.label}
        value={mock.value}
        options={optionsLanguages}
        onChange={handleChange} 
      />
    );
    expect(container).toMatchSnapshot();
  })
})