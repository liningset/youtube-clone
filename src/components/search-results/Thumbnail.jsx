import { formatToDuration } from "../../utils/formatting";

const Thumbnail = ({ thumbnails, duration }) => {
  return (
    <div
      className={`bg-bg-primary flex-4 aspect-video relative overflow-hidden sm:rounded-2xl w-full min-w-50 sm:w-5/12`}
    >
      <img
        crossOrigin="anonymous"
        src={thumbnails?.standard?.url ?? thumbnails?.high?.url}
        className="w-full h-full object-cover"
        alt="video thumbnail"
      />
      {duration && (
        <span className="absolute right-4 bottom-4 text-xs bg-grey-31 text-bg-primary p-0.5 font-bold rounded-xs opacity-85">
          {formatToDuration(duration)}
        </span>
      )}
    </div>
  );
};

export default Thumbnail;
