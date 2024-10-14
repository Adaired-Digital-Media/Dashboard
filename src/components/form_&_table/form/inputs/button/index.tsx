"use client";
import React, { useState, useEffect } from "react";
import { ArrowRight } from "react-feather";
import {
  Button,
  Modal,
  ModalBody,
  Input,
  ModalFooter,
  ModalHeader,
  Label,
} from "reactstrap";

type ButtonProps = {
  component: string;
  index: number;
  handleInputChange: (
    component: string,
    index: number,
    inputName: string,
    value: any
  ) => void;
  value: any;
};

const ButtonComp: React.FC<ButtonProps> = ({
  component,
  index,
  handleInputChange,
  value,
}) => {
  const [simpleModal, setSimpleModal] = useState(false);
  const [buttonStatus, setButtonStatus] = useState(value.buttonStatus || true);
  const [buttonLink, setButtonLink] = useState(value.buttonLink || "");
  const [buttonClassname, setButtonClassname] = useState(value.buttonClassname || "");
  const [innerText, setInnerText] = useState(value.buttonInnerText || "Button");

  useEffect(() => {
    setButtonStatus(value.buttonStatus);
    setButtonLink(value.buttonLink);
    setButtonClassname(value.buttonClassname);
    setInnerText(value.buttonInnerText);
  }, [value]);

  const changeButtonStatus = () => {
    const newStatus = !buttonStatus;
    setButtonStatus(newStatus);
    handleInputChange(component, index, "buttonStatus", newStatus);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "buttonLink") setButtonLink(value);
    if (name === "buttonClassname") setButtonClassname(value);
    if (name === "buttonInnerText") setInnerText(value);
    handleInputChange(component, index, name, value);
  };

  const toggle = () => setSimpleModal(!simpleModal);

  return (
    <>
      <Button
        color={`${buttonStatus ? "primary" : "btn-light border"}`}
        onClick={toggle}
      >
        {innerText}
      </Button>
      <Modal isOpen={simpleModal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Add Button Props</ModalHeader>
        <ModalBody>
          <div className="modal-toggle-wrapper space-y-2">
            <div className="tg-list-item flex items-center gap-x-2">
              <Input
                className="tgl tgl-flip"
                id="btn1"
                type="checkbox"
                checked={buttonStatus}
                onChange={changeButtonStatus}
              />
              <Label
                className="tgl-btn"
                data-tg-off="Nope!"
                data-tg-on="Yeah"
                htmlFor="btn1"
              ></Label>
              <p className="m-0">Disable Button</p>
            </div>
            <Input
              type="text"
              name="buttonLink"
              placeholder="Link"
              value={buttonLink}
              onChange={handleChange}
            />
            <Input
              type="text"
              name="buttonClassname"
              placeholder="Button Classname"
              value={buttonClassname}
              onChange={handleChange}
            />
            <Input
              type="text"
              name="buttonInnerText"
              placeholder="Inner Text"
              value={innerText}
              onChange={handleChange}
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            className="d-flex align-items-center gap-2 text-light ms-auto"
            onClick={toggle}
          >
            Done <ArrowRight />
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default ButtonComp;
