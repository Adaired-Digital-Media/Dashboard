"use client";
import { BodyDataItem } from "@/types/pageType";
import { Input } from "reactstrap";

type CallToActionProps = {
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

const CallToAction = ({
  component,
  index,
  handleInputChange,
  bodyData,
}: CallToActionProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleInputChange(component, index, e.target.name, e.target.value);
  };

  return (
    <section>
      <Input
        type="text"
        name="title"
        value={bodyData[index]?.body?.title ?? ""}
        onChange={handleChange}
        placeholder="Title"
      />
    </section>
  );
};

export default CallToAction;
