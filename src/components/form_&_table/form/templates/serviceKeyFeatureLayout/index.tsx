"use client";
import React, { useEffect, useState } from "react";
import { BodyDataItem } from "@/types/pageType";
import { Button, Input, Label } from "reactstrap";
import { Trash2 } from "react-feather";

type ServiceKeyFeaturesLayoutProps = {
  component: string;
  index: number;
  handleInputChange: (
    component: string,
    index: number,
    inputName: string,
    value: any
  ) => void;
  bodyData: BodyDataItem[];
};

const ServiceKeyFeaturesLayout = ({
  component,
  index,
  handleInputChange,
  bodyData,
}: ServiceKeyFeaturesLayoutProps) => {
  const [features, setFeatures] = useState<
    Array<{ feature: string; description: string }>
  >([]);

  useEffect(() => {
    if (bodyData[index]?.body?.keyFeatures) {
      setFeatures(bodyData[index].body.keyFeatures);
    }
  }, []);

  const addFeature = () => {
    setFeatures([...features, { feature: "", description: "" }]);
  };

  const removeFeature = (index: number) => {
    setFeatures(features.filter((_, i) => i !== index));
  };

  const handleFeatureChange = (idx: number, name: string, value: string) => {
    const newFeatures = features.map((feature, i) =>
      i === idx ? { ...feature, [name]: value } : feature
    );
    setFeatures(newFeatures);
    handleInputChange(component, index, "keyFeatures", newFeatures);
  };

  const renderFeatures = () => {
    return features.map((feature, i) => (
      <>
        <div key={i} className="border border-dashed rounded-lg p-3 space-y-2">
          <div className="flex items-center justify-between">
            <Label>Feature {i + 1} :</Label>
            <Trash2
              className="text-danger cursor-pointer"
              size={20}
              onClick={() => removeFeature(i)}
            />
          </div>
          <Input
            type="text"
            name={`feature_${i}`}
            value={feature.feature}
            onChange={(e) => handleFeatureChange(i, "feature", e.target.value)}
            placeholder="Feature"
          />
          <Input
            type="textarea"
            name={`description_${i}`}
            value={feature.description}
            onChange={(e) =>
              handleFeatureChange(i, "description", e.target.value)
            }
            placeholder="Description"
          />
        </div>
      </>
    ));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleInputChange(component, index, e.target.name, e.target.value);
  };
  return (
    <div className="space-y-2">
      <Input
        type="text"
        name="title"
        value={bodyData[index]?.body?.title ?? ""}
        onChange={handleChange}
        placeholder="Title"
      />
      <div className="grid grid-cols-3 gap-2">{renderFeatures()}</div>
      <Button onClick={addFeature}>Add Feature</Button>
    </div>
  );
};

export default ServiceKeyFeaturesLayout;
