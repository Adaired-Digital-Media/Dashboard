import SVG from "@/commonComponent/svg";
import { useAppDispatch } from "@/redux/hooks";
import { setResponsiveSearch } from "@/redux/reducers/layoutSlice";

export const SearchBox = () => {
  const dispatch = useAppDispatch()
  
  return (
    <li onClick={()=>dispatch(setResponsiveSearch())}>
      <span className="header-search">
        <SVG iconId="search"/>
      </span>
    </li>
  );
};
