// NavigationBar.js
import React, { useContext, useEffect, useState } from "react";
import { getAuth, signOut } from "firebase/auth";
import { Link } from "react-router-dom";
import "../styles/NavigationBar.css";
import firebaseApp from "./Credenciales";
import { IoMdNotificationsOutline } from "react-icons/io";
import UserMenu from "./SideBarComponents/UserMenu";
import { UserContext } from "../context/UserContext";
import { FaUser } from "react-icons/fa";

const auth = getAuth(firebaseApp);

const NavigationBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      setUserProfile({
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        emailVerified: user.emailVerified,
        uid: user.uid,
      });
    }
  }, []);

  const handleProfileClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    const sideBar = document.querySelector(".sidebar");
    sideBar.classList.toggle("close");
  };

  const searchBar = (e) => {
    const searchForm = document.querySelector(".content nav form");
    if (window.innerWidth < 576) {
      e.preventDefault();
      searchForm.classList.toggle("show");
    }
  };

  const theme = () => {
    const toggler = document.getElementById("theme-toggle");
    if (toggler.checked) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  };


  return (
    <>
      <div className="sidebar close">
        <Link to="/" className="logo">
          <i className="bx bx-calendar-event"></i>
          <div className="logo-name">
            <span>Event</span>Hub
          </div>
        </Link>
        <ul className="side-menu">
          <li className="active">
            <Link to="/">
              <i className="bx bx-home"></i>Pagina principal
            </Link>
          </li>
          <li>
            <Link to="/eventos">
              <i className="bx bx-calendar-plus"></i>Eventos
            </Link>
          </li>
          <li>
            <Link to="/estadisticas">
              <i className="bx bx-analyse"></i>Estadisticas
            </Link>
          </li>
          <li>
            <Link to="/usuarios">
              <i className="bx bx-group"></i>Users
            </Link>
          </li>
          <li>
            <Link to="/configuracion">
              <i className="bx bx-cog"></i>Settings
            </Link>
          </li>
        </ul>
        <ul className="side-menu">
          <li>
            <Link to="/" className="logout" onClick={() => signOut(auth)}>
              <i className="bx bx-log-out-circle"></i>Cerrar sesion
            </Link>
          </li>
        </ul>
      </div>
      <div className="content">
        <nav>
          <i className="bx bx-menu" onClick={closeMenu}></i>
          <form action="#">
            <div className="form-input">
              <input type="search" placeholder="Search..." />
              <button className="search-btn" type="submit" onClick={searchBar}>
                <i className="bx bx-search"></i>
              </button>
            </div>
          </form>
          <input type="checkbox" id="theme-toggle" hidden onChange={theme} />
          <label htmlFor="theme-toggle" className="theme-toggle"></label>
          <Link to="#" className="notif">
            <IoMdNotificationsOutline size={32} />
          </Link>
          <Link to="/perfil" className="profile">
            {userProfile ? (
              <img
                src={userProfile.photoURL}
                alt="User's photo"
                style={{ width: "40px", height: "40px", borderRadius: "50%" }}
              />
            ) : (
              <FaUser />
            )}
          </Link>
        </nav>
        {isMenuOpen && <User />}
      </div>
    </>
  );
};

export default NavigationBar;
