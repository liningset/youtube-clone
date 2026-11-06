import VideoPlayer from "./VideoPlayer";
import VideoDetails from "./VideoDetails";

const WatchSection = ({ query, data }) => {
  return (
    <section className="[grid-area:video] w-full">
      <VideoPlayer query={query} />
      {data?.items && <VideoDetails video={data?.items[0]} />}
    </section>
  );
};

export default WatchSection;
