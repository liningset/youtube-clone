import CategoryKeywords from "../components/CategoryKeywords";
import VideoCardsList from "../components/VideoCardsList";

const HomePage = () => {
  return (
    <>
      <main className="w-full min-w-0 max-w-350 mx-auto flex flex-col gap-4">
        <CategoryKeywords />
        <VideoCardsList />
      </main>
    </>
  );
};
export default HomePage;
