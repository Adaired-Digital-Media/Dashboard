import { Modal, ModalBody, ModalHeader } from "reactstrap";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import ImageUploadBody from "./imageUploaderBody";
import { setAddModal } from "@/redux/reducers/imageSlice";

const UploadImageModal = () => {
  const dispatch = useAppDispatch();
  const { addModal } = useAppSelector((state) => state.image);

  const addToggle = () => {
    dispatch(setAddModal());
  };

  return (
    <Modal isOpen={addModal} toggle={addToggle} size="lg">
      <ModalHeader toggle={addToggle}>Upload Image</ModalHeader>
      <ModalBody>
        <ImageUploadBody />
      </ModalBody>
    </Modal>
  );
};

export default UploadImageModal;
