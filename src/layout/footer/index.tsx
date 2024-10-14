import React from "react";
import { Col, Container, Row } from "reactstrap";
import SVG from "@/commonComponent/svg";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <Container fluid>
        <Row>
          <Col
            md="12"
            className="footer-copyright d-flex flex-wrap align-items-center justify-content-between"
          >
            <p className="mb-0 f-w-600">
              Copyright {year} © Adaired Digital Media Private Limited
            </p>
            <p className="mb-0 f-w-600">
              Hand crafted &amp; made with
              <SVG className="footer-icon" iconId="footer-heart" /> by Bittu
              Kumar
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
