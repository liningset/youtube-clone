import YoutubeIcon from "./YoutubeIcon";

const LiveTag = () => {
  return (
    <div className="flex text-xs h-4 p-1 self-start items-center font-medium  fill-white bg-red-500 text-white">
      <YoutubeIcon icon="live" tailwindStyles="w-4" />
      LIVE
    </div>
  );
};

export default LiveTag;
