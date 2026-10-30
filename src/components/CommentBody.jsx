// import { useState } from "react";

import { useEffect, useRef } from "react";

const CommentBody = ({ text }) => {
  // const [collapsed, setCollapsed] = useState(true);

  const preRef = useRef(null);

  useEffect(() => {
    preRef.current.innerHTML = text;
    preRef.current
      .querySelectorAll("a")
      .forEach((tag) => tag.classList.add("text-blue-500", "hover:underline"));
  }, [text]);
  return (
    <div>
      <pre
        className="whitespace-pre-wrap font-roboto line-clamp-4 text-sm"
        ref={preRef}
      ></pre>
      {/* <button className="font-semibold opacity-50 hover:underline cursor-pointer">
            read more
          </button> */}
    </div>
  );
};

export default CommentBody;
