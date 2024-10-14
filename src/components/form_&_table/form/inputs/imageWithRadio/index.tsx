"use client";
import Image from "next/image";
import { ImagePath } from "@/constant";
import { ImageWithRadioDataList } from "@/data/Form&Table/Form";
import { Card, CardBody, Col, Row, Input, Label } from "reactstrap";

interface Props {
  onSelect: (src: string) => void;
}
const ImagesWithRadio: React.FC<Props> = ({ onSelect }) => {
  return (
    <Col sm="12">
      <Card>
        <CardBody>
          <div className="main-img-checkbox">
            <Row className="g-3">
              {ImageWithRadioDataList.map(
                (
                  {
                    src,
                    label,
                    id,
                    defaultChecked,
                    disabled,
                    alt,
                    componentName,
                  },
                  index
                ) => (
                  <Col xxl="3" sm="6" key={index}>
                    <div className="card-wrapper border rounded-3 checkbox-checked">
                      <h6 className="sub-title">{label}</h6>
                      <div className="img-checkbox ">
                        <Input
                          className="main-img-cover"
                          id={id}
                          type="radio"
                          name="radio6"
                          defaultChecked={defaultChecked}
                          disabled={disabled}
                          onChange={() => {
                            onSelect(componentName);
                          }}
                        />
                        <Label className="mb-0 cursor-pointer" htmlFor={id} check>
                          <Image
                            src={`${ImagePath}/service_page-components/${src}.png`}
                            alt={alt}
                            width={500}
                            height={500}
                          />
                        </Label>
                      </div>
                    </div>
                  </Col>
                )
              )}
            </Row>
          </div>
        </CardBody>
      </Card>
    </Col>
  );
};

export default ImagesWithRadio;
