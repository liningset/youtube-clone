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
  if (errorString.includes("quotaExceeded")) {
    return (
      <Error
        message="Sorry, Youtube API daily quota limit exceeded, come back tomorrow"
        retry={false}
      />
    );
  }

  console.error(errorString);
  return (
    // <Error
    //   message="There was a problem with fetching this resource."
    //   retry={true}
    // />
    <span>There was a problem with fetching this part of the app</span>
  );
};

export default renderErrors;
