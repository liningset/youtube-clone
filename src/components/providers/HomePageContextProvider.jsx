import { useMemo } from "react";
import HomePageContext from "../../data/HomePageContext";
import usePaginatedVideos from "../../hooks/usePaginatedVideos";
import { useSelector } from "react-redux";

const HomePageContextProvider = ({ children }) => {
  const countryCode = useSelector((store) => store.app.countryCode);
  const params = useMemo(() => {
    return {
      regionCode: countryCode,
      chart: "mostPopular",
      part: "snippet,statistics,contentDetails,liveStreamingDetails",
      maxResults: 15,
    };
  }, [countryCode]);

  const { pagination, fetchNext, changeCategory } = usePaginatedVideos(params);

  const values = useMemo(
    () => ({
      pagination,
      fetchNext,
      changeCategory,
    }),
    [pagination, fetchNext, changeCategory],
  );

  return (
    <HomePageContext.Provider value={values}>
      {children}
    </HomePageContext.Provider>
  );
};

export default HomePageContextProvider;
