import { useContext, useEffect, useMemo, useState } from "react";
import LiveChatContext from "../../data/LiveChatContext";
import WatchPageContext from "../../data/WatchPageContext";
import useLivePolling from "../../hooks/useLivePolling";

const LiveChatContextProvider = ({ children }) => {
  const { isLive, watchVideo, disableChat } = useContext(WatchPageContext);
  const [panelOpened, setPanelOpened] = useState(true);

  const chatId = watchVideo?.liveStreamingDetails?.activeLiveChatId;
  const { state, pausePolling, resumePolling } = useLivePolling(chatId);

  useEffect(() => {
    if (state.status.includes("liveChatDisabled")) disableChat();
  }, [state.status, disableChat]);

  const values = useMemo(
    () => ({
      chatState: state,
      panelOpened,
      openPanel: () => setPanelOpened(true),
      closePanel: () => setPanelOpened(false),
      pausePolling,
      resumePolling,
    }),
    [panelOpened, state, pausePolling, resumePolling],
  );

  return isLive ? (
    <LiveChatContext.Provider value={values}>
      {children}
    </LiveChatContext.Provider>
  ) : (
    children
  );
};

export default LiveChatContextProvider;
