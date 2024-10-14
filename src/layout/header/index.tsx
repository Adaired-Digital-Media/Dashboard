import { Row } from "reactstrap";
import { MobileView } from "./mobileView";
import { BreadCrumbs } from "./breadCrumbs";
import { useEffect } from "react";
import { PageHeader } from "./pageHeader";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { headerResponsive } from "@/redux/reducers/layoutSlice";

export const Header = () => {
    const { toggleSidebar } = useAppSelector((state) => state.layout);
    const dispatch = useAppDispatch();
  
    useEffect(() => {
      dispatch(headerResponsive());
    }, []);

    return(
<Row className={`page-header ${toggleSidebar ? "close_icon" : ""}`} id="page-header">
      <MobileView />
      <BreadCrumbs />
      <PageHeader />
    </Row>
    )
}