import SVG from "@/commonComponent/svg";
import { ImagePath } from "@/constant";
import { useAppDispatch } from "@/redux/hooks";
import { handleResponsiveToggle } from "@/redux/reducers/layoutSlice";
import Link from "next/link";
import { Col } from "reactstrap";
export const HeaderLogo = () => {
  const dispatch = useAppDispatch();

  return (
    <Col className="header-logo-wrapper p-0">
      <div className="logo-wrapper">
        <Link href={`/dashboard`}>
          <img
            className="img-fluid"
            src={`${ImagePath}/logo/logo.png`}
            alt=""
          />
        </Link>
      </div>
      <div
        className="toggle-sidebar"
        onClick={() => dispatch(handleResponsiveToggle())}
      >
        <SVG
          className="stroke-icon sidebar-toggle status_toggle middle"
          iconId="toggle-icon"
        />
      </div>
    </Col>
  );
};
