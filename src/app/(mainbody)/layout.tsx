"use client";
import Footer from "@/layout/footer";
import { SideBar } from "@/layout/sidebar";
import Store from "@/redux/store";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "../../../src/index.scss";
import { Header } from "@/layout/header";
import TapTop from "@/layout/taptop";
import { useEffect } from "react";
import { setToggleSidebar } from "@/redux/reducers/layoutSlice";
import { useAppDispatch } from "@/redux/hooks";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const compactSidebar = () => {
      const windowWidth = window.innerWidth;
      dispatch(setToggleSidebar(windowWidth < 1200));
    };

    compactSidebar();
    window.addEventListener("resize", compactSidebar);

    return () => {
      window.removeEventListener("resize", compactSidebar);
    };
  }, [dispatch]);

  return (
  
      <Provider store={Store}>
        <div className={`page-wrapper compact-wrapper`} id="pageWrapper">
          <Header />
          <div className="page-body-wrapper">
            <SideBar />
            <div className="page-body">{children}</div>
            <Footer />
          </div>
        </div>
        <ToastContainer />
        <TapTop />
      </Provider>
    
  );
}
