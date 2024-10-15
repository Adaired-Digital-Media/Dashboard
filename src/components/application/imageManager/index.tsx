import React from "react";
import { Card, Col, Container, Row } from "reactstrap";
import FileSideBar from "./sidebar";
import FileContent from "./content";

const ImageManagerContainer = () => {
  return (
    <Container fluid>
      <Row>
        <FileSideBar />
        <Col xl="9" md="12" className="box-col-12">
          <div className="file-content">
            <div className="email-right-aside bookmark-tabcontent">
              <Card className="email-body radius-left">
                <div className="ps-0">
                  <FileContent />
                </div>
              </Card>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ImageManagerContainer;
