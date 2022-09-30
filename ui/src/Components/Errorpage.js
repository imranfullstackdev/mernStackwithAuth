import React from "react";
import { useNavigate } from "react-router-dom";

const Errorpage = () => {
  const navigate = useNavigate();
  const navigateHome = () => {
    navigate("/");
  };
  return (
    <>
      <center>
        <div className="errorui">
          <div className="errornum">
            <h1>404</h1>
          </div>
          <h3>ERROR PAGE</h3>
          <h5>THE PAGE YOU ARE LOOKING FOR IS NOT AVAILABLE</h5>
          <button onClick={navigateHome}>HOME PAGE</button>
        </div>
      </center>
    </>
  );
};

export default Errorpage;
