import { config as envConfig } from "@/config";
import axios from "axios";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// Server-side axios instance (for API routes and Server Components only)
const axiosInstanceServer = axios.create({
  baseURL: envConfig.API_URL,
});

axiosInstanceServer.interceptors.request.use(
  async (config) => {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("session")?.value;

    const token = JSON.parse(sessionCookie || "{}")?.token;

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error("Error in request interceptor:", error);
    return Promise.reject(error);
  }
);

axiosInstanceServer.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      (await cookies()).delete("session");
      redirect("/signin");
    }
    return Promise.reject(error);
  }
);

export default axiosInstanceServer;
