import CategoryKeywords from "../components/CategoryKeywords";
import VideoCardsList from "../components/VideoCardsList";
import VideoCardsListPagination from "../components/VideoCardsListPagination";
import PaginationContext from "../utils/PaginationContext";
import { useState } from "react";

const HomePage = () => {
  const [paginatedCount, setPaginatedCount] = useState(0);
  const [paginationInProgress, setPaginationInProgress] = useState(false);

  return (
    <PaginationContext.Provider
      value={{
        paginatedCount,
        setPaginatedCount,
        paginationInProgress,
        setPaginationInProgress,
      }}
    >
      <main className="w-full min-w-0 max-w-350 mx-auto flex flex-col gap-4 mb-10">
        <CategoryKeywords />
        <VideoCardsList />
        {sessionStorage.getItem("nextPageToken") !== "done" && (
          <VideoCardsListPagination />
        )}
      </main>
    </PaginationContext.Provider>
  );
};
export default HomePage;
