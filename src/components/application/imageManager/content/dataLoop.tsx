"use client";
import { Card, Col, Row } from "reactstrap";
import SweetAlert from "sweetalert2";
import DescriptionData from "./descriptionData";
import { RootState } from "@/redux/store";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchImages, deleteImage } from "@/redux/reducers/imageSlice";
import { useEffect } from "react";
import Image from "next/image";
import SearchNotFoundClass from "@/commonComponent/searchNotFound.tsx";

const DataLoop = () => {
  const dispatch = useAppDispatch();
  const { images, isLoading, error } = useAppSelector(
    (state: RootState) => state.image
  );

  useEffect(() => {
    dispatch(fetchImages());
  }, [dispatch]);

  //   const addToFavorites = (data: BookMarkData) => {
  //     if (data.fillStar === false) {
  //       const newBookMarkData = bookmark.map((item) => (item.id === data.id ? { ...item, fillStar: true } : item));
  //       dispatch(setBookmark(newBookMarkData));
  //     } else {
  //       const newBookMarkData = bookmark.map((item) => (item.id === data.id ? { ...item, fillStar: false } : item));
  //       dispatch(setBookmark(newBookMarkData));
  //     }
  //   };

  //   const onHandleClick = (data: BookMarkData) => {
  //     dispatch(setEditModal());
  //     dispatch(setEditRow(data));
  //   };

  const removeImage = (fileName: string) => {
    SweetAlert.fire({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this file!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ok",
      cancelButtonText: "cancel",
      reverseButtons: true,
    }).then((result) => {
      if (result.value) {
        dispatch(deleteImage(fileName));

        SweetAlert.fire("Deleted!", "Your file has been deleted.", "success");
      } else {
        SweetAlert.fire("Your file is safe!");
      }
    });
  };

  return (
    <Row id="bookmarkData">
      {images && images.length > 0 ? (
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
                {/* <div
                  className={`favourite-icon favourite_0 ${
                    data.fillStar ? "favourite" : ""
                  }`}
                  onClick={() => addToFavorites(data)}
                >
                  <a href={Href}>
                    <i className="fa fa-star"></i>
                  </a>
                </div> */}
                <DescriptionData data={data} removeImage={removeImage} />
              </div>
            </Card>
          </Col>
        ))
      ) : (
        <SearchNotFoundClass word="Images" />
      )}
    </Row>
  );
};

export default DataLoop;
