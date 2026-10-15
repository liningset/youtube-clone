import dummyData from "../utils/data.json";

const fetchFromYoutube = async (type, params, signal, dispatch) => {
  const onLoading = () =>
    dispatch({
      type: "change-status",
      status: "pending",
      resource: type === "search" ? "videos" : type,
    });

  const onResolved = (data) =>
    dispatch({
      type: "sync-with-fetched-data",
      data,
      resource: type === "search" ? "videos" : type,
    });

  const onRejected = (err) =>
    dispatch({
      type: "change-status",
      status: `error:${err.message}`,
      resource: type === "search" ? "videos" : type,
    });

  if (type === "search") {
    onResolved(dummyData);
    return;
  }

  try {
    onLoading();
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    const URLParams = new URLSearchParams(params);
    URLParams.append("key", import.meta.env.VITE_KEY);

    const res = await fetch(`${BASE_URL}${type}?${URLParams}`, { signal });
    const data = await res.json();

    if (data.error != null) throw new Error(data?.error?.message);
    if (!data?.items) throw new Error("res.ok === false");
    onResolved(data);
  } catch (err) {
    if (err.name === "AbortError") return;
    onRejected(err);
  }
};

export default fetchFromYoutube;
