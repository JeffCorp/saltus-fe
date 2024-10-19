import axios, { AxiosError } from "axios";
import { getSession, signOut } from "next-auth/react";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001",
});

apiClient.interceptors.request.use(async (config) => {
  const session = await getSession();
  if (session && session.accessToken) {
    config.headers.Authorization = `Bearer ${session.accessToken}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config;
    if (
      error.response?.status === 401 &&
      originalRequest &&
      !("_retry" in originalRequest)
    ) {
      (originalRequest as any)._retry = true;
      try {
        const session = await getSession();
        const refreshToken = session?.refreshToken;

        if (!refreshToken) {
          throw new Error("No refresh token available");
        }

        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh-token`,
          {
            refreshToken,
          }
        );

        const { accessToken, refreshToken: newRefreshToken } = response.data;

        // Update the session with the new tokens
        // Note: You'll need to implement a method to update the session
        // This is just a placeholder and won't work as-is
        await updateSession({ accessToken, refreshToken: newRefreshToken });

        // Retry the original request with the new token
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return axios(originalRequest);
      } catch (refreshError) {
        console.error("Error refreshing token:", refreshError);
        // If refresh fails, sign out the user
        await signOut({ callbackUrl: "/login" });
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

// This function needs to be implemented to update the session
// It might involve calling an API endpoint or using NextAuth methods
async function updateSession(tokens: {
  accessToken: string;
  refreshToken: string;
}) {
  // Implement session update logic here
  console.log("Updating session with new tokens:", tokens);
}

export default apiClient;
