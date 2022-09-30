import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import logo from "../Images/Navbarlogo.jpg";
import { UserContext } from "../App";

const Navbar = () => {
  const { state, dispatch } = useContext(UserContext );
  const RendereMenu=()=>{

  if(state){
    return(
      <ul className="navbar-nav  mb-2 mb-lg-0">
      <li className="nav-item">
        <NavLink className="nav-link" to="/">
          Home
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/About">
          About
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/Contact">
          Contact
        </NavLink>
      </li>
     
      <li className="nav-item">
        <NavLink className="nav-link" to="/Logout">
          Log-Out
        </NavLink>
      </li>
      
    </ul>
    )
  }else{
    return(
      <ul className="navbar-nav  mb-2 mb-lg-0">
      <li className="nav-item">
        <NavLink className="nav-link" to="/">
          Home
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/About">
          About
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/Contact">
          Contact
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/Login">
          Login
        </NavLink>
      </li>
        
      <li className="nav-item">
        <NavLink className="nav-link" to="/Register">
          Register
        </NavLink>
      </li>
    </ul>
    )
  }
}

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-light">
        <div className="container-fluid">
          <div className="logo">
            <img src={logo} alt="navbarlogo" />
          </div>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarSupportedContent"
          >
          <RendereMenu/>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
