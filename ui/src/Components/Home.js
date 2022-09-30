import React, { useState, useEffect } from "react";
import {Navigate, useNavigate} from 'react-router-dom'

const Home = () => {
  const [data, setData] = useState("");
  const [show, setShow] = useState(false);
const Navigate=useNavigate()

  const ContactDetails = async () => {
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
      setData(data.userdetails);
      if (response.status === 401) {
        Navigate('/Login')

        const error = new Error(response.error);
        throw error;
      }
    } catch (error) {
      console.log(error);
    }
  };
  console.log(data);
  useEffect(() => {
    ContactDetails();
  }, []);
  return (
    <>
      <div className="main">
        <center className="midcontent">
          <h2 className="welcomecontent">
            <b>{show ?"happy to see you back":'we welcome You  '}<br/><span>{data.name}</span></b>
          </h2><br/>
         
          <h4 className="projectcontent">
            <b>Full stack project</b>
          </h4>
        </center>
        <div className="row main">
          <div className="col" id="main-cont-left"></div>
          <div className="col" id="main-cont-right"></div>
        </div>
      </div>
    </>
  );
};

export default Home;
