"use client";
import React, { useEffect } from "react";
import { Label, TabContent, TabPane, Col, Row, Input } from "reactstrap";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchImages } from "@/redux/reducers/imageSlice";
import { RootState } from "@/redux/store";
import ImageUploadBody from "@/components/application/imageManager/content/uploader/imageUploaderBody";
import { ImageType } from "@/types/imageManagerType";

export interface TabsContentProp {
  basicTab: string;
  onImageSelect: (image: string) => void;
}

const TabsContent: React.FC<TabsContentProp> = ({
  basicTab,
  onImageSelect,
}) => {
  const dispatch = useAppDispatch();
  const { images, isLoading } = useAppSelector(({ image }: RootState) => image);

  useEffect(() => {
    dispatch(fetchImages({ page: 1, limit: 20, fileType: "all" }));
  }, [basicTab, dispatch]);

  return (
    <>
      <TabContent activeTab={basicTab}>
        <TabPane tabId="1">
          <div className="main-img-checkbox pt-4">
            <Row className="g-3">
              {isLoading ? (
                <Col sm="12" className="text-center">
                  <div className="error-heading">
                    <h2 className="font-danger">Loading Images ....</h2>
                  </div>
                </Col>
              ) : images && images.length > 0 ? (
                images.map((image: ImageType, index: number) => (
                  <Col key={index} xxl="3" sm="6">
                    <div className="card-wrapper border rounded-3 checkbox-checked">
                      <div className="img-checkbox">
                        <Input
                          className="main-img-cover"
                          id={image.filename}
                          type="radio"
                          name="radio6"
                          placeholder={image.filename}
                          defaultChecked={false}
                          disabled={false}
                          onChange={() => onImageSelect(image.secure_url)}
                        />
                        <Label className="mb-0" htmlFor={image.filename} check>
                          <Image
                            src={image.secure_url}
                            alt={image.filename}
                            width={500}
                            height={500}
                          />
                        </Label>
                      </div>
                    </div>
                  </Col>
                ))
              ) : (
                <Col sm="12" className="text-center">
                  <div className="error-heading">
                    <h2 className="font-danger">No Images Found</h2>
                  </div>
                  <p className="sub-content">
                    You have not uploaded any images yet. Click the button above
                    to upload images.
                  </p>
                </Col>
              )}
            </Row>
          </div>
        </TabPane>
        <TabPane tabId="2">
          <div className="pt-4">
            <ImageUploadBody />
          </div>
        </TabPane>
      </TabContent>
    </>
  );
};

export default TabsContent;
