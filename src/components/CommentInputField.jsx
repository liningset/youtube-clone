const CommentInputField = () => {
  return (
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
  );
};

export default CommentInputField;
