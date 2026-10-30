import { useReducer, useEffect } from "react";
import fetchFromYoutube from "../utils/fetchFromYoutube";

const reducer = (state, action) => {
  if (action.type === "change-status") {
    if (!action?.status) return state;
    if (action.status === state.status) return state;

    return {
      comments: state.comments,
      nextPage: state.nextPage,
      status: action.status,
      trigger: state.trigger,
    };
  }

  if (action.type === "sync-with-fetched-data") {
    if (!action?.data) return state;

    return {
      comments: [...state.comments, ...action.data.items],
      nextPage: action.data.nextPageToken ?? null,
      status: "idle",
      trigger: state.trigger,
    };
  }

  if (action.type === "trigger-next-fetch") {
    if (state.status === "pending") return state;
    return {
      comments: state.comments,
      nextPage: state.nextPage,
      status: state.status,
      trigger: state.trigger + 1,
    };
  }

  return state;
};

const usePaginatedComments = (start, params, resource) => {
  const [state, dispatch] = useReducer(reducer, {
    comments: [],
    nextPage: 0,
    status: "idle",
    trigger: 0,
  });

  useEffect(() => {
    if (state.status === "pending") return;
    if (resource === "comments" && !params.parentId) return;
    if (resource === "commentThreads" && !params.videoId) return;
    if (start === false) return;

    const controller = new AbortController();
    const fullParams = { ...params };
    if (state.nextPage) fullParams.pageToken = state.nextPage;

    fetchFromYoutube(resource, fullParams, controller.signal, dispatch);

    return () => controller.abort();
  }, [state.trigger, params, start]);

  return {
    commentState: state,
    fetchNext: () => dispatch({ type: "trigger-next-fetch" }),
  };
};
export default usePaginatedComments;
