import React, { useState } from "react";
import { useAuth } from "../../providers/Auth";
import "./Navbar.css";
import { handleLogoutUser } from "../../helpers/auth";

const Navbar = () => {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="logo-section">
        <img
          src="https://img.icons8.com/emoji/48/notebook-with-decorative-cover.png"
          alt="logo"
          className="logo"
        />
        <span className="title">IDFY TODO</span>
      </div>

      <div className="dropdown">
        <button className="dropdown-toggle" onClick={() => setOpen(!open)}>
          {user.username} <span className="arrow">▼</span>
        </button>
        {open && (
          <div className="dropdown-menu">
            <div className="dropdown-item">
              <span className="icon">👤</span> Profile
            </div>
            <div className="dropdown-item" onClick={handleLogoutUser}>
              <span className="icon">➡️</span> Logout
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
