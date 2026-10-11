import { useEffect, useReducer } from "react";
import fetchFromYoutube from "../utils/fetchFromYoutube";

const reducer = (state, action) => {
  if (action.type === "change-status") {
    if (!action?.status) return state;
    return {
      data: null,
      status: action.status,
    };
  }
  if (action.type === "sync-with-fetched-data") {
    if (!action?.data) return state;
    return {
      data: action.data,
      status: "idle",
    };
  }
  return state;
};

const useFetch = (type, params) => {
  const [state, dispatch] = useReducer(reducer, {
    data: null,
    status: "pending",
  });

  useEffect(() => {
    if (!params) return;
    const controller = new AbortController();

    fetchFromYoutube(type, params, controller.signal, dispatch);

    return () => controller.abort();
  }, []);

  return { data: state.data, status: state.status };
};
export default useFetch;
