import { formatToViewsSummary, formatToTimeAgo } from "../../utils/formatting";
import YoutubeIcon from "../common/YoutubeIcon";

//prettier-ignore
const CardDetails = ({title, viewCount, publishedAt, channelTitle, channelThumbnails, description}) => {

    const parse = (input) => {
    const parser = new DOMParser();
    return parser.parseFromString(input, "text/html").body.textContent;
  };

  return (
    <div className="flex flex-6 flex-col gap-4 px-5 sm:px-0">
        <div className="w-full flex justify-between ">
          <div className="flex flex-col">
            <h3 className="font-bold line-clamp-2 text-lg" title={parse(title)}>
              {parse(title)}
            </h3>
            <div className="text-xs opacity-70 text-grey-31">
              <span>{formatToViewsSummary(viewCount)}</span> •{" "}
              <span>{formatToTimeAgo(publishedAt)}</span>
            </div>
          </div>
          <button className="more p-2 rounded-full self-start cursor-pointer transition-button border-bg-primary active:bg-grey-e8  active:border-grey-e8">
            <YoutubeIcon icon="threeDots" />
          </button>
        </div>
        <div
          className="flex gap-2 items-center self-start"
          title={channelTitle}
        >
          <div className="w-6 aspect-square rounded-full overflow-hidden bg-border-clr">
            <img src={channelThumbnails?.default?.url} alt="Avatar" />
          </div>
          <span className="opacity-70 hover:opacity-100 text-xs">
            {parse(channelTitle)}
          </span>
        </div>
        <p
          className="text-xs hidden sm:block opacity-70"
          title="From the video description"
        >
          {parse(description)}
        </p>
      </div>
  )
}

export default CardDetails;
