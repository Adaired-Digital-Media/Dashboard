import React, { ChangeEvent } from "react";
import { Form, Input } from "reactstrap";
import { Search } from "@/constant";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
// import { setSearchTerm } from "@/Redux/Reducers/FileManagerSlice";

const SearchBar = () => {
  //   const { searchTerm } = useAppSelector((state) => state.fileManager);
  const dispatch = useAppDispatch();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    // dispatch(setSearchTerm(event.target.value));
  };

  return (
    <Form className="form-inline">
      <div className="form-group d-flex align-items-center mb-0">
        <i className="fa fa-search"></i>
        <Input
          className="form-control-plaintext border-0 shadow-none"
          type="text"
          // value={searchTerm}
          onChange={(e) => handleChange(e)}
          placeholder={Search}
        />
      </div>
    </Form>
  );
};
export default SearchBar;
