import { useState } from "react";
import { authInstance } from "../utils/auth";
import { Link } from "react-router-dom";
import "./styles/navbar.css";

export const Navbar = () => {
  const [isDropdownActive, setIsDropdownActive] = useState(false);

  const handleDropdownButtonClick = () => {
    setIsDropdownActive(!isDropdownActive);
  };

  const handleLoginLogoutClick = () => {
    if (authInstance.loggedIn()) {
      logout();
      window.location.href = "/login";
    } else {
      window.location.href = "/login";
    }
  };

  const logout = () => {
    authInstance.logout();
    window.location.reload();
  };

  return (
    <nav>
      <ul className="navbar">
        <li>
          <a href="/Home">My Profile</a>
        </li>
        {authInstance.loggedIn() && (
          <li>
            <button onClick={handleLoginLogoutClick}>Logout</button>
          </li>
        )}
        {authInstance.loggedIn() || (
          <li>
            <Link to="/signup">Signup</Link>
          </li>
        )}
        {authInstance.loggedIn() ? null : (
          <li>
            <Link to="/login">Login</Link>
          </li>
        )}
        <li>
          <button
            className="dropdown-button"
            onClick={handleDropdownButtonClick}
          >
            +
          </button>
          <div className={`dropdown ${isDropdownActive ? "active" : ""}`}>
            <a href="/PhotoAdd">Add a new photo</a>
          </div>
        </li>
      </ul>
    </nav>
  );
};
