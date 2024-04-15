import { useEffect } from "react";
import UserProfile from "./UserProfile";
import { getAuth, signOut } from "firebase/auth";
import { Link } from "react-router-dom";
import "../styles/NavigationBar.css";
import firebaseApp from "./Credenciales";
import { IoMdNotificationsOutline } from "react-icons/io";

const auth = getAuth(firebaseApp);

const NavigationBar = () => {
  // Selector de secciones en el menu lateral
  useEffect(() => {
    const sideLinks = document.querySelectorAll(
      ".sidebar .side-menu li a:not(.logout)"
    );

    sideLinks.forEach((item) => {
      const li = item.parentElement;
      item.addEventListener("click", () => {
        sideLinks.forEach((i) => {
          i.parentElement.classList.remove("active");
        });
        li.classList.add("active");
      });
    });
  }, []);

  const focus = () => {
    const li = document.querySelector("li");
    console.log(li);
  };

  // funcion para despliegue del menu lateral
  const closeMenu = () => {
    const sideBar = document.querySelector(".sidebar");
    sideBar.classList.toggle("close");
  };

  // Funcion para la barra de busqueda responsive
  const searchBar = (e) => {
    const searchBtn = document.querySelector(
      ".content nav form .form-input button"
    );
    const searchBtnIcon = document.querySelector(
      ".content nav form .form-input button .bx"
    );
    const searchForm = document.querySelector(".content nav form");

    if (window.innerWidth < 576) {
      e.preventDefault();
      searchForm.classList.toggle("show");
      if (searchForm.classList.contains("show")) {
        searchBtnIcon.classList.replace("bx-search", "bx-x");
      } else {
        searchBtnIcon.classList.replace("bx-x", "bx-search");
      }
    }
  };

  // funcion para el cambio de tema entre claro y oscuro
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
      {/* Sidebar */}
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
          <li onClick={focus}>
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
              <i className="bx bx-log-out-circle"></i>
              Cerrar sesion
            </Link>
          </li>
        </ul>
      </div>
      {/* End of Sidebar */}

      <div className="content">
        {/* Navbar */}
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
            <UserProfile />
          </Link>
        </nav>
        {/* End of navbar */}
      </div>
    </>
  );
};

export default NavigationBar;
