import YoutubeIcon from "../common/YoutubeIcon";
const BlueSpecialButton = ({ text, onClick = null }) => {
  return (
    <button
      onClick={onClick}
      className="text-dark-blue border border-border-clr cursor-pointer flex items-center gap-1 font-bold py-2 px-4 rounded-full hover:bg-light-blue hover:border-light-blue"
    >
      {text === "Sign in" && (
        <YoutubeIcon icon="you" tailwindStyles="fill-dark-blue" />
      )}
      <span className={`whitespace-nowrap ${text !== "Sign in" && "w-full"}`}>
        {text}
      </span>
    </button>
  );
};

export default BlueSpecialButton;
