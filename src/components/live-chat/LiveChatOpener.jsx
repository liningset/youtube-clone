import YoutubeIcon from "../common/YoutubeIcon";

const LiveChatOpener = () => {
  return (
    <div className="bg-grey-f8 flex flex-1 cursor-pointer flex-col self-stretch rounded-xl p-3">
      <h4 className="font-medium">Live chat</h4>
      <div className="flex items-center gap-2">
        <YoutubeIcon icon="chat" />
        <span className="line-clamp-2 flex-1 text-sm">
          Join the conversation to interact with the creator and others watching
          this live stream.
        </span>
        <button className="bg-grey-e8 hover:bg-grey-d8 rounded-3xl px-4 py-2 text-xs">
          Open panel
        </button>
      </div>
    </div>
  );
};

export default LiveChatOpener;
