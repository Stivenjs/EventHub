import firebaseApp from "../components/Credenciales";
import { useEffect } from "react";
import { getAuth, signOut } from "firebase/auth";
import  NavigationBar  from "./NavigationBar";
import "../styles/Home.css";

const auth = getAuth(firebaseApp);

function Home() {
  // Selector de secciones en el menu lateral
  // useEffect(() => {
  //   const sideLinks = document.querySelectorAll(
  //     ".sidebar .side-menu li a:not(.logout)"
  //   );

  //   sideLinks.forEach((item) => {
  //     const li = item.parentElement;
  //     item.addEventListener("click", () => {
  //       sideLinks.forEach((i) => {
  //         i.parentElement.classList.remove("active");
  //       });
  //       li.classList.add("active");
  //     });
  //   });
  // }, []);

  // funcion para despliegue del menu lateral
  // const closeMenu = () => {
  //   const sideBar = document.querySelector(".sidebar");
  //   sideBar.classList.toggle("close");
  // };

  // Funcion para la barra de busqueda responsive
  // const searchBar = (e) => {
  //   const searchBtn = document.querySelector(
  //     ".content nav form .form-input button"
  //   );
  //   const searchBtnIcon = document.querySelector(
  //     ".content nav form .form-input button .bx"
  //   );
  //   const searchForm = document.querySelector(".content nav form");

  //   if (window.innerWidth < 576) {
  //     e.preventDefault();
  //     searchForm.classList.toggle("show");
  //     if (searchForm.classList.contains("show")) {
  //       searchBtnIcon.classList.replace("bx-search", "bx-x");
  //     } else {
  //       searchBtnIcon.classList.replace("bx-x", "bx-search");
  //     }
  //   }
  // };

  // funcion para el cambio de tema entre claro y oscuro
  // const theme = () => {
  //   const toggler = document.getElementById("theme-toggle");
  //   const changeToggler = toggler;

  //   if (toggler.checked) {
  //     document.body.classList.add("dark");
  //   } else {
  //     document.body.classList.remove("dark");
  //   }
  // };

  return (
    <>
      <NavigationBar />
      {/* Sidebar */}
      {/* <div className="sidebar close">
        <a href="#" className="logo">
          <i className="bx bx-calendar-event"></i>
          <div className="logo-name">
            <span>Event</span>Hub
          </div>
        </a>
        <ul className="side-menu">
          <li className="active">
            <Link to="/home">
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
            <Link to="usuarios">
              <i className="bx bx-group"></i>Users
            </Link>
          </li>
          <li>
            <Link to="configuracion">
              <i className="bx bx-cog"></i>Settings
            </Link>
          </li>
        </ul>
        <ul className="side-menu">
          <li>
            <Link to="#" className="logout" onClick={() => signOut(auth)}>
              <i className="bx bx-log-out-circle"></i>
              Cerrar sesion
            </Link>
          </li>
        </ul>
      </div> */}
      {/* End of Sidebar */}

      {/* Main Content */}
      <div className="content">
        {/* Navbar */}
        {/* <nav>
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
          <a href="#" className="notif">
            <i className="bx bx-bell"></i>
            <span className="count">12</span>
          </a>
          <a href="#" className="profile">
            <img src="images/logo.png" />
          </a>
        </nav> */}

        {/* End of Navbar */}

        <main>
          <div className="header">
            <div className="left">
              <h1>Bienvenido "Usuario de EventHub"</h1>
            </div>
          </div>

          {/* Insights */}
          <ul className="insights">
            <li>
              <i className="bx bx-calendar-check"></i>
              <span className="info">
                <h3>20</h3>
                <p>Eventos</p>
              </span>
            </li>
            <li>
              <i className="bx bx-show-alt"></i>
              <span className="info">
                <h3>3,944</h3>
                <p>Visitas</p>
              </span>
            </li>
            <li>
              <i className="bx bx-user"></i>
              <span className="info">
                <h3>6</h3>
                <p>Colaboradores</p>
              </span>
            </li>
          </ul>
          {/* End of Insights */}

          <div className="bottom-data">
            <div className="orders">
              <div className="header">
                <i className="bx bx-receipt"></i>
                <h3>Mis eventos</h3>
                <i className="bx bx-filter"></i>
                <i className="bx bx-search"></i>
              </div>
              <table>
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Fecha</th>
                    <th>estado</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <p>Evento 1</p>
                    </td>
                    <td>14-08-2023</td>
                    <td>
                      <span className="status completed">Completed</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p>Evento 2</p>
                    </td>
                    <td>14-08-2023</td>
                    <td>
                      <span className="status pending">Pending</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p>Evento 3</p>
                    </td>
                    <td>14-08-2023</td>
                    <td>
                      <span className="status process">Processing</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/*  Reminders */}
            <div className="reminders">
              <div className="header">
                <i className="bx bx-note"></i>
                <h3>Recordatorios</h3>
                <i className="bx bx-filter"></i>
                <i className="bx bx-plus"></i>
              </div>
              <ul className="task-list">
                <li className="completed">
                  <div className="task-title">
                    <i className="bx bx-check-circle"></i>
                    <p>Tarea 1</p>
                  </div>
                  <i className="bx bx-dots-vertical-rounded"></i>
                </li>
                <li className="completed">
                  <div className="task-title">
                    <i className="bx bx-check-circle"></i>
                    <p>Tarea 2</p>
                  </div>
                  <i className="bx bx-dots-vertical-rounded"></i>
                </li>
                <li className="not-completed">
                  <div className="task-title">
                    <i className="bx bx-x-circle"></i>
                    <p>Tarea 3</p>
                  </div>
                  <i className="bx bx-dots-vertical-rounded"></i>
                </li>
              </ul>
            </div>

            {/* End of Reminders */}
          </div>
        </main>
      </div>
    </>
  );
}

export default Home;
