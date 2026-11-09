import BlueSpecialButton from "./BlueSpecialButton";

const Error = ({ message, retry = true }) => {
  return (
    <div
      role="alert"
      className="h-[90vh] w-[90%] max-w-100 flex flex-col justify-center mx-auto"
    >
      <h1 className="text-3xl text-center font-semibold">{message}</h1>
      <img className="w-full pointer-events-none" src="/src/assets/error.svg" />
      {retry && (
        <BlueSpecialButton onClick={() => location.reload()} text="Try again" />
      )}
    </div>
  );
};

export default Error;
