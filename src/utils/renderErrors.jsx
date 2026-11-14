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
  if (errorString.includes("notFound")) {
    return <Error message="404. resource was not found" retry={false} />;
  }

  if (errorString.includes("videoChartNotFound")) {
    return (
      <Error
        message="This category does not contain a chart of popular videos at the moment"
        retry={true}
      />
    );
  }
  console.error(errorString);
  return <span>There was a problem with fetching this part of the app</span>;
};

export default renderErrors;
