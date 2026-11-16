import { useContext, useEffect } from "react";
import CategoryKeywords from "../components/home-feed/CategoryKeywords";
import VideoCardsList, {
  VideoCardsListShimmer,
} from "../components/home-feed/VideoCardsList";
import { useDispatch, useSelector } from "react-redux";
import { updateCurrentPage } from "../data/appSlice";
import HomePageContextProvider from "../components/providers/HomePageContextProvider";
import LoadingMoreVideos from "../components/home-feed/LoadingMoreVideos";
import HomePageContext from "../data/HomePageContext";
import renderErrors from "../utils/renderErrors";

const HomePage = () => {
  const dispatch = useDispatch();
  const { pagination } = useContext(HomePageContext);
  const hasNextPage = Boolean(pagination.nextPage);

  useEffect(() => {
    document.title = "YouTube-clone";
    dispatch(updateCurrentPage());
  }, []);

  return (
    <main className="w-full min-w-0 max-w-350 mx-auto flex flex-col gap-4 mb-10">
      <CategoryKeywords />
      {pagination.status.videos.includes("error") ? (
        renderErrors(pagination.status.videos)
      ) : (
        <>
          <VideoCardsList />
          {hasNextPage && <LoadingMoreVideos />}
        </>
      )}
    </main>
  );
};

const HomeRoute = () => {
  const countryCode = useSelector((store) => store.app.countryCode);
  return countryCode ? (
    <HomePageContextProvider>
      <HomePage />
    </HomePageContextProvider>
  ) : (
    <div className="w-full">
      <VideoCardsListShimmer count={9} />
    </div>
  );
};
export default HomeRoute;
