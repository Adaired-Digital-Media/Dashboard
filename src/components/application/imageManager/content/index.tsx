import { useAppSelector } from "@/redux/hooks";
import { Card, CardHeader, TabContent } from "reactstrap";
import SearchBar from "../searchBar";
import { FileContentButtonActions } from "./actionButtons";
import DataLoopTab from "./dataLoopTab";

const FileContent = () => {
  //   const { myFile, searchTerm } = useAppSelector((state) => state.fileManager);

  //   const fileList = myFile.filter((data) => {
  //     if (searchTerm == null) return data;
  //     if (data.name.toLowerCase().includes(searchTerm.toLowerCase())) return data
  //   });

  return (
    <Card>
      <CardHeader>
        <div className="d-md-flex d-sm-block">
          <SearchBar />
          <FileContentButtonActions />
        </div>
      </CardHeader>
      <TabContent activeTab={"1"}>
        <DataLoopTab/>
      </TabContent>
    </Card>
  );
};

export default FileContent;
