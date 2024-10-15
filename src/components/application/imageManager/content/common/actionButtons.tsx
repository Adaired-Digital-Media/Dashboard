import { Button } from "reactstrap";
import { UploadFile } from "@/constant";
import { Upload } from "react-feather";
import { useAppDispatch } from "@/redux/hooks";
import { setAddModal } from "@/redux/reducers/imageSlice";

export const FileContentButtonActions = () => {
  const dispatch = useAppDispatch();

  const onFileUpload = () => {
    dispatch(setAddModal());
  };

  return (
    <div className="flex-grow-1 text-end">
      <Button outline color="primary" className="ms-2" onClick={onFileUpload}>
        <Upload />
        {UploadFile}
      </Button>
    </div>
  );
};
