import { useSearchParams } from "react-router";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateCurrentPage } from "../utils/appSlice";
import useFetch from "../hooks/useFetch";
import usePaginatedList from "../hooks/usePaginatedList";
import VideoCardsList from "../components/VideoCardsList";
import PaginationContext from "../utils/PaginationContext";
import LoadingWheel from "../components/LoadingWheel";

const params = {
  regionCode: "US",
  chart: "mostPopular",
  part: "snippet,statistics,contentDetails",
  maxResults: 50,
};

const WatchPage = () => {
  const query = useSearchParams()[0].get("v");
  const dispatch = useDispatch();

  const { data } = useFetch("videos", {
    id: query,
    part: "snippet,contentDetails,statistics",
  });

  const { pagination, fetchNext } = usePaginatedList("videos", params, {
    title: "All",
  });

  useEffect(() => {
    if (!data) return;
    document.title = data?.items[0]?.snippet?.title + " - YouTube-clone";
  }, [data]);

  useEffect(() => {
    dispatch(updateCurrentPage());
  }, []);

  return (
    <div className="w-full max-w-350 mx-auto flex gap-4 px-4">
      <main className="flex-4">
        <section className="aspect-video rounded-xl overflow-hidden bg-grey-a8 relative">
          <iframe
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${query}`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </section>
        <section>comments</section>
      </main>
      <PaginationContext.Provider value={{ pagination, fetchNext }}>
        <aside className="w-87.5">
          <VideoCardsList />
          {pagination.nextPage && <LoadingWheel />}
        </aside>
      </PaginationContext.Provider>
    </div>
  );
};

export default WatchPage;
