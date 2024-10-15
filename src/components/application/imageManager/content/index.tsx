import { CardHeader, TabContent, TabPane } from "reactstrap";
import SearchBar from "./searchBar";
import { FileContentButtonActions } from "./common/actionButtons";
import { AllImages, Images, SvgIcons } from "./ImageGrid";
import { useAppSelector } from "@/redux/hooks";
import UploadImageModal from "./uploader/uploadImageModal";

const FileContent = () => {
  const { activeTabs } = useAppSelector((state) => state.image);
  return (
    <>
      <CardHeader>
        <div className="d-md-flex d-sm-block">
          <SearchBar />
          <FileContentButtonActions />
        </div>
      </CardHeader>
      <TabContent activeTab={activeTabs}>
        <TabPane tabId="1">
          <AllImages />
        </TabPane>
        <TabPane tabId="2">
          <Images />
        </TabPane>
        <TabPane tabId="3">
          <SvgIcons />
        </TabPane>
        <UploadImageModal/>
      </TabContent>
    </>
  );
};

export default FileContent;
