// Nextjs Import
import Link from "next/link";

// React Feather Import
import { Filter } from "react-feather";

// Redux Imports
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setFilterToggle } from "@/redux/reducers/addPostSlice";

const FilterHeader = () => {
  const dispatch = useAppDispatch();
  const { filterToggle } = useAppSelector((state) => state.addPost);
  return (
    <div>
      <div className="light-box" onClick={() => dispatch(setFilterToggle())}>
        <a>
          <Filter className={`filter-icon ${filterToggle ? "hide" : "show"}`} />
          <i
            className={`icon-close filter-close ${
              filterToggle ? "show" : "hide"
            }`}
          />
        </a>
      </div>
      <Link className="btn btn-primary" href={`/pages/blog/add_post`}>
        <i className="fa fa-plus" />
        Add New Post
      </Link>
    </div>
  );
};

export default FilterHeader;


