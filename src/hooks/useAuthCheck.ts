"use client";
import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { getCookie, setCookie } from "cookies-next";
import Swal from "sweetalert2";
import axios from "axios";

const useAuthCheck = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  const checkAuthStatus = useCallback(async () => {
    const accessToken = getCookie("accessToken");
    const refreshToken = getCookie("refreshToken");

    // If both tokens are missing, redirect immediately
    if (!refreshToken) {
      router.push("/auth/login");
      return;
    }

    // If access token is missing but refresh token is present, attempt to refresh
    if (!accessToken) {
      try {
        const { data } = await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_URL}/auth/refresh-token`,
          { refreshToken }
        );

        // Store new tokens in cookies
        setCookie("accessToken", data.accessToken, {
          maxAge: 3600, // 1 hour
          secure: true,
          sameSite: "none",
          path: "/",
        });
        setCookie("refreshToken", data.refreshToken, {
          maxAge: 28800, // 8 hours
          secure: true,
          sameSite: "none",
          path: "/",
        });

        // Redirect to dashboard if on an auth page
        if (window.location.pathname.startsWith("/auth")) {
          router.push("/dashboard");
        }
      } catch {
        Swal.fire({
          title: "Session Expired",
          text: "Please log in again.",
          icon: "warning",
          confirmButtonText: "Okay",
        });
        router.push("/auth/login");
      }
    } else {
      // Redirect authenticated users away from auth pages
      if (window.location.pathname.startsWith("/auth")) {
        router.push("/dashboard");
      }
    }
    
    // Mark loading as complete
    setLoading(false);
  }, [router]);

  useEffect(() => {
    checkAuthStatus();
  }, [checkAuthStatus]);

  return loading;
};

export default useAuthCheck;
