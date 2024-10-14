"use client";
import React from "react";
import PostBody from "./postBody";
import PageLayout from "@/components/pages/pageLayout";
import { setNavId } from "@/redux/reducers/addPostSlice";
import GlobalSidebar from "@/components/pages/pageLayout/globalSidebar"; // Import the correct path for GlobalSidebar
import { sidePanel } from "@/data/Pages/index";
import { useAppDispatch } from "@/redux/hooks";

const AddPostContainer = () => {
  const dispatch = useAppDispatch();

  return (
    <PageLayout
      LeftSidebar={
        <GlobalSidebar
          items={sidePanel}
          setNavId={(id) => {
            dispatch(setNavId(id));
          }}
          sliceName="addPost"
        />
      }
      TabContent={<PostBody />}
    />
  );
};

export default AddPostContainer;
