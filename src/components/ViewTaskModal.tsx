import { formatTaskDate } from '@/utils/date';

export function ViewTaskModal({ task, isOpen, onClose }) {
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
          <button onClick={onClose} style={closeIconStyle}>&times;</button>
        </header>

        <div style={{ padding: '25px 0' }}>
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

        <footer style={{ textAlign: 'right', borderTop: '1px solid #eee', paddingTop: '15px' }}>
          <button onClick={onClose} style={closeBtn}>Close</button>
        </footer>
      </div>
    </div>
  );
}

// --- ALIGNMENT STYLES ---

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

const closeIconStyle = { border: 'none', background: 'none', cursor: 'pointer', fontSize: '24px', color: '#adb5bd' };
const closeBtn = { padding: '10px 25px', backgroundColor: '#1a1a1a', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' };