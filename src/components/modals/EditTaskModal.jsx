import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { formatTaskDate } from '@/utils/date';

export function EditTaskModal({ task, isOpen, onClose, onSave, isLoading }) {
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    if (task) {
      reset({
        title: task.title,
        description: task.description,
        status: task.status,
        dueDate: task.dueDate ? task.dueDate.substring(0, 16) : '',
      });
    }
  }, [task, reset]);

  if (!isOpen || !task) return null;

  const FormRow = ({ label, children, isBox = false }) => (
    <div style={rowStyle}>
      <div style={labelContainer}>
        <strong>{label}</strong>
      </div>
      <div style={valueContainer}>
        {isBox ? (
          <div style={descriptionBox}>
            {children || 'No description provided.'}
          </div>
        ) : (
          children
        )}
      </div>
    </div>
  );

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <header style={modalHeader}>
          {/* <h3 style={{ margin: 0 }}>Edit Task #{task.id}</h3> */}
          <h3 style={{ margin: 0, color: '#1a1a1a' }}>Task Details</h3>
          <button type="button" onClick={onClose} style={closeIconStyle}>&times;</button>
        </header>

        <form onSubmit={handleSubmit(onSave)} style={{ padding: '25px 0' }}>
          <FormRow label="Title">{task.title}</FormRow>

          <FormRow label="Description" isBox={true}>
            {task.description}
          </FormRow>

          <FormRow label="Due Date">
            {formatTaskDate(task.dueDate) || 'No date set'}
          </FormRow>

          <FormRow label="Status">
            <select {...register("status")} style={selectStyle}>
              <option value="TODO">To-Do</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="COMPLETED">Completed</option>
            </select>
          </FormRow>

          <footer style={footerStyle}>
            <button type="button" onClick={onClose} style={cancelBtnStyle}>Cancel</button>
            <button type="submit" disabled={isLoading} style={saveBtnStyle}>
              {isLoading ? 'Saving...' : 'Save Changes'}
            </button>
          </footer>
        </form>
      </div>
    </div>
  );
}

// --- STYLES ---

const rowStyle = {
  display: 'flex',
  marginBottom: '20px',
  alignItems: 'flex-start' // This ensures labels stay at the top of the row
};

const labelContainer = {
  flex: '0 0 100px',
  textAlign: 'right',
  paddingRight: '20px',
  color: '#666',
  fontSize: '14px',
  lineHeight: '1.4',
  paddingTop: '2px' // Optical alignment with the first line of text
};

const valueContainer = {
  flex: '1',
  textAlign: 'left',
  color: '#1a1a1a',
  fontSize: '14px',
  lineHeight: '1.4',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start' // Force content to the top
};

const descriptionBox = {
  backgroundColor: '#f8f9fa',
  padding: '12px',
  borderRadius: '8px',
  color: '#444',
  border: '1px solid #e9ecef',
  lineHeight: '1.6',
  minHeight: '80px',      // Gives it a consistent "textbox" look
  display: 'block',       // Ensures text starts at the top-left
  textAlign: 'left',
  width: '100%',
  boxSizing: 'border-box'
};

// ... (Rest of modalHeader, selectStyle, etc. remains the same as previous)

const selectStyle = {
  width: '160px',
  padding: '8px 12px',
  borderRadius: '6px',
  border: '1px solid #ced4da',
  backgroundColor: 'white',
  fontSize: '14px',
  cursor: 'pointer'
};

const overlayStyle = { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1100 };
const modalStyle = { backgroundColor: 'white', padding: '30px', borderRadius: '16px', width: '500px', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' };
const modalHeader = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #eee', paddingBottom: '15px' };
const footerStyle = { marginTop: '10px', textAlign: 'right', display: 'flex', justifyContent: 'flex-end', gap: '12px', borderTop: '1px solid #eee', paddingTop: '20px' };
const closeIconStyle = { border: 'none', background: 'none', cursor: 'pointer', fontSize: '24px', color: '#adb5bd' };
const saveBtnStyle = { backgroundColor: '#1a1a1a', color: 'white', border: 'none', padding: '10px 24px', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' };
const cancelBtnStyle = { backgroundColor: '#f1f3f5', color: '#495057', border: 'none', padding: '10px 24px', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' };