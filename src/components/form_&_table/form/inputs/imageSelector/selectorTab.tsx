"use client";
import React, { useState } from "react";
import { Card, CardBody, Col, Nav, NavItem, NavLink } from "reactstrap";
import TabsContent from "./tabsContent";

const SelectorTab: React.FC<{ onImageSelect: (image: string) => void }> = ({
  onImageSelect,
}) => {
  const [basicTab, setBasicTab] = useState("1");

  return (
    <Col xxl="12" sm="12">
      <Card>
        <CardBody className="p-0">
          <Nav tabs className="border-tab border-0 mb-0 nav-danger">
            <NavItem>
              <NavLink
                href="#javascript"
                className={`nav-border pt-0 nav-danger ${
                  basicTab === "1" ? "active" : ""
                }`}
                onClick={() => setBasicTab("1")}
              >
                <i className="icofont icofont-listing-box"></i>Media list
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                href="#javascript"
                className={`nav-border nav-danger ${
                  basicTab === "2" ? "active" : ""
                }`}
                onClick={() => setBasicTab("2")}
              >
                <i className="icofont icofont-file-jpg"></i>Upload
              </NavLink>
            </NavItem>
          </Nav>
          <TabsContent basicTab={basicTab} onImageSelect={onImageSelect} />
        </CardBody>
      </Card>
    </Col>
  );
};

export default SelectorTab;
