import { useEffect, useMemo, useReducer } from "react";
import fetchFromYoutube from "../utils/fetchFromYoutube";

const reducer = (state, action) => {
  if (action.type === "change-status") {
    if (!action?.status) return state;
    if (action.status === state.status) return state;

    return {
      messages: state.messages,
      status: action.status,
      resume: state.resume,
      nextPage: state.nextPage,
      waitFor: state.waitFor,
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
      messages: [...dedupedMessages.values()].slice(-150),
      status: "idle",
      resume: state.resume,
      nextPage: action.data?.nextPageToken ?? null,
      waitFor: action.data?.pollingIntervalMillis ?? null,
    };
  }
  if (action.type === "pause-polling") {
    return {
      messages: state.messages,
      status: state.status,
      resume: false,
      nextPage: state.nextPage,
      waitFor: state.waitFor,
    };
  }
  if (action.type === "resume-polling") {
    return {
      messages: state.messages,
      status: state.status,
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
  });

  const params = useMemo(
    () => ({ part: "snippet,authorDetails", liveChatId }),
    [liveChatId],
  );

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
