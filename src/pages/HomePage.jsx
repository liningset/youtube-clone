import { useContext } from "react";
import SideBar from "../components/SideBar";
import SideBarModal from "../components/SideBarModal";
import SideBarContext from "../utils/SideBarContext";

const HomePage = () => {
  const { outOfModal } = useContext(SideBarContext);
  // const
  return (
    <>
      {outOfModal ? <SideBar /> : <SideBarModal />}
      <main className="h-[400vh]"></main>
    </>
  );
};
export default HomePage;
