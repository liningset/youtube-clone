import { useState } from "react";
import Popover from "../common/Popover";
import AskSigninPopoverContent from "../common/AskSigninPopoverContent";

const IncludePopover = ({ children, id, heading, sub }) => {
  const [showPopover, setShowPopover] = useState(false);

  return (
    <div
      onClick={() => setShowPopover(true)}
      className="popover-container relative"
      data-container-id={id}
    >
      {children}

      {showPopover && (
        <Popover closePopover={() => setShowPopover(false)} parentId={id}>
          <AskSigninPopoverContent heading={heading} sub={sub} />
        </Popover>
      )}
    </div>
  );
};

export default IncludePopover;
