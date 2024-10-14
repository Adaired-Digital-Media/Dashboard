"use client";
import React from "react";
import PostBody from "./pageBody";
import PageLayout from "@/components/pages/pageLayout";
import { setNavId } from "@/redux/reducers/addServiceSlice";
import GlobalSidebar from "@/components/pages/pageLayout/globalSidebar";
import { sidePanel } from "@/data/Pages/index";
import { useAppDispatch } from "@/redux/hooks";

const AddPostContainer = () => {
  const dispatch = useAppDispatch();

  return (
    <>
      <PageLayout
        LeftSidebar={
          <GlobalSidebar
            items={sidePanel}
            setNavId={(id) => {
              dispatch(setNavId(id));
            }}
            sliceName={"addService"}
          />
        }
        TabContent={<PostBody />}
      />
    </>
  );
};

export default AddPostContainer;
