import YoutubeIcon from "./YoutubeIcon";
import CommentThreadsList from "./CommentThreadsList";

const CommentsSection = ({ count }) => {
  return (
    <section className="flex flex-col gap-6">
      <div className="flex gap-8">
        <h3 className="text-xl font-semibold">
          {Number(count)?.toLocaleString()} Comments
        </h3>
        <button
          title="Sort comments"
          className="flex items-center gap-2 cursor-pointer font-medium"
        >
          <YoutubeIcon icon="sortBy" /> Sort by
        </button>
      </div>
      <form className="flex gap-4 text-sm">
        <div className="w-8 aspect-square overflow-hidden rounded-full">
          <img
            src="https://yt3.ggpht.com/a/default-user=s48-c-k-c0x00ffffff-no-rj"
            alt="default user profile"
          />
        </div>
        <input
          type="text"
          placeholder="Add a comment..."
          className="border-b border-grey-a8 focus:border-fg-primary outline-0 flex-1"
        />
      </form>
      <CommentThreadsList />
    </section>
  );
};

export default CommentsSection;
