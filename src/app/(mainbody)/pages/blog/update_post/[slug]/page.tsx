"use client";
import React from "react";
import UpdatePostContainer from "@/components/pages/blog/updatePost";

interface SlugContextType {
  params: { slug: string };
}

const UpdatePost = ({ params }: SlugContextType) => {
  return <UpdatePostContainer slug={params.slug} />;
};

export default UpdatePost;
