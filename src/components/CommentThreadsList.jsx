import CommentThread from "./CommentThread";

const CommentThreadsList = () => {
  return (
    <div className="flex flex-col gap-4">
      <CommentThread />
      <CommentThread />
    </div>
  );
};

export default CommentThreadsList;
