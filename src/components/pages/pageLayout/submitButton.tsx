"use client";
import SVG from "@/commonComponent/svg";
import { Previous } from "@/constant";
import { Button } from "reactstrap";

interface Props {
  submitForm: () => void;
  navId: string;
  setNavId: (id: string) => void;
}

const CommonButton: React.FC<Props> = ({ submitForm, navId, setNavId }) => {
  const currentNavId = parseInt(navId, 10);

  const handlePrevious = () => {
    if (currentNavId > 1) {
      setNavId((currentNavId - 1).toString());
    }
  };

  const handleNext = () => {
    if (currentNavId === 1) {
      // Allow navigation only if on the first step
      setNavId((currentNavId + 1).toString());
    }
  };

  return (
    <div className="product-buttons border-0">
      {currentNavId > 1 && (
        <Button
          color="transparent"
          onClick={handlePrevious}
        >
          <div className="d-flex align-items-center gap-sm-2 gap-1">
            <SVG iconId="back-arrow" />
            {Previous}
          </div>
        </Button>
      )}
      <Button
        color="transparent"
        className="ms-2"
        type={currentNavId === 2 ? "submit" : "button"}
        onClick={currentNavId === 2 ? submitForm : handleNext}
      >
        <div className="d-flex align-items-center gap-sm-2 gap-1">
          {currentNavId === 2 ? "Submit" : "Next"}
          <SVG iconId="front-arrow" />
        </div>
      </Button>
    </div>
  );
};

export default CommonButton;
