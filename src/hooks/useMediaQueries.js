import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateMatchingMedia } from "../utils/appSlice";
import { changeType, closeSideBar, openSideBar } from "../utils/sideBarSlice";

const useMediaQueries = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const sm = matchMedia(`(min-width:640px)`);
    const md = matchMedia(`(min-width:760px)`);
    const lg = matchMedia(`(min-width:1100px)`);

    if (lg.matches) {
      dispatch(changeType("regular"));
      dispatch(openSideBar());
    }

    dispatch(updateMatchingMedia({ size: "sm", matches: sm.matches }));
    dispatch(updateMatchingMedia({ size: "md", matches: md.matches }));
    dispatch(updateMatchingMedia({ size: "lg", matches: lg.matches }));

    sm.onchange = (e) => {
      dispatch(updateMatchingMedia({ size: "sm", matches: e.matches }));
    };

    md.onchange = (e) => {
      dispatch(updateMatchingMedia({ size: "md", matches: e.matches }));

      if (e.matches) {
        dispatch(changeType("regular"));
      } else {
        dispatch(changeType("modal"));
      }
    };

    lg.onchange = (e) => {
      dispatch(updateMatchingMedia({ size: "lg", matches: e.matches }));

      if (e.matches) {
        dispatch(changeType("regular"));
        dispatch(openSideBar());
      } else {
        dispatch(closeSideBar());
      }
    };

    return () => {
      sm.onchange = null;
      md.onchange = null;
      lg.onchange = null;
    };
  }, []);
};
export default useMediaQueries;
