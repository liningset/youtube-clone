import { useEffect, useReducer } from "react";
import fetchFromYoutube from "../utils/fetchFromYoutube";

const reducer = (state, action) => {
  if (action.type === "switch-category") {
    return {
      data: { videos: [], channels: [] },
      nextPage: 0,
      status: { videos: "idle", channels: "idle" },
      trigger: state.trigger + 1,
    };
  }

  if (action.type === "change-status") {
    if (!action?.status) return state;
    if (action.status === state.status[action.resource]) return state;
    const newState = {
      data: { ...state.data },
      nextPage: state.nextPage,
      status: { ...state.status },
      trigger: state.trigger,
    };
    newState.status[action.resource] = action.status;
    return newState;
  }

  if (action.type === "sync-with-fetched-data") {
    const newState = {
      data: { ...state.data },
      nextPage:
        action.resource === "videos"
          ? (action.data.nextPageToken ?? null)
          : state.nextPage,
      status: { ...state.status },
      trigger: state.trigger,
    };
    newState.data[action.resource] = [
      ...state.data[action.resource],
      ...action.data.items,
    ];
    newState.status[action.resource] = "idle";
    return newState;
  }

  if (action.type === "trigger-next-fetch") {
    if (state.status.videos === "pending") return state;
    return {
      data: { videos: state.data.videos, channels: state.data.channels },
      nextPage: state.nextPage,
      status: { ...state.status },
      trigger: state.trigger + 1,
    };
  }

  return state;
};

const usePaginatedList = (type, category) => {
  const [state, dispatch] = useReducer(reducer, {
    data: { videos: [], channels: [] },
    nextPage: 0,
    status: { videos: "idle", channels: "idle" },
    trigger: 0,
  });

  useEffect(() => {
    if (state.status.videos === "pending") return;

    const controller = new AbortController();
    const params = {
      regionCode: "US",
      chart: "mostPopular",
      part: "snippet,statistics,contentDetails",
      maxResults: 15,
    };
    if (state.nextPage) params.pageToken = state.nextPage;
    if (category.title !== "All") params.videoCategoryId = category.id;

    fetchFromYoutube(type, params, controller.signal, dispatch);

    return () => controller.abort();
  }, [state.trigger]);

  useEffect(() => {
    if (state.data.videos.length === 0) return;

    const channelIDs = state.data.videos.map((v) => v?.snippet?.channelId);
    const dedupedIDs = Array.from(new Set(channelIDs));
    const existingIDs = new Set(state.data.channels.map((c) => c.id));
    const excludedPrevIDs = dedupedIDs.filter((id) => !existingIDs.has(id));

    if (!excludedPrevIDs.length) return;

    const controller = new AbortController();
    const params = { part: "snippet", id: excludedPrevIDs.join(",") };

    fetchFromYoutube("channels", params, controller.signal, dispatch);

    return () => controller.abort();
  }, [state.data.videos]);

  return {
    pagination: state,
    fetchNext: () => dispatch({ type: "trigger-next-fetch" }),
    switchInState: () => dispatch({ type: "switch-category" }),
  };
};

export default usePaginatedList;
