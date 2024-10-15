"use client";
import { Card, CardBody, Col, Row } from "reactstrap";
import SweetAlert from "sweetalert2";
import DescriptionData from "./common/descriptionData";
import { RootState } from "@/redux/store";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchImages, deleteImage } from "@/redux/reducers/imageSlice";
import { FC, useEffect } from "react";
import Image from "next/image";
import SearchNotFoundClass from "@/commonComponent/searchNotFound.tsx";
import { ImageType } from "@/types/imageManagerType";

type ImageGridPropsType = {
  images: ImageType[];
  gridView: boolean;
  removeImage: (public_id: string) => void;
};

const ImageGrid: FC<ImageGridPropsType> = ({
  images,
  gridView,
  removeImage,
  //  onHandleClick
}) => (
  <Row id="bookmarkData">
    {images.length > 0 ? (
      images.map((data, index) => (
        <Col xxl="3" md="4" sm="6" key={index} className="col-ed-4">
          <Card className="card-with-border bookmark-card o-hidden">
            <div className="details-website">
              <div className="d-flex align-items-center justify-content-center alert-light-dark">
                <Image
                  src={data.secure_url}
                  alt={data.filename}
                  width={300}
                  height={200}
                />
              </div>
              <DescriptionData
                data={data}
                removeImage={removeImage}
                // onHandleClick={onHandleClick}
              />
            </div>
          </Card>
        </Col>
      ))
    ) : (
      <SearchNotFoundClass word="Images" />
    )}
  </Row>
);

const ImageTab = ({ filterFormat }: { filterFormat: string }) => {
  const dispatch = useAppDispatch();
  const { images, gridView } = useAppSelector(
    (state: RootState) => state.image
  );

  const filteredImages = images.filter((image) => {
    if (filterFormat === "svg") {
      return image.format === "svg";
    }
    if (filterFormat === "all") {
      return true;
    }
    return image.format !== "svg";
  });

  useEffect(() => {
    dispatch(fetchImages());
  }, [dispatch]);

  const removeImage = (fileName: string) => {
    SweetAlert.fire({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this file!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ok",
      cancelButtonText: "Cancel",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteImage(fileName));
        SweetAlert.fire("Deleted!", "Your file has been deleted.", "success");
      } else {
        SweetAlert.fire("Your file is safe!");
      }
    });
  };

  return (
    <Card className="mb-0">
      <CardBody className="pb-0">
        <div
          className={`details-bookmark text-center ${
            !gridView ? "list-bookmark" : ""
          }`}
        >
          <ImageGrid
            images={filteredImages}
            gridView={gridView}
            removeImage={removeImage}
            // onHandleClick={onHandleClick}
          />
        </div>
      </CardBody>
    </Card>
  );
};

// Components for each tab
export const Images = () => <ImageTab filterFormat="exclude" />;
export const SvgIcons = () => <ImageTab filterFormat="svg" />;
export const AllImages = () => <ImageTab filterFormat="all" />;
