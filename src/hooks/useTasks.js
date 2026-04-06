import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const API_URL = 'http://localhost:4000/api/v1/tasks';

/**
 * Helper to include the X-USER-ID header required by the Spring Boot Controller
 */
async function apiRequest(endpoint, userId, options = {}) {
  const res = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'X-USER-ID': userId, // Required by @RequestHeader("X-USER-ID")
      ...options.headers,
    },
  });

  if (!res.ok) {
    // Spring Boot returns standard error bodies; we throw them for TanStack to catch
    const error = await res.json().catch(() => ({ message: 'API Error' }));
    throw new Error(error.message || 'Something went wrong');
  }

  // Handle 204 No Content for Delete
  if (res.status === 204) return null;
  return res.json();
}


export const useTasks1 = (userId) => {
  return useQuery({
    queryKey: ['tasks', userId],
    queryFn: () => apiRequest('', userId),
    enabled: !!userId && userId !== 'all', // Only fetch if we have a valid ID
  });
};


export const useCreateTask1 = (userId) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (taskData) => apiRequest('', userId, {
      method: 'POST',
      body: JSON.stringify(taskData),
    }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['tasks', userId] }),
  });
};

export const useUpdateStatus1 = (userId) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }) => apiRequest(`/${id}/status`, userId, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['tasks', userId] }),
  });
};

export const useUpdateTask1 = (userId) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }) => apiRequest(`/${id}/status`, userId, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['tasks', userId] }),
  });
};

export const useDeleteTask1 = (userId) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => apiRequest(`/${id}`, userId, { method: 'DELETE' }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['tasks', userId] }),
  });
};

//------------------------------------------

export const useTasks = (userId) => {
  return useQuery({
    queryKey: ['tasks', userId],
    queryFn: async () => {
      const url = userId === 'all' ? API_URL : `${API_URL}?userId=${userId}`;
      const res = await fetch(url);
      return res.json();
    },
  });
};

// Example Mutation for Deleting
export const useDeleteTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (taskId) => fetch(`${API_URL}/${taskId}`, { method: 'DELETE' }),
    onSuccess: () => {
      // This "Invalidates" the cache, forcing a refresh of the table
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      alert("Task deleted successfully!");
    },
  });
};

export const useTask = (taskId) => {
  return useQuery({
    queryKey: ['task', taskId],
    queryFn: async () => {
      const url = `${API_URL}/${taskId}`;
      const res = await fetch(url);
      return res.json();
    },
  });
};