"use client";
import { BodyDataItem } from "@/types/pageType";
import React, { useEffect, useState, useCallback } from "react";
import { Input, Button, Label } from "reactstrap";
import Editor from "@/components/form_&_table/form/inputs/textEditor";
import ImageSelector from "@/components/form_&_table/form/inputs/imageSelector";

interface GridLayoutProps {
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

const GridLayout = ({
  component,
  index,
  handleInputChange,
  bodyData,
}: GridLayoutProps) => {
  console.log(bodyData);
  const [cards, setCards] = useState<Icard[]>([]);
  const [cardsLayout, setCardsLayout] = useState("4x4");

  const handleCardsLayoutChange = useCallback(
    (layout: string) => {
      setCardsLayout(layout);
      handleInputChange(component, index, "cardsLayout", layout);
    },
    [handleInputChange, component, index]
  );

  useEffect(() => {
    // Initialize cards with existing data from bodyData if it exists
    if (bodyData[index]?.body?.cards) {
      setCards(bodyData[index].body.cards);
    }
  }, [bodyData, index]);

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
      <div key={cardIdx} className="border p-2 rounded space-y-2">
        <div className="space-y-2">
             <ImageSelector
              imageUrl={card.image || ""}
              onImageSelect={(image) =>
                handleCardChange(cardIdx, "image", image)
              }
            />

          <Input
            type="text"
            name="title"
            value={card.title}
            onChange={(e) => handleCardChange(cardIdx, "title", e.target.value)}
            placeholder="Title"
          />
          <Editor
            value={card.description}
            onBlurEditor={(content) =>
              handleCardChange(cardIdx, "description", content)
            }
          />
        </div>
      </div>
    ));

  return (
    <div className="space-y-2">
      <div>
        <Input
          type="text"
          name="title"
          value={bodyData[index]?.body?.title ?? ""}
          onChange={handleChange}
          placeholder="Title"
        />
      </div>
      <div>
        <Input
          type="textarea"
          name="description"
          value={bodyData[index]?.body?.description ?? ""}
          onChange={handleChange}
          placeholder="Description"
        />
      </div>

      <div className="space-y-3">
        <ul className="radio-wrapper items-center justify-start">
          <Label>Cards Layout:</Label>
          <li>
            <Input
              id="radio-icon"
              className="d-block form-check-input"
              type="radio"
              name="radio1"
              defaultChecked
              value="4x4"
              onChange={(e) => handleCardsLayoutChange(e.target.value)}
            />
            <Label htmlFor="radio-icon" check>
              <i className="fa fa-th"></i>
              <span>4 x 4</span>
            </Label>
          </li>
          <li>
            <Input
              id="radio-icon-2"
              className="d-block form-check-input"
              type="radio"
              name="radio1"
              value="3x3"
              onChange={(e) => handleCardsLayoutChange(e.target.value)}
            />
            <Label htmlFor="radio-icon-2" check>
              <i className="fa fa-th"></i>
              <span>3 X 3</span>
            </Label>
          </li>
        </ul>

        <div
          className={`grid gap-2 ${
            cardsLayout === "3x3" ? "grid-cols-3" : "grid-cols-4"
          }`}
        >
          {renderCards()}
        </div>
        <Button onClick={handleAddCard}>Add Card</Button>
      </div>
    </div>
  );
};

export default GridLayout;
