/* eslint-disable no-undef */
import React from 'react';
import { render } from '@testing-library/react';
import Switch from '@/app/[locale]/components/ui/inputs/switch/Switch';

describe('Switch', () => {
    it('renders', () => {
      const handleChange = jest.fn();
      const { container } = render(
        <Switch 
          selected='table'
          options={['table', 'json']}
          onChange={handleChange} 
        />
      );
      expect(container).toMatchSnapshot();
    })
  })