import PostBody from "./postBody";
import { useAppDispatch } from "@/redux/hooks";
import { sidePanel } from "@/data/Pages/index";
import PageLayout from "@/components/pages/pageLayout";
import { setNavId } from "@/redux/reducers/addPostSlice";
import GlobalSidebar from "@/components/pages/pageLayout/globalSidebar";

type Props = {
  slug: string;
};

const UpdatePostContainer = (slug: Props) => {
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

export default UpdatePostContainer;
