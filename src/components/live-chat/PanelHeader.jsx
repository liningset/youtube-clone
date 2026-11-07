import YoutubeIcon from "../common/YoutubeIcon";

const PanelHeader = () => {
  return (
    <div className="flex items-center justify-between p-2">
      <div className="ml-2 flex items-center gap-2">
        Top chat <YoutubeIcon icon="showMore" />
      </div>
      <div className="flex items-center">
        <button className="hover:bg-border-clr flex aspect-square w-10 cursor-pointer items-center justify-center rounded-full">
          <YoutubeIcon icon="threeDots" />
        </button>
        <button className="hover:bg-border-clr flex aspect-square w-10 cursor-pointer items-center justify-center rounded-full">
          <YoutubeIcon icon="times" />
        </button>
      </div>
    </div>
  );
};

export default PanelHeader;
