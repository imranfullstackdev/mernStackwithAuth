import React, { useContext, useState } from "react";
import regImages from "../Images/user.jpg";
import { json, useNavigate } from "react-router-dom";
import { UserContext } from "../App";
const Login = () => {
  const { state, dispatch } = useContext(UserContext);
  const [loginuser, setLoginuser] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const { email, password } = loginuser;
  const changeHandler = (e) => {
    setLoginuser({ ...loginuser, [e.target.name]: e.target.value });
  };
  // verifying user
  const submithandler = async (e) => {
    e.preventDefault();
    try {
      const loginUser = await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginuser),
      });
      const res = await loginUser.json();
      console.log(res);
      // console.log(loginUser);
      // console.log(btoken);
      localStorage.setItem("token", res.tokenset);
      console.log(localStorage.getItem("token"));
      // console.log(loginUser.status)
      if (loginUser.status === 200) {
        alert(res.mess);
        navigate("/");
        dispatch({ type: "USER", payload: true });
        console.log(state)
      } else {
        alert(res.error);
      }

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <center>
      <div className="mainContainer1">
        <div className="containerdiv">
          <form className="formdiv1" onSubmit={submithandler}>
            <h2>
              <b>
                <u>Login</u>
              </b>
            </h2>
            <div className="mb-3">
              <input
                type="text"
                name="email"
                value={email}
                onChange={changeHandler}
                placeholder="Enter Your Email"
              />
            </div>

            <div className="mb-3">
              <input
                type="password"
                name="password"
                value={password}
                onChange={changeHandler}
                placeholder="Enter Your password"
              />
            </div>

            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
        <div>
          <figure className="regimage">
            <img src={regImages} alt="registration images" />
          </figure>
        </div>
        <div></div>
      </div>
    </center>
  );
};

export default Login;
