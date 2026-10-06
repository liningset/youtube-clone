import { VideoCardsListShimmer } from "./VideoCardsList";
import LoadingImage from "../../public/Loading_icon_cropped.gif";

const VideoCardsListPagination = () => {
  return (
    <div className="flex flex-col gap-6 mb-4">
      <VideoCardsListShimmer times={6} />
      <div className="self-center">
        <img className="w-8" src={LoadingImage} alt="Loading..." />
      </div>
    </div>
  );
};
export default VideoCardsListPagination;
