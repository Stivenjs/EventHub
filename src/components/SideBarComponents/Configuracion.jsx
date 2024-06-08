import { useEffect } from "react";
import  NavigationBar  from "../NavigationBar";


export const Configuracion = () => {
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
  return (
    <>
      <NavigationBar />
      <div className="content-centro">
        <div className="centro">hola configuraciones</div>
      </div>
    </>
  );
};
