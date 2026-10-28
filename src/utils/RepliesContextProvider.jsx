import { createContext } from "react";

const RepliesContextProvider = ({ children }) => {
  const Context = createContext(null);

  // const { RepliesState } = usePaginatedReplies({
  //   part: "snippet",
  //   parentId: parentCommentId,
  //   maxResults: 10,
  // });

  return <Context.Provider>{children}</Context.Provider>;
};

export default RepliesContextProvider;
