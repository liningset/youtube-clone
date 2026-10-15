import { useEffect, useReducer } from "react";
import fetchFromYoutube from "../utils/fetchFromYoutube";

const reducer = (state, action) => {
  if (action.type === "change-status") {
    if (!action?.status) return state;
    if (action.status === state.status) return state;

    return {
      videos: state.videos,
      nextPage: state.nextPage,
      status: action.status,
      trigger: state.trigger,
    };
  }

  if (action.type === "sync-with-fetched-data") {
    if (!action?.data) return state;
    return {
      videos: [...state.videos, ...action.data.items],
      nextPage: action.data.nextPageToken ?? null,
      status: "idle",
      trigger: state.trigger,
    };
  }

  if (action.type === "trigger-next-fetch") {
    if (state.status === "pending") return state;
    return {
      videos: state.videos,
      nextPage: state.nextPage,
      status: state.status,
      trigger: state.trigger + 1,
    };
  }

  return state;
};

const usePaginatedSearch = (params) => {
  const [state, dispatch] = useReducer(reducer, {
    videos: [],
    nextPage: 0,
    status: "idle",
    trigger: 0,
  });

  useEffect(() => {
    if (state.status === "pending") return;

    const controller = new AbortController();
    const fullParams = { ...params };
    if (state.nextPage) fullParams.pageToken = state.nextPage;

    fetchFromYoutube("search", fullParams, controller.signal, dispatch);

    return () => controller.abort();
  }, [state.trigger]);

  return {
    searchState: state,
    fetchNext: () => dispatch({ type: "trigger-next-fetch" }),
  };
};

export default usePaginatedSearch;
