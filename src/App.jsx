import { useState } from "react";
import { Outlet } from "react-router";
import Header from "./components/Header";
import SideBarContext from "./utils/SideBarContext";

function App() {
  const mediaQuery = matchMedia("(min-width:760px)");
  const [collapsed, setCollapsed] = useState(!mediaQuery.matches);
  return (
    <SideBarContext.Provider value={{ collapsed, setCollapsed }}>
      <Header />
      <Outlet />
    </SideBarContext.Provider>
  );
}

export default App;
