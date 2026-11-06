import VideoPlayer from "./VideoPlayer";
import VideoDetails from "./VideoDetails";
import { useContext } from "react";
import WatchPageContext from "../../data/WatchPageContext";

const WatchSection = () => {
  const { dataExists } = useContext(WatchPageContext);
  return (
    <section className="[grid-area:video] w-full">
      <VideoPlayer />
      {dataExists && <VideoDetails />}
    </section>
  );
};

export default WatchSection;
