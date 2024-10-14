import { Col, Row } from "reactstrap";
import { Searchbar } from "./responsiveSearch/searchBar";
import { HeaderLogo } from "./headerLogo";
import { HeaderRight } from "./headerRight";

export const PageHeader = () => {
  return (
    <Col className="header-wrapper m-0">
      <Row>
        <Searchbar />
        <HeaderLogo />
        <HeaderRight/>
      </Row>
    </Col>
  );
};
