// Reactstrap Imports
import { Card, CardBody, Col, Collapse, Input, Row } from "reactstrap";

// Redux Imports
import { useAppSelector } from "@/redux/hooks";

const CollapseFilterData = () => {
  const { filterToggle } = useAppSelector((state) => state.addPost);
  return (
    <Collapse isOpen={filterToggle}>
      <Card className="shadow-none">
        <CardBody className="list-product-body">
          <Row className="row-cols-xl-5 row-cols-lg-4 row-cols-md-3 row-cols-sm-2 row-cols-2 g-3">
            {/* {FiltersData.map((item, index) => (
              <Col key={index}>
                <Input type="select">
                  <option selected>{item.name}</option>
                  {item.options.map((data, optionIndex) => (
                    <option key={optionIndex} value={optionIndex + 1}>
                      {data}
                    </option>
                  ))}
                </Input>
              </Col>
            ))} */}
            hello
          </Row>
        </CardBody>
      </Card>
    </Collapse>
  );
};

export default CollapseFilterData;
