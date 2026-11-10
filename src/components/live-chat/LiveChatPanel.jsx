import MessagesContainer from "./MessagesContainer";
import PanelHeader from "./PanelHeader";
import TypeNewChat from "./TypeNewChat";

const LiveChatPanel = () => {
  // const {data } = useFetch("liveChatMessages", {part:"snippet"})

  return (
    <div className="relative min-h-0 px-5 [grid-area:livechat] lg:px-0">
      <div className="border-grey-d8 flex flex-col rounded-xl border lg:absolute lg:inset-0">
        <PanelHeader />
        <MessagesContainer />
        <TypeNewChat />
      </div>
    </div>
  );
};

export default LiveChatPanel;
