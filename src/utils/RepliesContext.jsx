import { createContext } from "react";

const RepliesContext = ({ children }) => {
  const Context = createContext();

  return <Context.Provider>{children}</Context.Provider>;
};

export default RepliesContext;
