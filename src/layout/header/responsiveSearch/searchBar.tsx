import { Loading, SearchMofi } from "@/constant";
import { MenuList } from "@/data/Layout/Menu";
import { MenuItem, SearchSuggestionItem } from "@/types/layoutTypes";
import { ChangeEvent, useEffect, useState } from "react";
import { X } from "react-feather";
import { Col, Form, Input } from "reactstrap";
import ResponsiveSearchList from "./responsiveSearchList";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setResponsiveSearch } from "@/redux/reducers/layoutSlice";

export const Searchbar = () => {
  const [arr, setArr] = useState<SearchSuggestionItem[]>([]);
  const [searchedWord, setSearchedWord] = useState<string>("");
  const [searchedArray, setSearchedArray] = useState<SearchSuggestionItem[]>([]);
  const { responsiveSearch } = useAppSelector((state) => state.layout);
  const dispatch = useAppDispatch();

  const handleClose = () => {
    dispatch(setResponsiveSearch());
    setSearchedWord("");
    document.body.classList.remove("offcanvas");
  };

  useEffect(() => {
    const suggesionArray: SearchSuggestionItem[] = [];
    const getAllLink = (item: MenuItem, icon: string | undefined) => {
      if (item.children) {
        item.children.forEach((ele) => {
          getAllLink(ele, icon);
        });
      } else {
        suggesionArray.push({ icon: icon, title: item.title, path: item.path || "" });
      }
    };
    MenuList?.forEach((item) => {
      item.Items?.forEach((child) => {
        getAllLink(child, child.icon);
      });
    });
    setArr(suggesionArray);
  }, []);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    if (!searchedWord) setSearchedWord("");
    setSearchedWord(e.target.value);
    const data = [...arr];
    const result = data.filter((item) => item.title?.toLowerCase().includes(e.target.value.toLowerCase()));
    setSearchedArray(result);
  };

  return (
    <Form className={`form-inline search-full ${responsiveSearch ? "open" : ""}`} method="get">
      <Col>
        <div className="form-group w-100">
          <div className="Typeahead Typeahead--twitterUsers">
            <div className="u-posRelative">
              <Input className="demo-input Typeahead-input form-control-plaintext border-0 w-100" type="text" placeholder={SearchMofi} value={searchedWord} onChange={(e) => handleSearch(e)} />
              <div className="spinner-border Typeahead-spinner" role="status">
                <span className="sr-only">{Loading}</span>
              </div>
              <X className="close-search" onClick={handleClose} />
            </div>
            <div className={`Typeahead-menu custom-scrollbar ${searchedWord.length ? "is-open" : ""}`}>
              <ResponsiveSearchList searchedArray={searchedArray} setSearchedWord={setSearchedWord} />
            </div>
          </div>
        </div>
      </Col>
    </Form>
  );
};
