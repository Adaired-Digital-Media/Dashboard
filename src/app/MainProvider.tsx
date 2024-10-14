"use client";
import Store from "@/redux/store";
import React from "react";
import { Provider } from "react-redux";

const MainProvider = ({ children }: { children: React.ReactNode }) => {
  return <Provider store={Store}>{children}</Provider>;
};

export default MainProvider;
