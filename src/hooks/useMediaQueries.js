import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateMatchingMedia } from "../data/appSlice";
import { changeType, closeSideBar, openSideBar } from "../data/sideBarSlice";

const useMediaQueries = () => {
  const dispatch = useDispatch();
  const page = useSelector((store) => store.app.currentPage);
  const updateMedia = (size, boolean) => {
    dispatch(updateMatchingMedia({ size, matches: boolean }));
  };

  useEffect(() => {
    const sm = matchMedia(`(min-width:640px)`);

    updateMedia("sm", sm.matches);
    sm.onchange = (e) => updateMedia("sm", e.matches);

    return () => (sm.onchange = null);
  }, []);

  useEffect(() => {
    const md = matchMedia(`(min-width:760px)`);

    updateMedia("md", md.matches);
    dispatch(
      changeType(md.matches && page !== "watchpage" ? "regular" : "modal"),
    );

    md.onchange = (e) => {
      updateMedia("md", e.matches);
      dispatch(
        changeType(e.matches && page !== "watchpage" ? "regular" : "modal"),
      );
    };

    return () => (md.onchange = null);
  }, [page]);

  useEffect(() => {
    const lg = matchMedia(`(min-width:1100px)`);

    updateMedia("lg", lg.matches);
    dispatch(
      lg.matches && page === "homepage" ? openSideBar() : closeSideBar(),
    );

    lg.onchange = (e) => {
      updateMedia("lg", e.matches);
      dispatch(
        lg.matches && page === "homepage" ? openSideBar() : closeSideBar(),
      );
    };

    return () => (lg.onchange = null);
  }, [page]);
};
export default useMediaQueries;
