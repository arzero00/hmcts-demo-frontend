import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { AddTaskModal } from '@/components/modals/AddTaskModal';
import { useCreateTask1 } from '@/hooks/useTasks';

jest.mock('@/hooks/useTasks');

describe('AddTaskModal Submission', () => {
  it('submits the form with valid data', async () => {
    const mockMutate = jest.fn();
    useCreateTask1.mockReturnValue({ mutate: mockMutate, isPending: false });

    render(<AddTaskModal />);

    // Fill out the form
    fireEvent.change(screen.getByPlaceholderText(/Enter task title.../i), { target: { value: 'Test Task' } });
    fireEvent.change(screen.getByPlaceholderText(/Add details about the task.../i), { target: { value: 'Test Description' } });
    fireEvent.change(screen.getByLabelText(/Due Date/i), { target: { value: '2026-12-31T23:59' } });

    // Submit
    fireEvent.click(screen.getByRole('button', { name: /Create Task/i }));

    await waitFor(() => {
      expect(mockMutate).toHaveBeenCalledWith(
        expect.objectContaining({
          title: 'Test Task',
          description: 'Test Description',
        }),
        expect.any(Object)
      );
    });
  });
});