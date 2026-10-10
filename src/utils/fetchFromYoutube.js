const fetchFromYoutube = async (type, params, signal, dispatch) => {
  try {
    dispatch({ type: "change-status", status: "pending" });
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    const URLParams = new URLSearchParams(params);
    URLParams.append("key", import.meta.env.VITE_KEY);

    const res = await fetch(`${BASE_URL}${type}?${URLParams}`, { signal });
    const data = await res.json();

    if (data.error != null) throw new Error(data?.error?.message);
    if (!data?.items) throw new Error("res.ok === false");

    dispatch({ type: "sync-with-fetched-data", data, resource: type });
  } catch (err) {
    if (err.name === "AbortError") return;
    dispatch({
      type: "change-status",
      status: `error:${err.message}`,
    });
  }
};

export default fetchFromYoutube;
