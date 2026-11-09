import { useEffect, useReducer } from "react";
import fetchFromYoutube from "../utils/fetchFromYoutube";

const reducer = (state, action) => {
  if (action.type === "switch-category") {
    if (!action.category) return state;
    return {
      data: { videos: [], channels: [] },
      category: action.category,
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
      category: { ...state.category },
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
      category: { ...state.category },
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
      category: { ...state.category },
      nextPage: state.nextPage,
      status: { ...state.status },
      trigger: state.trigger + 1,
    };
  }

  return state;
};

const usePaginatedVideos = (params) => {
  const [state, dispatch] = useReducer(reducer, {
    data: { videos: [], channels: [] },
    category: { title: "All", id: 0 },
    nextPage: 0,
    status: { videos: "idle", channels: "idle" },
    trigger: 0,
  });

  useEffect(() => {
    if (state.status.videos === "pending") return;
    if (params?.id?.length === 0) return;

    const controller = new AbortController();
    const fullParams = { ...params };
    if (state.nextPage) fullParams.pageToken = state.nextPage;
    if (state.category.title !== "All") {
      fullParams.videoCategoryId = state.category.id;
    }

    fetchFromYoutube("videos", fullParams, controller, dispatch);

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

    fetchFromYoutube("channels", params, controller, dispatch);

    return () => controller.abort();
  }, [state.data.videos]);

  useEffect(() => {
    if (params?.id?.length === 0) return;
    dispatch({ type: "trigger-next-fetch" });
  }, [params]);

  return {
    pagination: state,
    fetchNext: () => dispatch({ type: "trigger-next-fetch" }),
    changeCategory: (category) =>
      dispatch({ type: "switch-category", category }),
  };
};

export default usePaginatedVideos;
