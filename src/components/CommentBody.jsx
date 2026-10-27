// import { useState } from "react";

const CommentBody = ({ text }) => {
  // const [collapsed, setCollapsed] = useState(true);
  return (
    <div>
      <pre className="whitespace-pre-wrap font-roboto line-clamp-4 text-sm">
        {text}
      </pre>
      {/* <button className="font-semibold opacity-50 hover:underline cursor-pointer">
            read more
          </button> */}
    </div>
  );
};

export default CommentBody;
