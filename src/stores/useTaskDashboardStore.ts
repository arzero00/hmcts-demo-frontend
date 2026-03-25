import { create } from 'zustand';

export const useTaskDashboardStore = create((set) => ({
  selectedCaseWorkerId: '', // 'all' or a specific ID
  setCaseWorkerId: (id) => set({ selectedCaseWorkerId: id }),

  isModalOpen: false,
  toggleModal: () => set((state) => ({ isModalOpen: !state.isModalOpen })),
  increment: () => set((state) => ({ count: state.count + 1 }))
}));



//console.log('before:', useTaskStore.getState());
//console.log('before:', useTaskStore.getState().selectedUserId);
