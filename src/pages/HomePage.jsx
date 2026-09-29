import { useContext } from "react";
import SideBar from "../components/SideBar";
import SideBarModal from "../components/SideBarModal";
import SideBarContext from "../utils/SideBarContext";

const HomePage = () => {
  const { withinModal } = useContext(SideBarContext);
  // const
  return (
    <>
      {withinModal ? <SideBarModal /> : <SideBar />}
      <main className="h-[400vh]"></main>
    </>
  );
};
export default HomePage;
