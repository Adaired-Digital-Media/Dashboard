import SVG from "@/commonComponent/svg";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { handlePined } from "@/redux/reducers/layoutSlice";
import { MenuListType, SidebarItemTypes } from "@/types/layoutTypes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

const Menulist: React.FC<MenuListType> = ({
  menu,
  setActiveMenu,
  activeMenu,
  level,
  className,
}) => {
  const { pinedMenu } = useAppSelector((state) => state.layout);
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  // const { sidebarIconType } = useAppSelector((state) => state.themeCustomizer)

  const ActiveNavLinkUrl = (path?: string, active?: boolean) => {
    return pathname === path ? (active ? active : true) : "";
  };

  const shouldSetActive = ({ item }: SidebarItemTypes) => {
    let returnValue = false;
    if (item?.path === pathname) returnValue = true;
    if (!returnValue && item?.children) {
      item?.children.every((subItem) => {
        returnValue = shouldSetActive({ item: subItem });
        return !returnValue;
      });
    }
    return returnValue;
  };

  useEffect(() => {
    menu?.forEach((item: any) => {
      const gotValue = shouldSetActive({ item });
      if (gotValue) {
        const temp = [...activeMenu];
        temp[level] = item.title;
        setActiveMenu(temp);
      }
    });
  }, []);

  return (
    <>
      {menu?.map((item, index) => (
        <li
          key={index}
          className={`${level === 0 ? "sidebar-list" : ""}
          ${pinedMenu.includes(item.title || "") ? "pined" : ""} 
           ${
             (item.children
               ? item.children
                   .map((innerItem) => ActiveNavLinkUrl(innerItem.path))
                   .includes(true)
               : ActiveNavLinkUrl(item.path)) ||
             activeMenu[level] === item.title
               ? "active"
               : ""
           } `}
        >
          {level === 0 && (
            <i
              className="fa fa-thumb-tack"
              onClick={() => dispatch(handlePined(item.title))}
            ></i>
          )}
          <Link
            className={`${
              !className && level !== 2 ? "sidebar-link sidebar-title" : ""
            }  ${
              (item.children
                ? item.children
                    .map((innerItem) => ActiveNavLinkUrl(innerItem.path))
                    .includes(true)
                : ActiveNavLinkUrl(item.path)) ||
              activeMenu[level] === item.title
                ? "active"
                : ""
            }`}
            href={item?.path ? `${item.path}` : ""}
            onClick={() => {
              const temp = activeMenu;
              temp[level] = item.title !== temp[level] && item.title;
              setActiveMenu([...temp]);
            }}
          >
            {item.icon && (
              <SVG className={`stroke-icon`} iconId={`stroke-${item.icon}`} />
            )}
            <span>{item.title}</span>
            {item.children && (
              <div className="according-menu">
                <i className="fa fa-angle-right" />
              </div>
            )}
          </Link>
          {item.children && (
            <ul
              className={`${
                level !== 0
                  ? "nav-sub-childmenu submenu-content"
                  : "sidebar-submenu "
              }`}
            >
              <Menulist
                menu={item.children}
                activeMenu={activeMenu}
                setActiveMenu={setActiveMenu}
                level={level + 1}
                className="sidebar-submenu"
              />
            </ul>
          )}
        </li>
      ))}
    </>
  );
};

export default Menulist;
