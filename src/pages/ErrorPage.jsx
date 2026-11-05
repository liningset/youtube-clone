import Error from "../components/common/Error";
import { useRouteError } from "react-router";

const ErrorPage = () => {
  const error = useRouteError();

  return error?.status === 404 ? (
    <Error message="The page you're looking for does not exist on our site." />
  ) : (
    <h1>{error.message}</h1>
  );
};

export default ErrorPage;
