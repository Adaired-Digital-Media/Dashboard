"use client";
import React from "react";
import { v4 as uuidv4 } from "uuid";
import DragDropComponent from "./dragDropComponent";
import { BodyDataItem } from "@/types/pageType";
import { useAppDispatch } from "@/redux/hooks";
import { updateBodyDataItem } from "@/redux/reducers/floatingWidgetSlice";

// Components
import TwoColumnFeatureSection from "../templates/twoColumnFeaturelayout";
import FAQComponent from "../templates/faqLayout";
import ImagewithDetailedFeatureDescription from "../templates/imagewithDetailedFeatureDescriptionLayout";
import KeyFeatureCrossLayout from "../templates/keyFeatureCrossLayout";
import KeyFeatureListLayout from "../templates/keyFeatureListLayout";
import OurProcessLayout from "../templates/ourProcessLayout";
import ServiceKeyFeaturesLayout from "../templates/serviceKeyFeatureLayout";
import GridLayout from "../templates/gridLayout";
import CallToAction from "../templates/callToAction";
import StickyScrollLayout from "../templates/stickyScrollLayout";
import ImageWithIconBoxList from "../templates/imageWithIconBoxList";

interface RenderSelectedInputFieldsProps {
  selectedComponents: BodyDataItem[];
  setSelectedComponents: (components: BodyDataItem[]) => void;
  setBodyData: (bodyData: BodyDataItem[]) => void;
  bodyData: BodyDataItem[];
}

const RenderSelectedInputFields: React.FC<RenderSelectedInputFieldsProps> = ({
  selectedComponents,
  setSelectedComponents,
  setBodyData,
  bodyData,
}) => {
  const dispatch = useAppDispatch();

  const handleInputChange = (
    component: string,
    index: number,
    inputName: string,
    value: any
  ) => {

    dispatch(updateBodyDataItem({ index, inputName, value }));
    // const newData = [...bodyData];

    // // Initialize the object at the index if it doesn't exist
    // if (!newData[index]) {
    //   newData[index] = {
    //     componentName: component,
    //     body: {},
    //     id: uuidv4().substr(0, 4),
    //   };
    // }

    // // Ensure that body is an object
    // if (!newData[index].body) {
    //   newData[index].body = {};
    // }

    // // Ensure that body is initialized as an object if not already
    // newData[index].body = {
    //   ...newData[index].body,
    //   [inputName]: value,
    // };
    // setBodyData(newData);
  };

  // The handleDelete and renderInputFields remain the same
  const handleDelete = (index: number) => {
    const newData = selectedComponents.filter((_, i) => i !== index);
    const newBodyData = bodyData.filter((_, i) => i !== index);
    setSelectedComponents(newData);
    setBodyData(newBodyData);
  };

  const renderInputFields = (component: BodyDataItem, index: number) => {
    const commonProps = {
      component: component.componentName,
      index,
      handleInputChange,
      bodyData,
    };

    // Render the appropriate component based on the component name
    switch (component.componentName) {
      case "TwoColumnFeatureSection":
        return <TwoColumnFeatureSection {...commonProps} />;
      case "KeyFeatureCrossLayout":
        return <KeyFeatureCrossLayout {...commonProps} />;
      case "KeyFeatureListLayout":
        return <KeyFeatureListLayout {...commonProps} />;
      case "OurProcessLayout":
        return <OurProcessLayout {...commonProps} />;
      case "ServiceKeyFeaturesLayout":
        return <ServiceKeyFeaturesLayout {...commonProps} />;
      case "GridLayout":
        return <GridLayout {...commonProps} />;
      case "StickyScrollLayout":
        return <StickyScrollLayout {...commonProps} />;
      case "CallToAction":
        return <CallToAction {...commonProps} />;
      case "FAQ":
        return <FAQComponent {...commonProps} />;
      case "ImagewithDetailedFeatureDescription":
        return <ImagewithDetailedFeatureDescription {...commonProps} />;
      case "ImageWithIconBoxList":
        return <ImageWithIconBoxList {...commonProps} />;
      default:
        return null;
    }
  };

  return (
    <DragDropComponent
      items={selectedComponents}
      onReorder={(reorderedItems) => {
        setSelectedComponents(reorderedItems);
        setBodyData(reorderedItems.map((item, i) => bodyData[i] || {}));
      }}
      onDelete={handleDelete}
      renderComponent={renderInputFields}
    />
  );
};

export default React.memo(RenderSelectedInputFields);
