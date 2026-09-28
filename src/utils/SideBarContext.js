import { createContext } from "react";

const SideBarContext = createContext({
  collapsed: false,
  setCollapsed: () => console.log("context not provided"),
});

export default SideBarContext;
