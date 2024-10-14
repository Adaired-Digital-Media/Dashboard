import { ImagePath } from "@/constant";

import Link from "next/link";
import { Col } from "reactstrap";

export const MobileView = () => {
  return (
    <Col className="header-logo-wrapper col-auto">
      <div className="logo-wrapper">
        <Link href={`/dashboard`}>
          <img
            className="img-fluid for-light"
            src={`${ImagePath}/logo/ad_logo.png`}
            alt=""
          />
          <img
            className="img-fluid for-dark"
            src={`${ImagePath}/logo/logo_light.png`}
            alt=""
          />
        </Link>
      </div>
    </Col>
  );
};
