import { useForm } from 'react-hook-form';
import { useTaskDashboardStore } from '@/stores/useTaskDashboardStore';
import { useCreateTask1 } from '@/hooks/useTasks';
import { useEffect } from 'react';
// type TaskFormData = {
//   title: string;
//   description: string;
//   status: string;
//   dueDate: string;
// };

export function AddTaskModal() {
  const { selectedCaseWorkerId, isModalOpen, toggleModal } = useTaskDashboardStore();
  const createTaskMutation = useCreateTask1(selectedCaseWorkerId);

  // Initialize React Hook Form
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: { title: '',
                           description: '',
                           status: 'PENDING',
                           dueDate: '' }
  });

  const onSubmit = (data) => {
    createTaskMutation.mutate(data, {
      onSuccess: () => {
        reset(); // Clear form
        toggleModal(); // Close modal
      },
    });
  };

// Reset form whenever the modal is opened
  useEffect(() => {
    if (isModalOpen) {
      reset({
        title: '',
        description: '',
        status: 'PENDING',
        dueDate: ''
      });
    }
  }, [isModalOpen, reset]);

  if (!isModalOpen) return null;

  // Reusable component to match ViewTaskModal's alignment
    const FormRow = ({ label, children, error }) => (
      <div style={rowStyle}>
        <div style={labelContainer}>
          <strong>{label}</strong>
        </div>
        <div style={valueContainer}>
          {children}
          {error && <p style={errorText}>{error.message || "Required"}</p>}
        </div>
      </div>
    );

  return (
      <div style={overlayStyle}>
        <div style={modalStyle}>
          <header style={modalHeader}>
            <h3 style={{ margin: 0, color: '#1a1a1a' }}>Create New Task</h3>
            <button onClick={toggleModal} style={closeIconStyle}>&times;</button>
          </header>

          <form onSubmit={handleSubmit(onSubmit)} style={{ padding: '25px 0' }}>

            <FormRow label="Title" error={errors.title}>
              <input
                {...register("title", { required: "Title is required",
                    maxLength: {value: 200, message: "Title cannot exceed 200 characters"}})}
                style={inputStyle}
                placeholder="Enter task title..."
              />
            </FormRow>

            <FormRow label="Description" error={errors.description}>
              <textarea
                {...register("description", {maxLength: { value: 900, message: "Description cannot exceed 900 characters" }})}
                style={{ ...inputStyle, minHeight: '80px', resize: 'vertical' }}
                placeholder="Add details about the task..."
              />
            </FormRow>

            <FormRow label="Status">
              <select {...register("status")} style={inputStyle}>
                <option value="TODO">To-Do</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="COMPLETED">Completed</option>
              </select>
            </FormRow>

            <FormRow label="Due Date" error={errors.dueDate}>
              <input
                type="datetime-local"
                {...register("dueDate", { required: "Date is required",validate: (value) => !isNaN(Date.parse(value)) || "Invalid date format" })}
                style={inputStyle}
              />
            </FormRow>

            <footer style={modalFooter}>
              <button type="button" onClick={toggleModal} style={cancelBtn}>Cancel</button>
              <button type="submit" disabled={createTaskMutation.isPending} style={submitBtn}>
                {createTaskMutation.isPending ? 'Saving...' : 'Create Task'}
              </button>
            </footer>
          </form>
        </div>
      </div>
    );
}

// --- SHARED ALIGNMENT STYLES (Matching ViewTaskModal) ---

const rowStyle = {
  display: 'flex',
  marginBottom: '20px',
  alignItems: 'flex-start'
};

const labelContainer = {
  flex: '0 0 100px',
  textAlign: 'right',
  paddingRight: '20px',
  color: '#666',
  fontSize: '14px',
  lineHeight: '2.4' // Adjusted to align with input height
};

const valueContainer = {
  flex: '1',
  textAlign: 'left'
};

const inputStyle = {
  width: '100%',
  padding: '10px 12px',
  borderRadius: '8px',
  border: '1px solid #e9ecef',
  backgroundColor: '#f8f9fa',
  fontSize: '14px',
  color: '#1a1a1a',
  outline: 'none',
  boxSizing: 'border-box'
};

const errorText = {
  color: '#dc3545',
  fontSize: '12px',
  marginTop: '5px',
  marginBottom: 0
};

// --- GENERAL MODAL STYLES ---

const overlayStyle = {
  position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
  backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)',
  display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1100
};

const modalStyle = {
  backgroundColor: 'white', padding: '30px', borderRadius: '16px',
  width: '500px', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)'
};

const modalHeader = {
  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
  borderBottom: '1px solid #eee', paddingBottom: '15px'
};

const modalFooter = {
  textAlign: 'right',
  borderTop: '1px solid #eee',
  paddingTop: '20px',
  marginTop: '10px',
  display: 'flex',
  justifyContent: 'flex-end',
  gap: '12px'
};

const closeIconStyle = { border: 'none', background: 'none', cursor: 'pointer', fontSize: '24px', color: '#adb5bd' };

const cancelBtn = {
  padding: '10px 20px', backgroundColor: 'transparent', color: '#666',
  border: '1px solid #e9ecef', borderRadius: '8px', cursor: 'pointer', fontWeight: '600'
};

const submitBtn = {
  padding: '10px 25px', backgroundColor: '#1a1a1a', color: 'white',
  border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600'
};