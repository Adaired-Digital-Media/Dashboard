import ConfigDB from "@/config/themeConfig";
import { ImagePath, Pinned } from "@/constant";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { scrollToLeft, scrollToRight } from "@/redux/reducers/layoutSlice";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "react-feather";
import SimpleBar from "simplebar-react";
import { LogoWrapper } from "./logoWrapper";
import SidebarMenuList from "./sideBarMenuList";

export const SideBar = () => {
  const dispatch = useAppDispatch();
  const wrapper = ConfigDB.data.settings.layout_class;
  const { toggleSidebar, margin } = useAppSelector((state) => state.layout);
  const { pinedMenu } = useAppSelector((state) => state.layout);
  return (
    <div
      className={`sidebar-wrapper ${toggleSidebar ? "close_icon" : ""}`}
      id="sidebar-wrapper"
    >
      <LogoWrapper />
      <nav className="sidebar-main">
        <div
          className={`left-arrow ${margin === 0 ? "disabled" : ""}`}
          onClick={() => dispatch(scrollToLeft())}
        >
          <ArrowLeft />
        </div>
        <div
          id="sidebar-menu"
          style={{
            position: "inherit",
            marginLeft: `${
              wrapper === "horizontal-wrapper" ? margin + "px" : "0px"
            }`,
          }}
        >
          <ul className="sidebar-links custom-scrollbar" id="simple-bar">
            <SimpleBar style={{ width: "80px", height: "350px" }}>
              <li className="back-btn">
                <Link href={`/dashboard`}>
                  <img
                    className="img-fluid"
                    src={`${ImagePath}/logo/logo-icon.png`}
                    alt=""
                  />
                </Link>
                <div className="mobile-back text-end ">
                  <span>Back </span>
                  <i className="fa fa-angle-right ps-2" aria-hidden="true"></i>
                </div>
              </li>
              <li
                className={`pin-title sidebar-main-title ${
                  pinedMenu.length > 1 ? "show" : ""
                } `}
              >
                <div>
                  <h6>{Pinned}</h6>
                </div>
              </li>
              <SidebarMenuList />
            </SimpleBar>
          </ul>
        </div>
        <div
          className={`right-arrow ${margin === -3500 ? "disabled" : ""}`}
          onClick={() => dispatch(scrollToRight())}
        >
          <ArrowRight />
        </div>
      </nav>
    </div>
  );
};
