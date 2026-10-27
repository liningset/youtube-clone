import CommentThread from "./CommentThread";
import usePaginatedComments from "../hooks/usePaginatedComments";

const RepliesList = ({ parentCommentId }) => {
  const { commentState } = usePaginatedComments({
    part: "snippet",
    parentId: parentCommentId,
    maxResults: 10,
  });

  return (
    <div
      className={`${commentState.comments.length > 0 && "mt-4"} flex flex-col gap-2`}
    >
      {commentState.comments.map((comment) => (
        <CommentThread key={comment.id} data={comment} />
      ))}
    </div>
  );
};

export default RepliesList;
