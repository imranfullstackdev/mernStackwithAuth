import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";

const Logout = () => {
  const { state, dispatch } = useContext(UserContext );
  const navigate = useNavigate();
  useEffect(() => {
    fetch("http://localhost:8000/Logout", {
      method: "GET",
      headers: { "Content-type": "application/json" },
    }).then((res) => {
      dispatch({ type: "USER", payload: false });
      window.localStorage.removeItem("token");
      navigate("/Login");
    });
  });
  return <> </>;
};

export default Logout;
