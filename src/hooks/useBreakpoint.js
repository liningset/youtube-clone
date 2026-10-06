import { useEffect, useState } from "react";

const useBreakpoint = (value, attachOnChange = true) => {
  const [state, dispatch] = useState(
    matchMedia(`(min-width:${value})`).matches,
  );

  useEffect(() => {
    if (attachOnChange) {
      const breakpoint = matchMedia(`(min-width:${value})`);
      const onChange = (e) => dispatch(e.matches);
      breakpoint.onchange = onChange;

      return () => (breakpoint.onchange = null);
    }
  });

  return { state, dispatch };
};
export default useBreakpoint;
