import { test, expect, vi, beforeEach, afterEach } from 'vitest';
import { render } from 'test/utilities';
import TimeZone from '.';

beforeEach(() => {
  vi.useFakeTimers();
  vi.setSystemTime(new Date(2012, 9, 19));
});

afterEach(() => {
  vi.useRealTimers();
});

test('it should render successfully', () => {
  render(<TimeZone />);
});

test.fails('should match the snapshot', async () => {
  const { container } = render(<TimeZone getTodos />);
  expect(container).toMatchSnapshot();
});
