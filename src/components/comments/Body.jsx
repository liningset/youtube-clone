// import { useState } from "react";

import { formatToDescription } from "../../utils/formatting";

const Body = ({ text }) => {
  // const [collapsed, setCollapsed] = useState(true);

  return (
    <div>
      <pre className="whitespace-pre-wrap font-roboto line-clamp-4 text-sm">
        {formatToDescription(text)}
      </pre>
      {/* <button className="font-semibold opacity-50 hover:underline cursor-pointer">
            read more
          </button> */}
    </div>
  );
};

export default Body;
