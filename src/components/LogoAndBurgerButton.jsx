import YoutubeIcon from "./YoutubeIcon";
import { Link } from "react-router";

const LogoAndBurgerButton = () => {
  return (
    <div className="flex gap-6 items-center">
      <button className="p-2 rounded-full hover:bg-grey-d8 cursor-pointer">
        <YoutubeIcon icon="hamburger" />
      </button>
      <Link to="/" title="YouTube Home" className="p-2">
        <YoutubeIcon icon="logo" />
      </Link>
    </div>
  );
};
export default LogoAndBurgerButton;
