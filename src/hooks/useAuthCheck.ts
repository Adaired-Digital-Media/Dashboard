"use client";
import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { getCookie, setCookie } from "cookies-next";
import Swal from "sweetalert2";
import axios from "axios";

const useAuthCheck = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  const refreshTokenFn = useCallback(async () => {
    const refreshToken = getCookie("refreshToken");

    if (!refreshToken) {
      router.push("/auth/login");
      return;
    }

    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/auth/refresh-token`,
        { refreshToken }
      );
      setCookie("accessToken", data.accessToken, {
        maxAge: 3600,
        secure: true,
        sameSite: "none",
        path: "/",
      });
      setCookie("refreshToken", data.refreshToken, {
        maxAge: 28800,
        secure: true,
        sameSite: "none",
        path: "/",
      });

      if (window.location.pathname.startsWith("/auth")) {
        router.push("/dashboard");
      }
    } catch (error) {
      Swal.fire({
        title: "Session Expired",
        text: "Please log in again.",
        icon: "warning",
        confirmButtonText: "Okay",
      });
      router.push("/auth/login");
    }
  }, [router]);

  const checkAuthStatus = useCallback(async () => {
    const accessToken = getCookie("accessToken");
    const refreshToken = getCookie("refreshToken");

    if (!refreshToken) {
      router.push("/auth/login");
      return;
    }

    if (!accessToken && refreshToken) {
      await refreshTokenFn();
    } else if (window.location.pathname.startsWith("/auth")) {
      router.push("/dashboard");
    }

    setLoading(false);
  }, [router, refreshTokenFn]);

  useEffect(() => {
    checkAuthStatus();
    const interval = setInterval(async () => {
      const accessToken = getCookie("accessToken");
      if (!accessToken) {
        await refreshTokenFn();
      }
    }, 55 * 60 * 1000);
    return () => clearInterval(interval);
  }, [checkAuthStatus, refreshTokenFn]);

  return loading;
};

export default useAuthCheck;

// "use client";
// import { useEffect, useState, useCallback } from "react";
// import { useRouter } from "next/navigation";
// import { getCookie, setCookie } from "cookies-next";
// import Swal from "sweetalert2";
// import axios from "axios";

// const useAuthCheck = () => {
//   const router = useRouter();
//   const [loading, setLoading] = useState(true);

//   const checkAuthStatus = useCallback(async () => {
//     const accessToken = getCookie("accessToken");
//     const refreshToken = getCookie("refreshToken");

//     if (!refreshToken) {
//       router.push("/auth/login");
//       return;
//     }

//     if (!accessToken && refreshToken) {
//       try {
//         const { data } = await axios.post(
//           `${process.env.NEXT_PUBLIC_BASE_URL}/auth/refresh-token`,
//           { refreshToken }
//         );
//         setCookie("accessToken", data.accessToken, {
//           maxAge: 3600,
//           secure: true,
//           sameSite: "none",
//           path: "/",
//         });
//         setCookie("refreshToken", data.refreshToken, {
//           maxAge: 28800,
//           secure: true,
//           sameSite: "none",
//           path: "/",
//         });

//         if (window.location.pathname.startsWith("/auth")) {
//           router.push("/dashboard");
//         }
//       } catch {
//         Swal.fire({
//           title: "Session Expired",
//           text: "Please log in again.",
//           icon: "warning",
//           confirmButtonText: "Okay",
//         });
//         router.push("/auth/login");
//       }
//     } else {
//       if (window.location.pathname.startsWith("/auth")) {
//         router.push("/dashboard");
//       }
//     }

//     // Mark loading as complete
//     setLoading(false);
//   }, [router]);

//   useEffect(() => {
//     checkAuthStatus();
//   }, [checkAuthStatus]);

//   return loading;
// };

// export default useAuthCheck;
