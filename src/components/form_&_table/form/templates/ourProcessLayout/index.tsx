"use client";
import React from "react";
import { BodyDataItem } from "@/types/pageType";
import { Input, Label } from "reactstrap";
import Editor from "@/components/form_&_table/form/inputs/textEditor";

type OurProcessLayoutProps = {
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

const OurProcessLayout = ({
  component,
  index,
  handleInputChange,
  bodyData,
}: OurProcessLayoutProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleInputChange(component, index, e.target.name, e.target.value);
  };

  const handleStepChange = (
    stepType: "onboarding" | "implementation",
    stepIndex: number,
    field: "step" | "description",
    value: string
  ) => {
    const steps =
      bodyData[index].body[stepType] ||
      Array(4).fill({ step: "", description: "" });
    const updatedSteps = steps.map((step: any, i: number) =>
      i === stepIndex ? { ...step, [field]: value } : step
    );
    handleInputChange(component, index, stepType, updatedSteps);
  };

  return (
    <div className="space-y-2">
      <div className="space-y-2">
        <Input
          type="text"
          name="title"
          value={bodyData[index]?.body?.title ?? ""}
          onChange={handleChange}
          placeholder="Title"
        />
        <Editor
          value={bodyData[index]?.body?.description ?? ""}
          onBlurEditor={(content) =>
            handleInputChange(component, index, "description", content)
          }
        />
      </div>

      <Label>Onboarding:</Label>
      <div className="grid grid-cols-4 gap-2">
        {Array(4)
          .fill(null)
          .map((_, i) => (
            <div
              key={i}
              className="space-y-2 border-1 border-dashed p-2 rounded"
            >
              <Label>Step {i + 1} : </Label>
              <Input
                type="text"
                value={bodyData[index]?.body?.onboarding?.[i]?.step ?? ""}
                onChange={(e) =>
                  handleStepChange("onboarding", i, "step", e.target.value)
                }
                placeholder={`Step ${i + 1}`}
              />
              <Input
                type="textarea"
                value={
                  bodyData[index]?.body?.onboarding?.[i]?.description ?? ""
                }
                onChange={(e) =>
                  handleStepChange(
                    "onboarding",
                    i,
                    "description",
                    e.target.value
                  )
                }
                placeholder={`Description ${i + 1}`}
              />
            </div>
          ))}
      </div>

      <Label>Implementation:</Label>
      <div className="grid grid-cols-4 gap-2">
        {Array(4)
          .fill(null)
          .map((_, i) => (
            <div
              key={i}
              className="space-y-2 border-1 border-dashed p-2 rounded"
            >
              {" "}
              <Label>Step {i + 1} : </Label>
              <Input
                type="text"
                value={bodyData[index]?.body?.implementation?.[i]?.step ?? ""}
                onChange={(e) =>
                  handleStepChange("implementation", i, "step", e.target.value)
                }
                placeholder={`Step ${i + 1}`}
              />
              <Input
                type="textarea"
                value={
                  bodyData[index]?.body?.implementation?.[i]?.description ?? ""
                }
                onChange={(e) =>
                  handleStepChange(
                    "implementation",
                    i,
                    "description",
                    e.target.value
                  )
                }
                placeholder={`Description ${i + 1}`}
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default OurProcessLayout;
