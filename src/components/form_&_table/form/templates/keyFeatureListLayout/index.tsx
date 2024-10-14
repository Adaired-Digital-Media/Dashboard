"use client";
import React, { useEffect, useState } from "react";
import { BodyDataItem } from "@/types/pageType";
import { Button, Input } from "reactstrap";
import Editor from "@/components/form_&_table/form/inputs/textEditor";
import { Trash2 } from "react-feather";

type KeyFeatureListLayoutProps = {
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
  item: string;
}

const KeyFeatureListLayout = ({
  component,
  index,
  handleInputChange,
  bodyData,
}: KeyFeatureListLayoutProps) => {
  const [listItems, setListItems] = useState<IlistItems[]>([]);

  // Synchronize the list items with the existing body data when the component mounts or re-renders.
  useEffect(() => {
    if (bodyData[index]?.body?.listItems) {
      setListItems(bodyData[index].body.listItems); // Set the initial list items from the existing body data if available.
    }
  }, [bodyData, index]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleInputChange(component, index, e.target.name, e.target.value);
  };

  const addListItem = () => {
    const newListItem = [...listItems, { item: "" }];
    setListItems(newListItem);
    // handleInputChange(component, index, "listItems", newListItem);
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

  const removeListItem = (itemIndex: number) => {
    const newListItems = listItems.filter((_, idx) => idx !== itemIndex);
    setListItems(newListItems);
    handleInputChange(component, index, "listItems", newListItems);
  };

  const renderListItems = () =>
    listItems.map((item, i) => (
      <div key={i} className="flex items-center space-x-2">
        <Input
          type="text"
          placeholder="Item"
          value={item.item}
          onChange={(e) => handleListItemChange(i, "item", e.target.value)}
          // className={item.item !== "" ? "valid" : "is-invalid"}
        />
        <Trash2
          size={32}
          onClick={() => removeListItem(i)}
          className={`cursor-pointer bg-danger p-1 rounded`}
        />
      </div>
    ));

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
      <div className="grid grid-cols-3 gap-2">{renderListItems()}</div>
      <Button onClick={addListItem}>Add Item</Button>
    </div>
  );
};

export default KeyFeatureListLayout;
