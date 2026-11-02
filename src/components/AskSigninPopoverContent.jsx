import BlackSpecialButton from "./BlackSpecialButton";

const AskSigninPopoverContent = ({ heading, sub }) => {
  return (
    <div className="flex flex-col gap-4 p-4 w-80">
      <h3 className="text-xl text-center font-medium">{heading}</h3>
      <span className="text-center opacity-85">{sub}</span>
      <BlackSpecialButton text="Sign in" />
    </div>
  );
};

export default AskSigninPopoverContent;
