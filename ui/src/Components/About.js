import React, { useState, useEffect } from "react";
import employee from "../Images/employee.jpg";
import { useNavigate } from "react-router-dom";

const About = () => {
  const [userdata, setUserData] = useState({});
  // console.log(userdata.name);
  const navigate = useNavigate();
  const validateUser = async () => {
    try {
      const response = await fetch("http://localhost:8000/about", {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `${localStorage.getItem("token")}`, // notice the Bearer before your token
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setUserData(data.userdetails);
      if (response.status === 401) {
        navigate("/login");
        const error = new Error(response.error);
        throw error;
      }
    } catch (error) {
      console.log(error);
    }
  };
  console.log(userdata)
  useEffect(() => {
    validateUser();
  }, []);
  // console.log(userdata);
  return (
    <>
      {/* {} */}
      {/* {Object.values(userdata).map((user)=>(
      console.log(user)
    ))} */}

      <div className="AboutUser row">
        <div className="col d-flex info">
          <img src={employee} alt="employee" />
          <div className="col">
            <h6>{userdata.name}</h6>
            <h6>Ranking:1/10</h6>
            <h6>{userdata.work}</h6>
          </div>
          <div className="aboutUser-btn">
            <button>Edit user</button>
          </div>
        </div>
        <br />
      </div>
      <div className="p-5">
        <p>Work Link</p>
        <a href="https://lmvit.com/">LMV IT</a>
        <br />
        <a href="https://lmvinsurancebroking.com/">LMV Insurance Broking</a>
        <br />
        <a href="https://lmvfinancialservices.com/">Lmv Financial service</a>
        <br />
        <a href="https://www.lmvinvestmentservices.com/">
          Lmv Investment service
        </a>
        <br />
      </div>

      {/* togel profile */}
      <center className="p-5">
        <nav>
          <div className="nav nav-tabs" id="nav-tab" role="tablist">
            <button
              className="nav-link active"
              id="nav-home-tab"
              data-bs-toggle="tab"
              data-bs-target="#nav-profile"
              type="button"
              role="tab"
              aria-controls="nav-home"
              aria-selected="true"
            >
              About
            </button>
            <button
              className="nav-link"
              id="nav-profile-tab"
              data-bs-toggle="tab"
              data-bs-target="#nav-home"
              type="button"
              role="tab"
              aria-controls="nav-profile"
              aria-selected="false"
            >
              Timeline
            </button>
          </div>
        </nav>
      </center>

      {/*links  */}
      <div className="userDetails text-center">
        <div className="row">
          <div className="col"></div>
          <div className="tab-content" id="nav-tab Content"></div>
          <div className="col" id="AboutSection">
            <div
              id="nav-profile"
              role="tabpanel"
              aria-labelledby="nav-profile-tab"
              className="tab-pane fade show active"
              tabIndex="0"
            >
              <div className="userInfo">
                <div className="row">
                  <div className="col">
                    <p>user Id</p>
                  </div>
                  <div className="col">
                    <p>{userdata._id}</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <p>Name:</p>
                  </div>
                  <div className="col">
                    <p>{userdata.name}</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <p>Email:</p>
                  </div>
                  <div className="col">
                    <p>{userdata.email}</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <p>Phone:</p>
                  </div>
                  <div className="col">
                    <p>{userdata.phone}</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <p>Profession:</p>
                  </div>
                  <div className="col">
                    <p>{userdata.work}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* experience section */}

          <div className="col" id="ExperienceSection">
            <div
              id="nav-home"
              role="tabpanel"
              className="tab-pane fade"
              aria-labelledby="nav-home-tab"
              tabIndex="0"
            >
              <div className="userInfo">
                <div className="row">
                  <div className="col">
                    <p>Experience</p>
                  </div>
                  <div className="col">
                    <p>8 months</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <p>Hour rate</p>
                  </div>
                  <div className="col">
                    <p>12500</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <p>Total Projects</p>
                  </div>
                  <div className="col">
                    <p>50</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <p>English Level</p>
                  </div>
                  <div className="col">
                    <p>Expert</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <p>Availabilty</p>
                  </div>
                  <div className="col">
                    <p>5months</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* </div> */}
    </>
  );
};

export default About;
