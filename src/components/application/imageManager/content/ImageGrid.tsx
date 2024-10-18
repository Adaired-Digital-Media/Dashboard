"use client";
import { Card, CardBody, Col, Row } from "reactstrap";
import SweetAlert from "sweetalert2";
import DescriptionData from "./common/descriptionData";
import { RootState } from "@/redux/store";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchImages, deleteImage } from "@/redux/reducers/imageSlice";
import { FC, useEffect, useState } from "react";
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
      (console.log("Fetched Images: ",images),
      images.map((data, index) => (
        <Col xxl="3" md="4" sm="6" key={data.public_id} className="col-ed-4">
          <Card className="card-with-border bookmark-card o-hidden">
            <div className="details-website">
              <div className="d-flex align-items-center justify-content-center alert-light-dark">
                <Image
                  src={data.secure_url}
                  alt={data.context?.alt}
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
      )))
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
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 20;

  const fetchImagesWithParams = (page: number, type: string) => {
    dispatch(fetchImages({ page, limit, fileType: type }));
  };

  useEffect(() => {
    fetchImagesWithParams(currentPage, filterFormat);
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
            images={images}
            gridView={gridView}
            removeImage={removeImage}
            // onHandleClick={onHandleClick}
          />
        </div>
        <div className="pagination-controls">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <button onClick={() => setCurrentPage((prev) => prev + 1)}>
            Next
          </button>
        </div>
      </CardBody>
    </Card>
  );
};

// Components for each tab
export const Images = () => <ImageTab filterFormat="non-svg" />;
export const SvgIcons = () => <ImageTab filterFormat="svg" />;
export const AllImages = () => <ImageTab filterFormat="all" />;
