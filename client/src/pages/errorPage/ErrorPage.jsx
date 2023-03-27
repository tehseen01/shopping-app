import { useRouteError, useLocation, useNavigate } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";
import "./index.scss";

const ErrorPage = () => {
  const error = useRouteError();
  const location = useLocation();
  const navigate = useNavigate();

  console.error(error);
  return (
    <div className="errorPage">
      <h1>Ops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p className="errorMessage">
        <i>{error.statusText || error.message}</i>
      </p>

      {location.pathname !== "/" && (
        <div onClick={() => navigate(-1)} className="erroeBack">
          <AiOutlineArrowLeft />
          go back
        </div>
      )}
    </div>
  );
};

export default ErrorPage;
