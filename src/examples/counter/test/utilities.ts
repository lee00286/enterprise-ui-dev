import { render as renderComponent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

export * from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

export const render = (
  ui: React.ReactElement,
  options?: Parameters<typeof renderComponent>[1],
) => {
  return {
    ...renderComponent(ui, options),
    user: userEvent.setup(),
  };
};
