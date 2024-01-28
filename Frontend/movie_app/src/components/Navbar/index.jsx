import "../../styles.css";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import userProfileIcon from "../../userprofileicon.svg";

<FontAwesomeIcon icon={faUser} className="user-profile-icon" />;

const Navbar = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    let token = localStorage.getItem("access_token");
    if (!token) {
      setLoggedIn(false);
    } else {
      setLoggedIn(true);
    }
  }, [loggedIn]);

  const logoutHandler = () => {
    localStorage.clear();
    setLoggedIn(false);
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark background-image">
      <Link className="navbar-brand" to="/">
        MovieApp
      </Link>
      <div className="navbar-collapse justify-content-end">
        <ul className="navbar-nav">
          {loggedIn && (
            <li className="nav-item">
              <Link to="/profile" className="btn btn-primary mr-2">
                <img
                  src={userProfileIcon}
                  alt="User Profile"
                  className="user-profile-icon"
                />
              </Link>
            </li>
          )}
          <li className="nav-item">
            {loggedIn ? (
              <Link to="/" className="btn btn-danger" onClick={logoutHandler}>
                Signout
              </Link>
            ) : (
              <Link to="/signin" className="btn btn-primary">
                Join Us
              </Link>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};
export default Navbar;
