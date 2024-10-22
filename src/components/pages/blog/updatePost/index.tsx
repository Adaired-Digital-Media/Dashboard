import PostBody from "./postBody";
import { useAppDispatch } from "@/redux/hooks";
import { sidePanel } from "@/data/Pages/index";
import PageLayout from "@/components/pages/pageLayout";
import { setNavId } from "@/redux/reducers/addPostSlice";
import GlobalSidebar from "@/components/pages/pageLayout/globalSidebar";

const UpdatePostContainer = ({ slug }: { slug: string }) => {
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
      TabContent={<PostBody slug={slug} />}
    />
  );
};

export default UpdatePostContainer;
