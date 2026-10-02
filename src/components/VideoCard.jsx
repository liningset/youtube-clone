import YoutubeIcon from "./YoutubeIcon";

const VideoCard = () => {
  return (
    <li>
      <div className="bg-border-clr aspect-video relative overflow-hidden rounded-2xl">
        <img src="" alt="video thumbnail" />
        <span className="absolute right-4 bottom-4 text-xs bg-grey-31 text-bg-primary p-0.5 rounded-xs opacity-75">
          12:43
        </span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-16 aspect-square rounded-full bg-border-clr">
          <img src="" alt="channel profile" />
        </div>
        <div>
          <div className="flex w-full justify-between items-start">
            <h3 className="font-bold text-xl">
              The quick brown fox jumps over the lazy dog
            </h3>
            <button>
              <YoutubeIcon icon="threeDots" />
            </button>
          </div>
          <div>
            <span>PewDiePie</span> • <span>69M</span> •{" "}
            <span>3 months ago</span>
          </div>
        </div>
      </div>
    </li>
  );
};
export default VideoCard;
