import Error from "../components/common/Error";
import { useRouteError } from "react-router";

const ErrorPage = () => {
  const error = useRouteError();

  return error?.status === 404 ? (
    <Error message="404: Page not found." retry={false} />
  ) : (
    <h1>{error.message}</h1>
  );
};

export default ErrorPage;
