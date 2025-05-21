import apiClient from "@/lib/api-client";
import { ResumeData } from "@/types/resume";
import { useMutation } from "@tanstack/react-query";

export const useResumeAnalysis = ({
  onSuccess,
  onError,
}: {
  onSuccess: (data: ResumeData) => void;
  onError: (error: Error) => void;
}) => {
  return useMutation({
    mutationFn: async ({
      resume,
      jobDescription,
    }: {
      resume: File;
      jobDescription: string;
    }) => {
      const formData = new FormData();
      formData.append("resume", resume);
      formData.append("jobDescription", jobDescription);

      const response = await apiClient.post<ResumeData>(
        "/resume/analyze",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("response.data", response.data);

      if ([200, 201].includes(response.status)) {
        onSuccess(response.data);
      } else {
        onError(new Error("Failed to analyze resume"));
      }

      return response.data;
    },
  });
};

export const useGeneratePDF = () => {
  return useMutation({
    mutationFn: async (resumeData: ResumeData) => {
      const response = await apiClient.post("/resume/generate-pdf", resumeData);

      // Create and download the optimized PDF
      const { file, filename } = response.data;
      const blob = new Blob([Buffer.from(file, "base64")], {
        type: "application/pdf",
      });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);

      return response.data;
    },
  });
};

export const useResumeOptimization = () => {
  return useMutation({
    mutationFn: async ({
      resume,
      jobDescription,
    }: {
      resume: File;
      jobDescription: string;
    }) => {
      const formData = new FormData();
      formData.append("resume", resume);
      formData.append("jobDescription", jobDescription);

      const response = await fetch("/api/resume/optimize", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Failed to optimize resume");
      return response.blob();
    },
  });
};
