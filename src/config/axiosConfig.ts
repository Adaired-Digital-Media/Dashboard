import axios, { AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { getCookie, setCookie, deleteCookie } from "cookies-next";
import { redirect } from "next/navigation";
import Swal from "sweetalert2";

// Define API base configuration
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

// Interface for token response
interface TokenResponse {
  accessToken: string;
  refreshToken: string;
}

// Function to manage tokens
const manageTokens = (data: TokenResponse): void => {
  if (data.accessToken) {
    setCookie("accessToken", data.accessToken, {
      maxAge: 3600, // 1 hour
      path: "/",
      secure: true,
      sameSite: "none",
    });
  }
  if (data.refreshToken) {
    setCookie("refreshToken", data.refreshToken, {
      maxAge: 28800, // 8 hours
      path: "/",
      secure: true,
      sameSite: "none",
    });
  }
};

// Function to show error messages
const showError = (): void => {
  Swal.fire({
    title: "Error",
    text: "Failed to refresh access token. Please login again.",
    icon: "error",
    confirmButtonText: "Okay",
  });
};

// Function to refresh the access token
const refreshAccessToken = async (): Promise<string | undefined> => {
  const refreshToken = getCookie("refreshToken") as string | undefined;
  if (!refreshToken) {
    // If refresh token is missing, redirect to login
    deleteCookie("accessToken");
    deleteCookie("refreshToken");
    redirect("/auth/login");
    return;
  }

  try {
    const { data } = await axios.post<TokenResponse>(
      `${process.env.NEXT_PUBLIC_BASE_URL}/auth/refresh-token`,
      { refreshToken }
    );

    manageTokens(data);
    return data.accessToken;
  } catch (error) {
    console.error(
      "Refresh token expired or invalid. Please login again. : ",
      error
    );
    showError();
    deleteCookie("accessToken");
    deleteCookie("refreshToken");
    redirect("/auth/login");
  }
};

// Request interceptor to add the access token to headers
api.interceptors.request.use(async (config: InternalAxiosRequestConfig) => {
  const accessToken = getCookie("accessToken") as string | undefined;
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

// Response interceptor to handle expired access tokens
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    // Check if the current URL is not the login page
    const isLoginPage =
      typeof window !== "undefined" &&
      window.location.pathname === "/auth/login";

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !isLoginPage
    ) {
      originalRequest._retry = true;
      const newAccessToken = await refreshAccessToken();
      if (newAccessToken) {
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axios(originalRequest);
      }
    }
    return Promise.reject(error);
  }
);

// Refresh the access token periodically (client-side only)
if (typeof window !== "undefined") {
  setInterval(() => {
    const isLoginPage = window.location.pathname === "/auth/login";
    if (!isLoginPage) {
      refreshAccessToken();
    }
  }, 60 * 60 * 1000); // 1 hour interval
}

export default api;
