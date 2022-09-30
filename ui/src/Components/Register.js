import React, { useState } from "react";
import regImages from "../Images/loginForm.jpg";
import {useNavigate} from 'react-router-dom'

const Register = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
    work: "",
    password: "",
    Cpassword: "",
  });
  const navigate=useNavigate()
  const changeHandler = (e) => [
    setData({ ...data, [e.target.name]: e.target.value }),
  ];
  // destrusturing
  // name, email, phone, work, password, Cpassword
  const { name, email, phone, work, password, Cpassword } = data;
  const submitHandler = async (e) => {
    e.preventDefault();
    // console.log(data)
    try {
      const body = { data };
      const registerUser = await fetch("http://localhost:8000/register", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body.data),
      });
      const res = await registerUser.json();
      console.log(res)
      if (registerUser.status === 401  || !res) {

        window.alert(res.error);
      } else {
        window.alert(`register sucessfully`);
        navigate('/login')
      }
      console.log(registerUser);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="mainContainer">
        <div className="containerdiv">
          <form className="formdiv" onSubmit={submitHandler}>
            <h2>
              <b>
                <u>Sign Up</u>
              </b>
            </h2>
            <div className="mb-3">
              <input
                type="Name"
                name="name"
                value={name}
                onChange={changeHandler}
                placeholder="Enter Your Name"
              />
            </div>
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
                type="phone"
                name="phone"
                value={phone}
                onChange={changeHandler}
                placeholder="Enter Your Phone Number"
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                name="work"
                value={work}
                onChange={changeHandler}
                placeholder="Enter Your Profession"
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
            <div className="mb-3">
              <input
                type="password"
                name="Cpassword"
                value={Cpassword}
                onChange={changeHandler}
                placeholder="Re Enter The password"
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
    </>
  );
};

export default Register;
