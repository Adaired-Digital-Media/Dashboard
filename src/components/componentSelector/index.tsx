"use client";
import React from "react";
import { Close, Save } from "@/constant";
import { useState } from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import ImagesWithRadio from "@/components/form_&_table/form/inputs/imageWithRadio";

const ComponentSelectButton = ({
  selectedItem,
}: {
  selectedItem: (componentName: string) => void;
}) => {
  const [selectedComponent, setSelectedComponent] = useState<string>("");
  const [fullScreen, setFullScreen] = useState(false);
  const fullScreenToggle = () => setFullScreen(!fullScreen);

  const onSelect = (selectedComponent: string) => {
    setSelectedComponent(selectedComponent);
  };

  const handleSave = () => {
    selectedItem(selectedComponent);
    fullScreenToggle();
    setSelectedComponent("");
  };

  const isSaveDisabled = selectedComponent === "";

  return (
    <>
      <Button color="secondary-2x" outline onClick={fullScreenToggle} className="h-32 w-full">
        {"Select Next Component"}
      </Button>
      <Modal fullscreen isOpen={fullScreen} toggle={fullScreenToggle}>
        <ModalHeader toggle={fullScreenToggle}>Select Section</ModalHeader>
        <ModalBody>
          <ImagesWithRadio onSelect={onSelect} />
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={fullScreenToggle}>
            {Close}
          </Button>
          <Button
            color="primary"
            onClick={handleSave}
            disabled={isSaveDisabled}
          >
            {Save}
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default ComponentSelectButton;
