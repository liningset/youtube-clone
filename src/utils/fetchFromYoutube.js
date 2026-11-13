const TIMEOUT_MS = 10000;

const fetchFromYoutube = async (type, params, controller, dispatch) => {
  let timedOut = false;
  let timeoutID;

  const onLoading = () => {
    dispatch({ type: "change-status", status: "pending", resource: type });
    timeoutID = setTimeout(() => {
      timedOut = true;
      controller.abort();
    }, TIMEOUT_MS);
  };

  const onResolved = (data) => {
    dispatch({ type: "sync-with-fetched-data", data, resource: type });
  };

  const onRejected = (err) => {
    dispatch({
      type: "change-status",
      status: `error: ${err.message}: ${err?.errors?.map((e) => e.reason).join(",")}`,
      resource: type,
    });
  };

  try {
    onLoading();
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    const URLParams = new URLSearchParams(params);
    URLParams.append("key", import.meta.env.VITE_KEY);

    const res = await fetch(`${BASE_URL}${type}?${URLParams}`, {
      signal: controller.signal,
    });
    const data = await res.json();

    if (data.error != null) throw data.error;
    if (!data?.items) throw new Error("res.ok === false");
    onResolved(data);
  } catch (err) {
    if (err.name === "AbortError") {
      if (timedOut) onRejected({ message: "timeout" });
      else return;
    } else onRejected(err);
  } finally {
    clearTimeout(timeoutID);
  }
};

export default fetchFromYoutube;
