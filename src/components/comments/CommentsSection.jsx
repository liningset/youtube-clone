import CommentThreadsList from "./CommentThreadsList";
import ThreadsContextProvider from "../providers/ThreadsContextProvider";
import WriteCommentField from "./WriteCommentField";
import SortByButton from "./SortByButton";
import WatchPageContext from "../../data/WatchPageContext";
import { useContext } from "react";
import renderErrors from "../../utils/renderErrors";

const CommentsSection = () => {
  const { watchVideo, watchVideoStatus } = useContext(WatchPageContext);
  const commentCount = watchVideo?.statistics?.commentCount;

  if (watchVideoStatus.includes("error")) return renderErrors(watchVideoStatus);

  return (
    <ThreadsContextProvider>
      <section className="flex flex-col gap-6 px-4 [grid-area:comments] lg:px-0">
        {commentCount != null && (
          <div className="flex gap-8">
            <h3 className="text-xl font-semibold">
              {Number(commentCount)?.toLocaleString()} Comments
            </h3>
            <SortByButton />
          </div>
        )}
        <WriteCommentField />

        <CommentThreadsList />
      </section>
    </ThreadsContextProvider>
  );
};

export default CommentsSection;
