// @vitest-environment happy-dom

import { screen } from '@testing-library/react';
import Counter from '.';
import { render } from './test/utilities';

test('it should render the component', () => {
  render(<Counter />);
});

test('it should increment when the "Increment" button is pressed', async () => {
  const { user } = render(<Counter />);
  const currentCount = screen.getByTestId('current-count');
  expect(currentCount).toHaveTextContent('0');
  // Click the "Increment" button
  const button = screen.getByRole('button', { name: 'Increment' });
  await user.click(button);
  // fireEvent.click(button);
  expect(currentCount).toHaveTextContent('1');
});
