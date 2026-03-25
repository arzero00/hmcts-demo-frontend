import { useTaskDashboardStore } from '@/stores/useTaskDashboardStore.ts';
import { useTasks, useDeleteTask } from '@/hooks/useTasks.ts';
import { useDeleteTask1,useTasks1, useUpdateStatus1 } from '@/hooks/useTasks.ts';
import { useCaseWorkers1 } from '@/hooks/useCaseWorkers.ts';
import {useState, useEffect, useMemo} from 'react'
import { AddTaskModal } from '@/components/AddTaskModal';
//import {ConfirmModal} from '@/components/ConfirmModal';
import {ViewTaskModal} from '@/components/ViewTaskModal';
import {formatTaskDate} from '@/utils/date'
import {EditTaskModal} from '@/components/EditTaskModal'
import {DeleteConfirmModal} from '@/components/DeleteConfirmModal'

function TaskDashboard() {
  const { selectedCaseWorkerId, setCaseWorkerId, toggleModal } = useTaskDashboardStore();
  const { data: tasks, isLoading } = useTasks1(selectedCaseWorkerId);
  const deleteMutation = useDeleteTask1(selectedCaseWorkerId);
  const { data: caseWorkers, isLoadingCaseWorkers } = useCaseWorkers1();
  const updateMutation = useUpdateStatus1(selectedCaseWorkerId);

// --- NEW: Sorting and Filtering State ---
  const [sortConfig, setSortConfig] = useState({ key: 'dueDate', direction: 'asc' });
  const [statusFilter, setStatusFilter] = useState('ALL');

  // --- Logic: Filter and Sort Tasks ---
    const processedTasks = useMemo(() => {
      if (!tasks) return [];

      // 1. Filter
      let filtered = [...tasks];
      if (statusFilter !== 'ALL') {
        filtered = filtered.filter(t => t.status === statusFilter);
      }

      // 2. Sort
      filtered.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
        if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });

      return filtered;
    }, [tasks, sortConfig, statusFilter]);

    const requestSort = (key) => {
      let direction = 'asc';
      if (sortConfig.key === key && sortConfig.direction === 'asc') {
        direction = 'desc';
      }
      setSortConfig({ key, direction });
    };

  const [viewingTask, setViewingTask] = useState(null); // Track task for View modal
const [editingTask, setEditingTask] = useState(null); // State for Edit Modal
const handleUpdateSave = (formData) => {
    updateMutation.mutate({ id: editingTask.id, ...formData }, {
      onSuccess: () => {
        setEditingTask(null); // Close modal
        //alert("Task updated!");
      }
    });
  };

    useEffect(() => {
        if (caseWorkers && caseWorkers.length > 0) {
          setCaseWorkerId(caseWorkers[0].caseWorkerId);
        }
      }, [caseWorkers, setCaseWorkerId]);

// State to manage the Delete Confirmation Modal
    const [taskToDelete, setTaskToDelete] = useState(null); // Stores { id, title }

//     const openDeleteConfirm = (task) => {
//       setTaskToDelete(task);
//     };
//
//     const handleConfirmDelete = () => {
//       if (taskToDelete) {
//         deleteMutation.mutate(taskToDelete.id, {
//           onSuccess: () => setTaskToDelete(null) // Close modal on success
//         });
//       }
//     };

const handleFinalDelete = () => {
    if (taskToDelete) {
      deleteMutation.mutate(taskToDelete.id, {
        onSuccess: () => {
          setTaskToDelete(null); // Close modal on success
        }
      });
    }
  };

