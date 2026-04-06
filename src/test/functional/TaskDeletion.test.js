import { useTasks1 } from '@/hooks/useTasks';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import TaskDashboard from '@/components/TaskDashboard';

describe('Task Workflows', () => {
  const mockTasks = [{ id: 1, title: 'Old Title', status: 'TODO', dueDate: '2026-01-01' }];

  it('opens the delete confirmation modal when Delete is clicked', () => {
    useTasks1.mockReturnValue({ data: mockTasks, isLoading: false });
    render(<TaskDashboard />);

    fireEvent.click(screen.getByText(/Delete/i));
    expect(screen.getByText(/Are you sure you want to delete this task?/i)).toBeInTheDocument();
  });

  it('opens the edit modal with task data when Update is clicked', () => {
    useTasks1.mockReturnValue({ data: mockTasks, isLoading: false });
    render(<TaskDashboard />);

    fireEvent.click(screen.getByText(/Update/i));
    expect(screen.getByDisplayValue(/TODO/i)).toBeInTheDocument();
  });
});