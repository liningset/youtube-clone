import CommentThreadsList from "./CommentThreadsList";
import ThreadsContextProvider from "../providers/ThreadsContextProvider";
import WriteCommentField from "./WriteCommentField";
import SortByButton from "./SortByButton";
import WatchPageContext from "../../data/WatchPageContext";
import { useContext } from "react";

const CommentsSection = () => {
  const { watchVideo } = useContext(WatchPageContext);
  const commentCount = watchVideo?.statistics?.commentCount;

  return (
    <ThreadsContextProvider>
      <section className="px-4 lg:px-0 flex flex-col gap-6 [grid-area:comments]">
        <div className="flex gap-8">
          <h3 className="text-xl font-semibold">
            {Number(commentCount)?.toLocaleString()} Comments
          </h3>
          <SortByButton />
        </div>
        <WriteCommentField />

        <CommentThreadsList />
      </section>
    </ThreadsContextProvider>
  );
};

export default CommentsSection;
