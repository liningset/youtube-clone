import { useContext, useEffect, useRef } from "react";
import MessagesContainer from "./MessagesContainer";
import PanelHeader from "./PanelHeader";
import TypeNewChat from "./TypeNewChat";
import LiveChatContext from "../../data/LiveChatContext";

const LiveChatPanel = () => {
  const { closePanel, resumePolling, pausePolling } =
    useContext(LiveChatContext);
  const panelRef = useRef(null);

  useEffect(() => {
    resumePolling();
    panelRef.current.scrollIntoView({ block: "start", behavior: "smooth" });
  }, []);

  return (
    <div
      ref={panelRef}
      className="relative px-5 [grid-area:livechat] lg:px-0 scroll-mt-[10vh]"
    >
      <div className="border-grey-d8 flex flex-col rounded-xl border lg:absolute lg:inset-0">
        <PanelHeader closePanel={closePanel} pausePolling={pausePolling} />
        <MessagesContainer />
        <TypeNewChat />
      </div>
    </div>
  );
};

export default LiveChatPanel;
