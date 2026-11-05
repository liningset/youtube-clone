const Error = ({ message }) => {
  return (
    <div className="h-[90vh] w-[90vw] max-w-100 flex flex-col justify-center mx-auto">
      <h1 className="text-3xl text-center font-semibold">{message}</h1>
      <img className="w-full pointer-events-none" src="/src/assets/error.svg" />
    </div>
  );
};

export default Error;
