import { useForm } from 'react-hook-form';
import { useTaskDashboardStore } from '@/stores/useTaskDashboardStore';
import { useCreateTask1 } from '@/hooks/useTasks';

type TaskFormData = {
  title: string;
  description: string;
  status: string;
  dueDate: string;
};

export function AddTaskModal() {
  const { selectedCaseWorkerId, isModalOpen, toggleModal } = useTaskDashboardStore();
  const createTaskMutation = useCreateTask1(selectedCaseWorkerId);

  // Initialize React Hook Form
  const { register, handleSubmit, reset, formState: { errors } } = useForm<TaskFormData>({
    defaultValues: { status: 'PENDING' }
  });

  const onSubmit = (data: TaskFormData) => {
    createTaskMutation.mutate(data, {
      onSuccess: () => {
        reset(); // Clear form
        toggleModal(); // Close modal
      },
    });
  };

  if (!isModalOpen) return null;

  return (
    <div className="modal-overlay" style={modalOverlayStyle}>
      <div className="modal-content" style={modalContentStyle}>
        <h2>Add New Task (User: {selectedCaseWorkerId})</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label>Title</label>
            <input {...register("title", { required: "Title is required" })} />
            {errors.title && <p style={{color: 'red'}}>{errors.title.message}</p>}
          </div>

          <div>
            <label>Description</label>
            <textarea {...register("description")} />
          </div>

          <div>
            <label>Status</label>
            <select {...register("status")}>
              <option value="PENDING">Pending</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="COMPLETED">Completed</option>
            </select>
          </div>

          <div>
            <label>Due Date & Time</label>
            <input type="datetime-local" {...register("dueDate", { required: true })} />
          </div>

          <div style={{ marginTop: '20px' }}>
            <button type="button" onClick={toggleModal}>Cancel</button>
            <button type="submit" disabled={createTaskMutation.isPending}>
              {createTaskMutation.isPending ? 'Saving...' : 'Create Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Simple styles for the demonstration
const modalOverlayStyle: React.CSSProperties = {
  position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
  backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center'
};
const modalContentStyle: React.CSSProperties = {
  backgroundColor: 'white', padding: '30px', borderRadius: '8px', width: '400px'
};