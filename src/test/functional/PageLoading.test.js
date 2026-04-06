import { render, screen } from '@testing-library/react';
import TaskDashboard from '@/components/TaskDashboard';
import { useTasks1 } from '@/hooks/useTasks';
import { useCaseWorkers1 } from '@/hooks/useCaseWorkers';

// Mock the custom hooks
jest.mock('@/hooks/useTasks');
jest.mock('@/hooks/useCaseWorkers');

describe('TaskDashboard Loading', () => {
  it('shows loading spinner/text when fetching tasks', () => {
    useTasks1.mockReturnValue({ data: null, isLoading: true });
    useCaseWorkers1.mockReturnValue({ data: [], isLoadingCaseWorkers: false });

    render(<TaskDashboard />);
    expect(screen.getByText(/Loading tasks.../i)).toBeInTheDocument();
  });
});