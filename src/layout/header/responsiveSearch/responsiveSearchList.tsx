import SVG from "@/commonComponent/svg";
import { useAppDispatch } from "@/redux/hooks";
import { setResponsiveSearch } from "@/redux/reducers/layoutSlice";
import { SearchSuggestionListType } from "@/types/layoutTypes";
import Link from "next/link";

const ResponsiveSearchList = ({
  searchedArray,
  setSearchedWord,
}: SearchSuggestionListType) => {
  const dispatch = useAppDispatch();
  const handleSearch = () => {
    setSearchedWord("");
    dispatch(setResponsiveSearch());
  };

  return (
    <>
      {searchedArray?.map((item, index) => (
        <div className="ProfileCard u-cf" key={index}>
          <div className="ProfileCard-avatar">
            <SVG
              className="feather feather-airplay m-0"
              iconId={`stroke-${item.icon}`}
            />
          </div>
          <div className="ProfileCard-details">
            <div className="ProfileCard-realName">
              <Link
                className="realname w-auto d-flex justify-content-start gap-2"
                href={`/${item.path}`}
                onClick={handleSearch}
              >
                {item.title}
              </Link>
            </div>
          </div>
        </div>
      ))}
      {!searchedArray?.length && <p>Opps!! There are no result found.</p>}
    </>
  );
};

export default ResponsiveSearchList;
