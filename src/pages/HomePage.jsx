import CategoryKeywords from "../components/CategoryKeywords";
import VideoCardsList from "../components/VideoCardsList";

const HomePage = () => {
  return (
    <>
      <main className="w-full max-w-350 mx-auto px-5 flex flex-col gap-4">
        <CategoryKeywords />
        <VideoCardsList />
      </main>
    </>
  );
};
export default HomePage;
