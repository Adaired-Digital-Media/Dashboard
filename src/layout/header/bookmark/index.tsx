import SVG from "@/commonComponent/svg";
import { useAppSelector } from "@/redux/hooks";
import { BookmarkListData } from "./bookmarkListData";
import { BookmarkBack } from "./bookmarkBack";

export const BookMark = () => {
  const { flip } = useAppSelector((state) => state.layout);

  return (
    <li className="onhover-dropdown">
      <SVG iconId="header-bookmark" />
      <div className={`onhover-show-div bookmark-flip ${flip ? "active" : ""}`}>
        <div className="flip-card">
          <div className={`flip-card-inner ${flip ? "flipped" : ""}`}>
            <BookmarkListData />
            <BookmarkBack />
          </div>
        </div>
      </div>
    </li>
  );
};
