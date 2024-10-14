import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LayoutState {
  flip: boolean;
  darkMode: boolean;
  toggleSidebar: boolean;
  pinedMenu: string[];
  layoutName: string;
  responsiveSearch: boolean;
  margin: number;
}

const initialState: LayoutState = {
  flip: false,
  darkMode: false,
  toggleSidebar: false,
  pinedMenu: [""],
  layoutName: "",
  responsiveSearch: false,
  margin: 0,
};

const layoutSlice = createSlice({
  name: "layout",
  initialState,
  reducers: {
    setFlip: (state) => {
      state.flip = !state.flip;
    },
    setDarkMode: (state) => {
      state.darkMode = !state.darkMode;
    },
    setToggleSidebar: (state, action: PayloadAction<boolean>) => {
      state.toggleSidebar = action.payload;
    },
    headerResponsive: () => {
      window.addEventListener("resize", () => {
        const header = document.getElementById("page-header");
        const sidebar = document.getElementById("sidebar-wrapper");

        if (header && sidebar) {
          if (window.innerWidth < 1200) {
            header.classList.add("close_icon");
            sidebar.classList.add("close_icon");
          } else {
            header.classList.remove("close_icon");
            sidebar.classList.remove("close_icon");
          }
        }
      });
    },
    setPinedMenu: (state, action: PayloadAction<string[]>) => {
      state.pinedMenu = action.payload;
    },
    handlePined: (state, action: PayloadAction<string | null>) => {
      if (action.payload) {
        if (state.pinedMenu.includes(action.payload)) {
          state.pinedMenu = state.pinedMenu.filter((item) => item !== action.payload);
        } else {
          state.pinedMenu.push(action.payload);
        }
      }
    },
    handleResponsiveToggle: () => {
      const sidebarClass = document.getElementById("sidebar-wrapper");
      const headerClass = document.getElementById("page-header");

      if (sidebarClass && headerClass) {
        const sidebarClosed = sidebarClass.classList.contains("close_icon");
        const headerClosed = headerClass.classList.contains("close_icon");

        if (sidebarClosed && headerClosed) {
          sidebarClass.classList.remove("close_icon");
          headerClass.classList.remove("close_icon");
        } else {
          sidebarClass.classList.add("close_icon");
          headerClass.classList.add("close_icon");
        }
      }
    },
    setResponsiveSearch: (state) => {
      state.responsiveSearch = !state.responsiveSearch;
    },
    scrollToLeft: (state) => {
      state.margin += 500;
    },
    scrollToRight: (state) => {
      state.margin -= 500;
    },
  },
});


export const {
  setFlip,
  setDarkMode,
  setToggleSidebar,
  setPinedMenu,
  handlePined,
  handleResponsiveToggle,
  setResponsiveSearch,
  headerResponsive,
  scrollToLeft,
  scrollToRight,
} = layoutSlice.actions;


export default layoutSlice.reducer;