import CommentThreadsList from "./CommentThreadsList";
import ThreadsContextProvider from "../utils/ThreadsContextProvider";
import CommentInputField from "./CommentInputField";
import SortByButton from "./SortByButton";

const CommentsSection = ({ count }) => {
  return (
    <ThreadsContextProvider>
      <section className="px-4 lg:px-0 flex flex-col gap-6 [grid-area:comments]">
        <div className="flex gap-8">
          <h3 className="text-xl font-semibold">
            {Number(count)?.toLocaleString()} Comments
          </h3>
          <SortByButton />
        </div>
        <CommentInputField />

        <CommentThreadsList />
      </section>
    </ThreadsContextProvider>
  );
};

export default CommentsSection;
