import CommentThread from "./CommentThread";

const RepliesList = ({ replies }) => {
  return (
    <div className={`${replies.length > 0 && "mt-4"} flex flex-col gap-2`}>
      {replies.map((comment) => (
        <CommentThread key={comment.id} data={comment} />
      ))}
    </div>
  );
};

export default RepliesList;
