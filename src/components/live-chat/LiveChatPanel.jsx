import MessagesContainer from "./MessagesContainer";
import PanelHeader from "./PanelHeader";
import TypeNewChat from "./TypeNewChat";

const LiveChatPanel = () => {
  return (
    <div className="border-grey-d8 flex max-h-190 flex-col rounded-xl border [grid-area:livechat]">
      <PanelHeader />
      <MessagesContainer />
      <TypeNewChat />
    </div>
  );
};

export default LiveChatPanel;
