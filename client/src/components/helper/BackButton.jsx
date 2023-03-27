import React from "react";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import "../.././index.scss";

const BackButton = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div>
      {location.pathname !== "/" && (
        <div className="goBack">
          <button onClick={() => navigate(-1)}>
            <MdOutlineArrowBackIosNew />
          </button>
        </div>
      )}
    </div>
  );
};

export default BackButton;
