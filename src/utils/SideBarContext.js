import { createContext } from "react";

const SideBarContext = createContext({
  collapsed: false,
  withinModal: false,
  setCollapsed: () => console.log("context not provided"),
  setWithinModal: () => console.log("context not provided"),
});

export default SideBarContext;
