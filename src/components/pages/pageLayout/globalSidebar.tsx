"use client";
import SVG from "@/commonComponent/svg";
import { RootState } from "@/redux/store";
import { useAppSelector } from "@/redux/hooks";
import { Col, Nav, NavItem, NavLink } from "reactstrap";
// import FloatingWidget from "@/components/form_&_table/form/templateRenderer";
interface SidebarItem {
  id: string;
  icon: string;
  title: string;
  detail: string;
}
interface GlobalSidebarProps {
  sliceName: string;
  items: SidebarItem[];
  setNavId: (id: string) => void;
}

const GlobalSidebar: React.FC<GlobalSidebarProps> = ({
  items,
  sliceName,
  setNavId,
}) => {
  const slice = useAppSelector(
    (state: RootState) => state[sliceName as keyof RootState]
  );
  const navId = (slice as { navId?: string }).navId;

  const handleClick = (id: string) => {
    setNavId(id);
  };

  return (
    <Col
      xxl="3"
      xl="4"
      className="box-col-4e sidebar-left-wrapper mb-2 add-product-tab relative"
    >
      <Nav pills className="sidebar-left-icons border-0" tabs>
        {items.map((data, i) => {
          return (
            <NavItem key={i}>
              <NavLink
                className="border-0"
                active={navId === data.id}
                onClick={() => {
                  handleClick(data.id);
                }}
                disabled={navId === "3"}
              >
                <div className="nav-rounded">
                  <div className="product-icons">
                    <SVG className="stroke-icon" iconId={data.icon} />
                  </div>
                </div>
                <div className="product-tab-content">
                  <h5>{data.title}</h5>
                  <p>{data.detail}</p>
                </div>
              </NavLink>
            </NavItem>
          );
        })}
      </Nav>

      {/* <FloatingWidget /> */}
    </Col>
  );
};

export default GlobalSidebar;
