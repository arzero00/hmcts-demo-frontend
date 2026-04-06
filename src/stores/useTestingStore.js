import { create } from 'zustand';

export const useTaskStore = create((set1) => ({
    that: 'that is store', // 'all' or a specific ID
    nestLoop1:{
        nestLoop1a:{
            nestLoop1a1:{a:11}
        },
        nestLoop1b:{
            nestLoop1a1:{b:22}
        }
    },
  selectedUserId: 'all', // 'all' or a specific ID
  isModalOpen: false,
  count: 0,
  setUserId: (id) => set1({ selectedUserId: id }),
  toggleModal: () => set1((state) => ({ isModalOpen: !state.isModalOpen })),
  increment: () => set1((state) => ({ count: state.count + 1 }))
}));



//console.log('before:', useTaskStore.getState());
//console.log('before:', useTaskStore.getState().selectedUserId);
