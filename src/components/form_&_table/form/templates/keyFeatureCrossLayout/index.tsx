"use client";
import React from "react";
import { BodyDataItem } from "@/types/pageType";
import { Input } from "reactstrap";
import Editor from "@/components/form_&_table/form/inputs/textEditor";
import ImageSelector from "@/components/form_&_table/form/inputs/imageSelector";
// import parse from "html-react-parser";
// import { ClientRemoveTags } from "@/utils/HtmlToString";

type KeyFeatureCrossLayoutProps = {
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

const KeyFeatureCrossLayout: React.FC<KeyFeatureCrossLayoutProps> = ({
  component,
  index,
  handleInputChange,
  bodyData,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleInputChange(component, index, e.target.name, e.target.value);
  };
  return (
    <>
      <div className={`space-y-2`}>
        <div className={`space-y-2`}>
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
              handleInputChange(content, index, "description", content)
            }
          />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <ImageSelector
              onImageSelect={(e) => {
                handleInputChange(component, index, "imgUrl", e);
              }}
            />

            <Input
              type="text"
              name="point_1"
              value={bodyData[index]?.body?.point_1 ?? ""}
              onChange={handleChange}
              placeholder="Point 1"
            />
          </div>

          <div>
            <ImageSelector
              onImageSelect={(e) => {
                handleInputChange(component, index, "imgUrl", e);
              }}
            />
            <Input
              type="text"
              name="point_2"
              value={bodyData[index]?.body?.point_2 ?? ""}
              onChange={handleChange}
              placeholder="Point 2"
            />
          </div>

          <div>
            <ImageSelector
              onImageSelect={(e) => {
                handleInputChange(component, index, "imgUrl", e);
              }}
            />
            <Input
              type="text"
              name="point_3"
              value={bodyData[index]?.body?.point_3 ?? ""}
              onChange={handleChange}
              placeholder="Point 3"
            />
          </div>

          <div>
            <ImageSelector
              onImageSelect={(e) => {
                handleInputChange(component, index, "imgUrl", e);
              }}
            />
            <Input
              type="text"
              name="point_4"
              value={bodyData[index]?.body?.point_4 ?? ""}
              onChange={handleChange}
              placeholder="Point 4"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default KeyFeatureCrossLayout;
