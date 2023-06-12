import { render, screen } from 'test/utilities';
import PackingList from '.';

it('renders the Packing List application', () => {
  render(<PackingList />);
});

it('has the correct title', async () => {
  render(<PackingList />);
  screen.getByText('Packing List');
});

it('has an input field for a new item', () => {
  render(<PackingList />);
  screen.getByLabelText('New Item Name');
});

it('has a "Add New Item" button that is disabled when the input is empty', () => {
  render(<PackingList />);
  const newItemInput = screen.getByLabelText('New Item Name');
  const addNewItemButton = screen.getByRole('button', { name: 'Add New Item' });

  expect(newItemInput).toHaveValue('');
  expect(addNewItemButton).toBeDisabled();
});

it('enables the "Add New Item" button when there is text in the input field', async () => {
  const { user } = render(<PackingList />);
  const newItemInput = screen.getByLabelText('New Item Name');
  const addNewItemButton = screen.getByRole('button', { name: 'Add New Item' });

  // Type text in the input
  await user.type(newItemInput, 'MacBook Pro');
  expect(newItemInput).toHaveValue('MacBook Pro');
  expect(addNewItemButton).toBeEnabled();
});

it('adds a new item to the unpacked item list when the clicking "Add New Item"', async () => {
  const { user } = render(<PackingList />);
  const newItemInput = screen.getByLabelText('New Item Name');
  const addNewItemButton = screen.getByRole('button', { name: 'Add New Item' });

  // Add new item to the unpacked item list
  await user.type(newItemInput, 'iPad Pro');
  await user.click(addNewItemButton);
  expect(screen.getByLabelText('iPad Pro')).not.toBeChecked();
});

it('adds a new item to the packed item list when the clicking checkbox', async () => {
  const { user } = render(<PackingList />);
  const newItemInput = screen.getByLabelText('New Item Name');
  const addNewItemButton = screen.getByRole('button', { name: 'Add New Item' });

  // Add new item to the unpacked item list
  await user.type(newItemInput, 'iPhone 12');
  await user.click(addNewItemButton);

  // Click checkbox
  const newItemCheckbox = screen.getByLabelText('iPhone 12');
  await user.click(newItemCheckbox);

  expect(newItemCheckbox).toBeChecked();
});

it('removes an item when the remove button is clicked', async () => {
  const { user } = render(<PackingList />);
  const newItemInput = screen.getByLabelText('New Item Name');
  const addNewItemButton = screen.getByRole('button', { name: 'Add New Item' });

  // Add new item to the unpacked item list
  await user.type(newItemInput, 'iPhone 13');
  await user.click(addNewItemButton);

  // Click remove button
  const item = screen.getByLabelText('iPhone 13');
  const removeItemButton = screen.getByRole('button', {
    name: 'Remove iPhone 13',
  });
  await user.click(removeItemButton);

  expect(item).not.toBeInTheDocument();
});
