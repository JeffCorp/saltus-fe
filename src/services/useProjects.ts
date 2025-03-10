import apiClient from "@/lib/api-client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface CreateProjectData {
  title: string;
  content: string;
  // Add other fields as needed
}

interface Project {
  id: string;
  difficulty: string;
  reportFrequency: string;
  selectedScenario: string;
  collaborators: string[];
  duration: number;
}

async function createProject(data: Project): Promise<any> {
  const response = await apiClient.post("/projects", data);
  return response.data;
}

async function updateProject(data: Project): Promise<any> {
  const response = await apiClient.put(`/projects/${data.id}`, data);
  return response.data;
}

async function getProject(): Promise<any> {
  const response = await apiClient.get("/projects");
  return response.data;
}

async function getScenarios(data: { difficulty: string }): Promise<any> {
  const response = await apiClient.post("/projects/generate-scenarios", data);
  return response.data;
}

async function getProjectById(id: string): Promise<any> {
  const response = await apiClient.get(`/projects/${id}`);
  return response.data;
}

async function likeProject(projectId: string): Promise<any> {
  const response = await apiClient.post(`/projects/${projectId}/like`);
  return response.data;
}

export function useGetProject() {
  return useMutation({
    mutationFn: getProject,
  });
}

export function useGetScenarios() {
  return useMutation({
    mutationFn: getScenarios,
  });
}

export function useGetProjectById() {
  return useMutation({
    mutationFn: getProjectById,
  });
}

export function useCreateProject({
  onSuccess,
  onError,
}: {
  onSuccess: () => void;
  onError: (error: any) => void;
}) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createProject,
    onSuccess: (newProject) => {
      // Invalidate and refetch posts list
      onSuccess();
      queryClient.invalidateQueries({ queryKey: ["projects"] });

      // Optionally, you can update the cache directly
      queryClient.setQueryData<any[]>(["projects"], (old) => {
        return old ? [...old, newProject] : [newProject];
      });
    },
    onError,
  });
}

export function useUpdateProject({
  onSuccess,
  onError,
}: {
  onSuccess: () => void;
  onError: (error: any) => void;
}) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProject,
    onSuccess: (newProject) => {
      // Invalidate and refetch posts list
      onSuccess();
      queryClient.invalidateQueries({ queryKey: ["projects"] });

      // Optionally, you can update the cache directly
      queryClient.setQueryData<any[]>(["projects"], (old) => {
        return old ? [...old, newProject] : [newProject];
      });
    },
    onError,
  });
}
