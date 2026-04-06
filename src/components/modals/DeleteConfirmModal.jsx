import { formatTaskDate } from '@/utils/date';

export function DeleteConfirmModal({ task, isOpen, onCancel, onConfirm, isLoading }) {
  if (!isOpen || !task) return null;

  // Reusable component for the mirrored alignment
    const DataRow = ({ label, value, isBox = false, minHeight = 'auto' }) => (
        <div style={rowStyle}>
          <div style={labelContainer}>
            <strong>{label}</strong>
          </div>
          <div style={valueContainer}>
            {isBox ? (
              <div style={{ ...descriptionBox, minHeight: minHeight }}>
                {value || 'No description provided.'}
              </div>
            ) : (
              value
            )}
          </div>
        </div>
      );

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <header style={modalHeader}>
          <h3 style={{ margin: 0, color: '#1a1a1a' }}>Task Details</h3>
          <button type="button" onClick={onCancel} style={closeIconStyle}>&times;</button>
        </header>


          <p style={warningTextStyle}>
            Are you sure you want to delete this task? This action cannot be undone.
          </p>


          <div style={{ padding: '0px 0' }}>
                    {/* <DataRow label="Task ID" value={`#${task.id}`} /> */}
                    <DataRow label="Title" value={task.title} />



                    {/* Now Description follows the exact same grid alignment */}
                    <DataRow
                      label="Description"
                      value={task.description}
                      isBox={true}
                      minHeight="50px"
                    />
                    <DataRow label="Due Date" value={formatTaskDate(task.dueDate) || 'No date set'} />
                    <DataRow label="Status" value={task.status} />
                  </div>

        <footer style={footerStyle}>
          <button onClick={onCancel} disabled={isLoading} style={cancelBtnStyle}>
            Cancel
          </button>
          <button onClick={onConfirm} disabled={isLoading} style={deleteBtnStyle}>
            {isLoading ? 'Deleting...' : 'Delete'}
          </button>
        </footer>
      </div>
    </div>
  );
}

// --- ALIGNMENT STYLES (Matching Edit/View Modals) ---

const rowStyle = {
  display: 'flex',
  marginBottom: '16px',
  alignItems: 'flex-start' // Keeps labels at the top even if value is a tall box
};

const labelContainer = {
  flex: '0 0 100px',    // Fixed width "spine"
  textAlign: 'right',   // Right-aligned labels
  paddingRight: '20px', // Clear gutter space
  color: '#666',
  fontSize: '14px',
  lineHeight: '1.4'     // Centers text vertically with first line of value
};

const valueContainer = {
  flex: '1',            // Takes remaining width
  textAlign: 'left',    // Left-aligned info
  color: '#1a1a1a',
  fontSize: '14px',
  wordBreak: 'break-word',
  lineHeight: '1.4'
};

const descriptionBox = {
  backgroundColor: '#f8f9fa',
  padding: '12px',
  borderRadius: '8px',
  fontSize: '14px',
  color: '#444',
  border: '1px solid #e9ecef',
  lineHeight: '1.6',
  marginTop: '-4px'     // Optical adjustment to align top of box with top of label
};

// --- COMPONENT SPECIFIC STYLES ---



const warningTextStyle = {
  fontSize: '14px',
  color: 'red',
  marginBottom: '20px',
  lineHeight: '1.5'
};

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

const footerStyle = {
  marginTop: '10px', textAlign: 'right', display: 'flex',
  justifyContent: 'flex-end', gap: '12px', paddingTop: '20px'
};

const closeIconStyle = { border: 'none', background: 'none', cursor: 'pointer', fontSize: '24px', color: '#adb5bd' };

const deleteBtnStyle = {
  backgroundColor: '#fa5252', color: 'white', border: 'none',
  padding: '10px 24px', borderRadius: '8px', cursor: 'pointer', fontWeight: '600'
};

const cancelBtnStyle = {
  backgroundColor: '#f1f3f5', color: '#495057', border: 'none',
  padding: '10px 24px', borderRadius: '8px', cursor: 'pointer', fontWeight: '600'
};