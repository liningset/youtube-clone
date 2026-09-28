import YoutubeIcon from "./YoutubeIcon";
import { Link } from "react-router";

const LogoAndBurgerButton = () => {
  return (
    <div className="flex gap-2 md:gap-4 items-center">
      <button className="p-2 rounded-full border-bg-primary hover:bg-grey-d8 hover:border-grey-d8 active:bg-grey-a8 active:border-grey-a8 transition-button cursor-pointer">
        <YoutubeIcon icon="hamburger" />
      </button>
      <Link to="/" title="YouTube Home" className="p-2">
        <YoutubeIcon icon="logo" />
      </Link>
    </div>
  );
};
export default LogoAndBurgerButton;
