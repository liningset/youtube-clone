import { useEffect, useState } from "react";
import { Outlet } from "react-router";
import Header from "./components/Header";
import SideBarContext from "./utils/SideBarContext";

function App() {
  const mediaQuery = matchMedia("(min-width:760px)");
  const [collapsed, setCollapsed] = useState(!mediaQuery.matches);
  const [withinModal, setWithinModal] = useState(!mediaQuery.matches);

  const onChange = (e) => setWithinModal(!e.matches);

  useEffect(() => {
    const mediaQuery = matchMedia("(min-width:760px)");
    mediaQuery.onchange = (e) => onChange(e);

    return () => (mediaQuery.onchange = null);
  }, []);

  return (
    <SideBarContext.Provider
      value={{ collapsed, setCollapsed, withinModal, setWithinModal }}
    >
      <Header />
      <Outlet />
    </SideBarContext.Provider>
  );
}

export default App;
