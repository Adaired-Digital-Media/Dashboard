"use client";
import UpdatePage from "@/components/pages/services/updatePage";

interface SlugContextType {
  params: { slug: string };
}

const UpdateService = ({ params }: SlugContextType) => {
  return <UpdatePage slug={params.slug}/>;
};

export default UpdateService;