// Helper to get Status Labels/Colors
const getStatusBadge = (status) => {
  const styles = {
    'TODO': { label: '📝 Todo', color: '#6c757d' },
    'IN_PROGRESS': { label: '⏳ In Progress', color: '#007bff' },
    'COMPLETED': { label: '✅ Completed', color: '#28a745' }
  };
  const config = styles[status] || { label: status, color: 'black' };
  return <span style={{ color: config.color, fontWeight: 'bold' }}>{config.label}</span>;
}

    const handleSelectChange = (e) => {
        const selectedId = e.target.value;

        // 1. Update the UI/Store state with the ID
        setCaseWorkerId(selectedId);

        // 2. Find the full object in the array to pass to your callback
        if (selectedId !== 'all') {
          const selectedWorker = caseWorkers?.find(w => w.caseWorkerId === selectedId);
          //myCallbackFunction(selectedWorker); // This now has the full object
        }
      };

    if(isLoadingCaseWorkers){
        return <p>Case Workers loading</p>
    }



  return (
    <div style={{ padding: '20px' }}>
      {/* 3a & 3b: Header Section */}
      <header style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <select value={selectedCaseWorkerId} onChange={handleSelectChange}>
          {caseWorkers?.map((worker) => (
                  <option key={worker.caseWorkerId} value={worker.caseWorkerId}>
                    {/* Requirement 1: Show ID + Name */}
                    {worker.caseWorkerId} - {worker.name}
                  </option>
                ))}
        </select>

        <button onClick={toggleModal} style={{ backgroundColor: 'white', color: 'Black' }}>
          + Add Task
        </button>
      </header>

      {/* 4: The Tasks Table */}
      {isLoading ? <p>Loading tasks...</p> : (
        <table style={tableStyle}>
                  <thead>
                    <tr>
                      <th width='180px' style={thStyle} onClick={() => requestSort('dueDate')}>Due Date {sortConfig.key === 'dueDate' ? (sortConfig.direction === 'asc' ? '🔼' : '🔽') : ''}</th>
                      <th style={thStyle} onClick={() => requestSort('title')}>Title {sortConfig.key === 'title' ? (sortConfig.direction === 'asc' ? '🔼' : '🔽') : ''}</th>
                      <th style={thStyle} onClick={() => requestSort('description')}>Description {sortConfig.key === 'description' ? (sortConfig.direction === 'asc' ? '🔼' : '🔽') : ''}</th>
                      <th width='150px' style={thStyle}>
                        Status
                        <select
                          value={statusFilter}
                          onChange={(e) => setStatusFilter(e.target.value)}
                          onClick={(e) => e.stopPropagation()} // Prevent sort trigger
                          style={{ marginLeft: '10px', fontSize: '12px' }}
                        >
                          <option value="ALL">All</option>
                          <option value="TODO">Todo</option>
                          <option value="IN_PROGRESS">In Progress</option>
                          <option value="COMPLETED">Completed</option>
                        </select>
                      </th>
                      <th style={{ ...thStyle, width: '180px', cursor: 'default' }}>Operations</th>
                    </tr>
                  </thead>
                  <tbody>
                    {processedTasks.map((task) => (
                      <tr key={task.id}>
                        <td style={tdStyle}>{formatTaskDate(task.dueDate)}</td>
                        <td style={ellipsisStyle} title={task.title}>{task.title}</td>
                        <td style={ellipsisStyle} title={task.description}>{task.description}</td>
                        <td style={tdStyle}>{getStatusBadge(task.status)}</td>
                        <td style={tdStyle}>
                          <button onClick={() => setViewingTask(task)}>View</button>&nbsp;
                          <button onClick={() => setEditingTask(task)}>Update</button>&nbsp;
                          <button onClick={() => setTaskToDelete(task)} style={{ color: 'red' }}>Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
        <AddTaskModal/>

        <ViewTaskModal
                isOpen={!!viewingTask}
                task={viewingTask}
                onClose={() => setViewingTask(null)}
              />



      {/* --- The New Edit Modal --- */}
            <EditTaskModal
              isOpen={!!editingTask}
              task={editingTask}
              onClose={() => setEditingTask(null)}
              onSave={handleUpdateSave}
              isLoading={updateMutation.isPending}
            />

            {/* --- Detailed Delete Confirmation Modal --- */}
                  <DeleteConfirmModal
                    isOpen={!!taskToDelete}
                    task={taskToDelete}
                    onCancel={() => setTaskToDelete(null)}
                    onConfirm={handleFinalDelete}
                    isLoading={deleteMutation.isPending}
                  />
    </div>
  );
}

// --- STYLES ---
const tableStyle = {
  width: '100%',
  borderCollapse: 'collapse',
  tableLayout: 'fixed', // Essential for fixed column widths
};

const thStyle = {
  border: '1px solid #ddd',
  padding: '12px 8px',
  backgroundColor: '#f4f4f4',
  cursor: 'pointer',
  textAlign: 'left',
  //width: '150px' // Default width for columns
};

const tdStyle = {
  border: '1px solid #ddd',
  padding: '8px',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textAlign: 'left',
};

const ellipsisStyle = {
  ...tdStyle,
  textOverflow: 'ellipsis', // Adds the "..."
  maxWidth: '0', // Important for ellipsis to work in table cells
  textAlign: 'left',
};

export default TaskDashboard