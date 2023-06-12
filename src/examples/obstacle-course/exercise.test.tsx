import {
  fireEvent,
  render as renderComponent,
  screen,
} from '@testing-library/react';
import ObstacleCourse from '.';
import userEvent from '@testing-library/user-event';

const render = (
  ui: React.ReactElement,
  options?: Parameters<typeof renderComponent>[1],
) => {
  return {
    ...renderComponent(ui, options),
    user: userEvent.setup(),
  };
};

it('should input text into the input field', async () => {
  const { user } = render(<ObstacleCourse />);
  const thought = 'Ravioli are a form of pop tart.';

  // Type thought
  const thoughtInput = screen.getByLabelText('Deep Thought');
  await user.type(thoughtInput, thought);

  expect(thoughtInput).toHaveValue(thought);
});

it('should control a select input', async () => {
  const { user } = render(<ObstacleCourse />);
  const avengerSelect = screen.getByTestId('select-input');
  expect(avengerSelect).toHaveDisplayValue('Black Widow');
  expect(screen.getByTestId('select-result')).toHaveTextContent('Black Widow');

  // Select Iron Man
  await user.selectOptions(avengerSelect, 'Iron Man');
  expect(avengerSelect).toHaveDisplayValue('Iron Man');
  expect(screen.getByTestId('select-result')).toHaveTextContent('Iron Man');
});

it('should find and control a checkbox input', async () => {
  const { user } = render(<ObstacleCourse />);
  const onionCheckbox = screen.getByTestId('checkbox-onion');
  expect(onionCheckbox).not.toBeChecked();

  // Click checkbox
  await user.click(onionCheckbox);
  expect(onionCheckbox).toBeChecked();
  await user.click(onionCheckbox);
  expect(onionCheckbox).not.toBeChecked();
});

it('should find and control a radio input', async () => {
  const { user } = render(<ObstacleCourse />);
  const radioResult = screen.getByTestId('radio-result');

  // Select George
  const georgeRadio = screen.getByTestId('radio-george');
  await user.click(georgeRadio);
  expect(georgeRadio).toBeChecked();
  expect(radioResult).toHaveTextContent('George');

  // Select Ringo
  const ringoRadio = screen.getByTestId('radio-ringo');
  await user.click(ringoRadio);
  expect(georgeRadio).not.toBeChecked();
  expect(ringoRadio).toBeChecked();
  expect(radioResult).toHaveTextContent('Ringo');
});

it('should find and control a color input', async () => {
  render(<ObstacleCourse />);
  const colorInput = screen.getByTestId('color-input');
  const colorResult = screen.getByTestId('color-result');

  // Input blue
  fireEvent.input(colorInput, { target: { value: '#0000FF' } });
  expect(colorInput).toHaveValue('#0000ff');
  expect(colorResult).toHaveTextContent('#0000ff');
});

it('should find and control a date input', async () => {
  const { user } = render(<ObstacleCourse />);
  const dateInput = screen.getByTestId('date-input');
  const dateResult = screen.getByTestId('date-result');

  // Input date
  await user.clear(dateInput);
  await user.type(dateInput, '2023-06-12');
  expect(dateResult).toHaveTextContent('2023-06-12');
});

it('should find and control a range input', async () => {
  render(<ObstacleCourse />);
  const rangeInput = screen.getByTestId('range-input');
  const rangeResult = screen.getByTestId('range-result');

  // Select range
  fireEvent.input(rangeInput, { target: { value: '2' } });
  expect(rangeResult).toHaveTextContent('2');
});

it('should find and control a file input', async () => {
  const { user } = render(<ObstacleCourse />);
  const fileInput = screen.getByTestId('file-input');
  const fileResult = screen.getByTestId('file-result');

  // Upload file
  const file = new File(['resume'], 'resume.pdf', { type: 'application/pdf' });
  await user.upload(fileInput, file);
  expect(fileResult).toHaveTextContent('resume.pdf');
});
