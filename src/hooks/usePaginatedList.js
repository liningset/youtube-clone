import { useEffect, useReducer } from "react";
import fetchFromYoutube from "../utils/fetchFromYoutube";

const reducer = (state, action) => {
  if (action.type === "switch-category") {
    return {
      data: { videos: [], channels: [] },
      nextPage: 0,
      status: "idle",
      trigger: state.trigger + 1,
    };
  }

  if (action.type === "change-status") {
    if (action?.status === state.status) return state;
    return {
      data: { videos: state.data.videos, channels: state.data.channels },
      nextPage: state.nextPage,
      status: action.status,
      trigger: state.trigger,
    };
  }

  if (action.type === "sync-with-fetched-data") {
    const newState = {
      data: { videos: state.data.videos, channels: state.data.channels },
      nextPage: action.token,
      status: "succeeded",
      trigger: state.trigger,
    };
    newState.data[action.resource] = [
      ...state.data[action.resource],
      ...action.data,
    ];
    return newState;
  }

  if (action.type === "trigger-next-fetch") {
    if (state.status === "pending") return state;
    return {
      data: { videos: state.data.videos, channels: state.data.channels },
      nextPage: state.nextPage,
      status: state.status,
      trigger: state.trigger + 1,
    };
  }
};

const usePaginatedList = (type, category) => {
  const [state, dispatch] = useReducer(reducer, {
    data: { videos: [], channels: [] },
    nextPage: 0,
    status: "idle",
    trigger: 0,
  });

  useEffect(() => {
    if (state.status === "pending") return;

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
    const switchCategory = () => dispatch({ type: "switch-category" });
    switchCategory();
  }, [category]);

  return {
    pagination: state,
    fetchNext: () => dispatch({ type: "trigger-next-fetch" }),
  };
};

export default usePaginatedList;
