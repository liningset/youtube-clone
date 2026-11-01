import { useReducer, useEffect } from "react";
import fetchFromYoutube from "../utils/fetchFromYoutube";

const reducer = (state, action) => {
  if (action.type === "change-order") {
    if (!action?.order || !["relevance", "time"].includes(action?.order))
      return state;
    if (action.order === state.order) return state;
    return {
      comments: [],
      order: action.order,
      nextPage: 0,
      status: "idle",
      trigger: state.trigger + 1,
    };
  }

  if (action.type === "change-status") {
    if (!action?.status) return state;
    if (action.status === state.status) return state;

    return {
      comments: state.comments,
      order: state.order,
      nextPage: state.nextPage,
      status: action.status,
      trigger: state.trigger,
    };
  }

  if (action.type === "sync-with-fetched-data") {
    if (!action?.data) return state;

    return {
      comments: [...state.comments, ...action.data.items],
      order: state.order,
      nextPage: action.data.nextPageToken ?? null,
      status: "idle",
      trigger: state.trigger,
    };
  }

  if (action.type === "trigger-next-fetch") {
    if (state.status === "pending") return state;
    return {
      comments: state.comments,
      order: state.order,
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
    order: "relevance",
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
    if (resource === "commentThreads") fullParams.order = state.order;

    fetchFromYoutube(resource, fullParams, controller.signal, dispatch);

    return () => controller.abort();
  }, [state.trigger, params, start]);

  const changeOrder = (newOrder) => {
    if (resource === "comments") return;
    dispatch({ type: "change-order", order: newOrder });
  };

  return {
    commentState: state,
    fetchNext: () => dispatch({ type: "trigger-next-fetch" }),
    changeOrder,
  };
};
export default usePaginatedComments;
