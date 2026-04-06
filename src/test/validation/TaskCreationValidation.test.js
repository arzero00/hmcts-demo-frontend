import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { AddTaskModal } from '@/components/modals/AddTaskModal';

describe('Form Validation & Error Handling', () => {
  it('displays error messages for missing required fields', async () => {
    render(<AddTaskModal />);

    // Submit empty form
    fireEvent.click(screen.getByRole('button', { name: /Create Task/i }));

    expect(await screen.findByText(/Title is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/Date is required/i)).toBeInTheDocument();
  });

  it('displays error when title exceeds character limit', async () => {
    render(<AddTaskModal />);

    const longTitle = 'A'.repeat(61);
    fireEvent.change(screen.getByPlaceholderText(/Enter task title.../i), { target: { value: longTitle } });
    fireEvent.click(screen.getByRole('button', { name: /Create Task/i }));

    expect(await screen.findByText(/Title cannot exceed 60 characters/i)).toBeInTheDocument();
  });
});