import { useContext, useMemo, useState } from "react";
import LiveChatContext from "../../data/LiveChatContext";
import useFetch from "../../hooks/useFetch";
import WatchPageContext from "../../data/WatchPageContext";

const LiveChatContextProvider = ({ children }) => {
  const { watchVideo } = useContext(WatchPageContext);
  const [panelOpened, setPanelOpened] = useState(true);
  const { data } = useFetch("liveChatMessages", {
    part: "snippet",
    liveChatId: watchVideo?.liveStreamingDetails?.activeLiveChatId,
  });

  const values = useMemo(
    () => ({
      panelOpened,
      openPanel: () => setPanelOpened(true),
      closePanel: () => setPanelOpened(false),
    }),
    [panelOpened],
  );

  return (
    <LiveChatContext.Provider value={values}>
      {children}
    </LiveChatContext.Provider>
  );
};

export default LiveChatContextProvider;
