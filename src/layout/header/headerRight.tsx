import { Col } from "reactstrap";
import { HeaderSearch } from "./headerSearch";
import { Notification } from "./notification";
import { SearchBox } from "./searchBox";
import { BookMark } from "./bookmark";
import { DarkMode } from "./darkMode";
import { MessageBox } from "./messageBox";
import { CartData } from "./cartData";
import { Profile } from "./profile";
import MaximizeScreen from "./maximizeScreen";

export const HeaderRight = () => {
  return (
    <Col xxl="8" xl="6" md="7" xs="8" className="nav-right pull-right right-header p-0 ms-auto">
      <ul className="nav-menus">
        <SearchBox />
        <HeaderSearch />
        <MaximizeScreen />
        <Notification />
        <BookMark />
        <DarkMode />
        <MessageBox />
        <CartData />
        <Profile/>
      </ul>
    </Col>
  );
};
