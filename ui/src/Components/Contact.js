import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Contact = () => {
  const navigate = useNavigate();

  const [userContact, setUserContact] = useState({});

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
      setUserContact(data.userdetails);
      if (response.status === 401) {
        navigate("/login");
        const error = new Error(response.error);
        throw error;
      }
    } catch (error) {
      console.log(error);
    }
  };
  const [ContactData, setContactData] = useState({
    ...userContact,
    message: "",
  });
  const { message } = ContactData;
  const ChangeHandler = (e) => {
    setContactData({
      ...ContactData,
      [e.target.name]: e.target.value,
      ...userContact,
    });
  };
  useEffect(() => {
    ContactDetails();
  }, []);
  const ContactSubmit = async(e) => {
    e.preventDefault();
    try {
      const body = { ContactData };
      const contactmessage=await fetch('http://localhost:8000/contact',{
        method:'POST',
        headers: {
          Accept: "application/json",
          Authorization: `${localStorage.getItem("token")}`, // notice the Bearer before your token
          "Content-Type": "application/json",
        },
        body:JSON.stringify(body.ContactData)
      })
      const res=await  contactmessage.json()
      console.log(res)
    } catch (error) {
      console.log(error);
    }
    console.log(ContactData);
    setContactData({ ...ContactData, message: "" });
  };
  return (
    <>
      <div className="container text-center">
        <div className="row mt-3">
          <div className="col" id="contactDiv">
            <div>
              <h5>Phone</h5>
            </div>
            <div>
              <h6>{userContact.phone}</h6>
            </div>
          </div>
          <div className="col" id="contactDiv">
            <div>
              <h5>Email</h5>
            </div>
            <div>
              <h6>{userContact.email}</h6>
            </div>
          </div>
          <div className="col" id="contactDiv">
            <div></div>
            <div>
              <h5>Work</h5>
            </div>
            <div>
              <h6>{userContact.work}</h6>
            </div>
          </div>
        </div>
      </div>
      {/* get in Touch page */}
      <div className=" maincointainer">
        <h2>
          <u>
            <b>Get In Touch</b>
          </u>
        </h2>
        <form onSubmit={ContactSubmit}>
          <div className="row ">
            <div className="col">
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  onChange={ChangeHandler}
                  value={userContact.name}
                />
              </div>
            </div>
            <div className="col">
              <div>
                <input
                  type="text"
                  name="email"
                  placeholder="Your Email"
                  onChange={ChangeHandler}
                  value={userContact.email}
                />
              </div>
            </div>
            <div className="col">
              <div>
                <input
                  type="number"
                  name="Number"
                  placeholder="Your Number"
                  onChange={ChangeHandler}
                  value={userContact.phone}
                />
              </div>
            </div>
          </div>
          <div id="textarea">
            <textarea
              type="textarea"
              name="message"
              value={message}
              placeholder="message"
              onChange={ChangeHandler}
            ></textarea>
          </div>
          <button className="btn btn-primary">Send Message</button>
        </form>
      </div>
    </>
  );
};

export default Contact;
