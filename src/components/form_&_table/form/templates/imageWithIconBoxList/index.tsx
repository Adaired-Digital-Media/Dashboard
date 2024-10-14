"use client";
import React, { useEffect, useState } from "react";
import { Button, Input, Label } from "reactstrap";
import { Trash2 } from "react-feather";
import { BodyDataItem } from "@/types/pageType";
import ImageSelector from "@/components/form_&_table/form/inputs/imageSelector";

interface ImageWithIconBoxListProps {
  component: string;
  index: number;
  handleInputChange: (
    component: string,
    index: number,
    inputName: string,
    value: any
  ) => void;
  bodyData: BodyDataItem[];
}

interface Icard {
  image: string;
  title: string;
  description: string;
}
const ImageWithIconBoxList = ({
  component,
  index,
  handleInputChange,
  bodyData,
}: ImageWithIconBoxListProps) => {
  const initialLayoutState = bodyData[index]?.body?.layout === "rightImage";
  const [layoutState, setLayoutState] = useState(initialLayoutState);
  const [cards, setCards] = useState<Icard[]>([]);

  const changeLayout = () => {
    const newLayoutState = !layoutState;
    setLayoutState(newLayoutState);
    handleInputChange(
      component,
      index,
      "layout",
      newLayoutState ? "leftImage" : "rightImage"
    );
  };

  useEffect(() => {
    // Initialize cards with existing data from bodyData if it exists
    if (bodyData[index]?.body?.cards) {
      setCards(bodyData[index].body.cards);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleInputChange(component, index, e.target.name, e.target.value);
  };

  const handleCardChange = (idx: number, field: keyof Icard, value: string) => {
    const newCards = cards.map((card, cardsIdx) =>
      cardsIdx === idx ? { ...card, [field]: value } : card
    );
    setCards(newCards);
    handleInputChange(component, index, "cards", newCards);
  };

  const handleAddCard = () => {
    const newCards = [...cards, { image: "", title: "", description: "" }];
    setCards(newCards);
    handleInputChange(component, index, "cards", newCards);
  };

  const handleRemoveCard = (idx: number) => {
    const newCards = cards.filter((_, cardsIdx) => cardsIdx !== idx);
    setCards(newCards);
    handleInputChange(component, index, "cards", newCards);
  };

  const onBlurEditor = (content: string) => {
    handleInputChange(component, index, "description", content);
  };

  const renderCards = () =>
    cards.map((card, cardIdx) => (
      <div key={cardIdx} className="border p-2 rounded space-y-2 ">
        <div className="flex justify-end">
          <Trash2
            className="text-danger cursor-pointer "
            size={20}
            onClick={() => handleRemoveCard(cardIdx)}
          />
        </div>
        <ImageSelector
          onImageSelect={(image) => handleCardChange(cardIdx, "image", image)}
        />
        <Input
          type="text"
          name="title"
          value={card.title}
          onChange={(e) => handleCardChange(cardIdx, "title", e.target.value)}
          placeholder="Title"
        />
        <Input
          type="textarea"
          name="description"
          value={card.description}
          onChange={(e) =>
            handleCardChange(cardIdx, "description", e.target.value)
          }
          placeholder="Description"
        />
      </div>
    ));

  return (
    <>
      <div
        className={`flex gap-x-4 pt-3 ${
          !layoutState ? "flex-row-reverse" : ""
        }`}
      >
        <div className="space-y-2 w-1/2">
          <ImageSelector
            onImageSelect={(e) => {
              handleInputChange(component, index, "imgUrl", e);
            }}
          />
          <Input
            type="color"
            name="bgColor"
            value={bodyData[index]?.body?.bgColor ?? ""}
            onChange={handleChange}
            placeholder="Background"
          />
        </div>
        <div className="space-y-2 w-1/2">
          <Input
            type="text"
            name="title"
            value={bodyData[index]?.body?.title ?? ""}
            onChange={handleChange}
            placeholder="Title"
          />
          <div className="space-y-2">{renderCards()}</div>
          <Button onClick={handleAddCard}>Add Card</Button>
        </div>
      </div>
      <div className="form-check form-switch pt-3">
        <Input
          id="flexSwitchCheckDefault"
          type="switch"
          role="switch"
          onClick={changeLayout}
        />
        <Label htmlFor="flexSwitchCheckDefault" check>
          Switch Layout
        </Label>
      </div>
    </>
  );
};

export default ImageWithIconBoxList;
