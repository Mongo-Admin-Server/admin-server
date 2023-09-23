/* eslint-disable no-undef */
import { fireEvent, render, screen } from '@testing-library/react'
import GenericButton from '@/app/[locale]/components/ui/button/GenericButton'

const mock = {
  label: 'Generic button'
}
describe("GenericButton", () => {
  it('renders', () => {
    const { container } = render(<GenericButton >{mock.label}</GenericButton>)
    expect(container).toMatchSnapshot();
  })

  it('has working props', () => {
    const handleClick = jest.fn();
    render(
      <GenericButton 
        type='button' 
        onClick={handleClick} 
        disabled={false}
      >
        {mock.label}
      </GenericButton>
    );
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Generic button')
    expect(button).toHaveClass('button')
    fireEvent.click(button)
    expect(handleClick).toHaveBeenCalledTimes(1);
  })

  it('can be disabled', () => {
    const handleClick = jest.fn();
    render(
      <GenericButton 
        disabled={true} 
        onClick={handleClick}
      >
        {mock.label}
      </GenericButton>
    )
    const button = screen.getByRole('button')
    expect(button).toHaveAttribute('disabled')
    fireEvent.click(button)
    expect(handleClick).toHaveBeenCalledTimes(0)
  })
})