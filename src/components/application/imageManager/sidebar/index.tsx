import React, { useState } from "react";
import { Button, Card, CardBody, Col } from "reactstrap";
import { FileFilter } from "@/constant";
import PricingPlans from "./pricingPlans";
import { StorageSection } from "./storageSection";
import { FileSideButton } from "@/data/Application/FileManager";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { updateActiveTabs } from "@/redux/reducers/imageSlice";

const FileSideBar = () => {
  const dispatch = useAppDispatch();
  const { activeTabs } = useAppSelector((state) => state.image);
  const [IsOpen, setIsOpen] = useState(false);
  const OnHandelClick = () => {
    setIsOpen(!IsOpen);
  };

  const onNavClicked = (id: string) => {
    dispatch(updateActiveTabs(id));
  };

  return (
    <Col xl="3" className="box-col-30">
      <div className="md-sidebar">
        <Button
          color="primary"
          className="md-sidebar-toggle"
          onClick={OnHandelClick}
        >
          {FileFilter}
        </Button>
        <div
          className={`md-sidebar-aside job-left-aside custom-scrollbar ${
            IsOpen ? "open" : ""
          }`}
        >
          <div className="file-sidebar">
            <Card>
              <CardBody>
                <ul className="simple-list">
                  {FileSideButton.map((item, index) => (
                    <li key={index} className="border-0">
                      <Button
                        block
                        color={`${
                          activeTabs === item.id ? "primary" : item.className
                        }`}
                        className="text-start"
                        onClick={() => onNavClicked(item.id)}
                      >
                        {item.icon}
                        {item.title}
                      </Button>
                    </li>
                  ))}
                </ul>
                <hr style={{ opacity: 0.25 }} />
                <StorageSection />
                <PricingPlans />
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </Col>
  );
};
export default FileSideBar;
