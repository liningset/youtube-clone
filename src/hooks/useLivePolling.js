import { useEffect, useMemo, useReducer } from "react";
import fetchFromYoutube from "../utils/fetchFromYoutube";

const reducer = (state, action) => {
  if (action.type === "change-status") {
    if (!action?.status) return state;
    if (action.status === state.status) return state;

    return {
      ...state,
      status: action.status,
      liveEnded: action.status.includes("liveChatEnded"),
    };
  }
  if (action.type === "sync-with-fetched-data") {
    if (!action?.data) return state;
    if (action?.data?.nextPageToken === state.nextPage) return state;

    const dedupedMessages = new Map(
      [...state.messages, ...action.data.items].map((message) => [
        message.id,
        message,
      ]),
    );

    return {
      ...state,
      messages: [...dedupedMessages.values()].slice(-150),
      status: "idle",
      nextPage: action.data?.nextPageToken ?? null,
      waitFor: action.data?.pollingIntervalMillis ?? null,
    };
  }
  if (action.type === "pause-polling") {
    return {
      ...state,
      resume: false,
    };
  }
  if (action.type === "resume-polling") {
    return {
      ...state,
      resume: true,
      nextPage: 0,
      waitFor: 0,
    };
  }

  return state;
};

const useLivePolling = (liveChatId) => {
  const [state, dispatch] = useReducer(reducer, {
    messages: [],
    status: "idle",
    resume: true,
    nextPage: 0,
    waitFor: 0,
    liveEnded: false,
  });

  const params = useMemo(() => {
    const obj = { part: "snippet,authorDetails", liveChatId };
    if (state.nextPage) obj.pageToken = state.nextPage;
    return obj;
  }, [liveChatId, state.nextPage]);

  useEffect(() => {
    if (!liveChatId) return;
    if (state.waitFor === null) return;
    if (!state.resume) return;

    const controller = new AbortController();

    const id = setTimeout(() => {
      fetchFromYoutube("liveChat/messages", params, controller, dispatch);
    }, state.waitFor);

    return () => {
      clearTimeout(id);
      controller.abort();
    };
  }, [liveChatId, params, state.waitFor, state.resume]);

  return {
    state,
    pausePolling: () => dispatch({ type: "pause-polling" }),
    resumePolling: () => dispatch({ type: "resume-polling" }),
  };
};

export default useLivePolling;
