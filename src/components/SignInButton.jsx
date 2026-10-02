import YoutubeIcon from "./YoutubeIcon";
const SignInButton = () => {
  return (
    <button className="text-dark-blue border border-border-clr cursor-pointer flex items-center gap-1 font-bold py-2 px-4 rounded-full hover:bg-light-blue hover:border-light-blue">
      <YoutubeIcon icon="you" tailwindStyles="fill-dark-blue" />
      <span className="whitespace-nowrap">Sign in</span>
    </button>
  );
};

export default SignInButton;
