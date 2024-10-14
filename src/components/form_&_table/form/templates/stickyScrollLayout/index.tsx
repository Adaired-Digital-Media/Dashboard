"use client";
import React, { useState } from "react";
import { BodyDataItem } from "@/types/pageType";
import { Button, Input, Label } from "reactstrap";
import { Trash2 } from "react-feather";
import ImageSelector from "@/components/form_&_table/form/inputs/imageSelector";
import Editor from "@/components/form_&_table/form/inputs/textEditor";

type StickyScrollLayoutProps = {
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

interface IlistItems {
  icon: string;
  title: string;
  description: string;
}

const StickyScrollLayout = ({
  component,
  index,
  handleInputChange,
  bodyData,
}: StickyScrollLayoutProps) => {
  const initializeListItems = (bodyData: BodyDataItem[], index: number) => {
    if (bodyData[index]?.body?.listItems) {
      return bodyData[index].body.listItems;
    }
    return [{ icon: "", title: "", description: "" }];
  };

  const [listItems, setListItems] = useState<IlistItems[]>(
    initializeListItems(bodyData, index)
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleInputChange(component, index, e.target.name, e.target.value);
  };

  const addListItem = () => {
    const newListItem = [...listItems, { icon: "", title: "", description: "" }];
    setListItems(newListItem);
    handleInputChange(component, index, "listItems", newListItem);
  };

  const removeListItem = (itemIndex: number) => {
    const newListItems = listItems.filter((_, idx) => idx !== itemIndex);
    setListItems(newListItems);
    handleInputChange(component, index, "listItems", newListItems);
  };

  const handleListItemChange = (
    itemIndex: number,
    field: keyof IlistItems,
    value: string
  ) => {
    const newListItems = listItems.map((item, idx) =>
      idx === itemIndex ? { ...item, [field]: value } : item
    );
    setListItems(newListItems);
    handleInputChange(component, index, "listItems", newListItems);
  };

  const renderListItems = () =>
    listItems.map((item, i) => (
      <div key={i} className="border border-dashed rounded-lg p-3 space-y-2">
        <div className="flex items-center justify-between">
          <Label>Item {i + 1} :</Label>
          <Trash2
            className="text-danger cursor-pointer"
            size={20}
            onClick={() => removeListItem(i)}
          />
        </div>
        <ImageSelector
          onImageSelect={(e) => {
            handleListItemChange(i, "icon", e);
          }}
        />
        <Input
          type="text"
          name={`title_${i}`}
          value={item.title}
          onChange={(e) => handleListItemChange(i, "title", e.target.value)}
          placeholder="Title"
        />
        <Input
          type="textarea"
          name={`description_${i}`}
          value={item.description}
          onChange={(e) =>
            handleListItemChange(i, "description", e.target.value)
          }
          placeholder="Description"
        />
      </div>
    ));

  return (
    <div className="space-y-2 grid grid-cols-2 gap-3">
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

      <div className="grid gap-2">
        {renderListItems()}
        <Button onClick={addListItem} className="h-10">
          Add Item
        </Button>
      </div>
    </div>
  );
};

export default StickyScrollLayout;



