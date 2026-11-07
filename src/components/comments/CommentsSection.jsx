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
      <section className="flex flex-col gap-6 px-4 [grid-area:comments] lg:px-0">
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
