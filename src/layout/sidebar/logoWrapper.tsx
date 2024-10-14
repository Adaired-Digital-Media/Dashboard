import SVG from "@/commonComponent/svg";
import { ImagePath } from "@/constant";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  handleResponsiveToggle,
  setToggleSidebar,
} from "@/redux/reducers/layoutSlice";
import Link from "next/link";

export const LogoWrapper = () => {
  const dispatch = useAppDispatch();
  const { toggleSidebar } = useAppSelector((state) => state.layout);
  return (
    <>
      <div className="logo-wrapper">
        <Link href={`/dashboard`}>
          <img
            className="img-fluid"
            src={`${ImagePath}/logo/ad_logo.png`}
            alt=""
          />
        </Link>
        <div
          className="back-btn"
          onClick={() => dispatch(handleResponsiveToggle())}
        >
          <i className="fa fa-angle-left"></i>
        </div>
        <div
          className="toggle-sidebar"
          onClick={() => dispatch(setToggleSidebar(!toggleSidebar))}
          defaultChecked
        >
          <SVG
            className={`stroke-icon sidebar-toggle status_toggle middle`}
            iconId={`toggle-icon`}
          />
        </div>
      </div>
      <div className="logo-icon-wrapper">
        <Link href={`/dashboard`}>
          <img
            className="img-fluid"
            src={`${ImagePath}/logo/logo-icon.png`}
            alt=""
          />
        </Link>
      </div>
    </>
  );
};
