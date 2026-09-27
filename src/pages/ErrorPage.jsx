import { useRouteError } from "react-router";

const ErrorPage = () => {
  const error = useRouteError();
  return <h1>Error {error.message}</h1>;
};

export default ErrorPage;
