import Error from "../components/common/Error";

const renderErrors = (errorString) => {
  if (errorString.includes("timeout"))
    return <Error message="Connection timed out." retry={true} />;

  if (errorString.includes("NetworkError")) {
    return (
      <Error
        message="Check your internet connection and try again."
        retry={true}
      />
    );
  }

  console.error(errorString);
  return (
    <Error
      message="There was a problem with fetching this resource."
      retry={true}
    />
  );
};

export default renderErrors;
