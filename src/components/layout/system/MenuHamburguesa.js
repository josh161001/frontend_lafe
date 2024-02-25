import React, { useContext, useEffect, useState } from "react";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { LaFeContext } from "../../../context/LaFeContext";

import CerrarSesion from "../../common/CerrarSesion";
import MenuUsuariosDrop from "../../common/MenuUsuariosDrop";
import MenuVentasDrop from "../../common/MenuVentasDrop";
import MenuProductosDrop from "../../common/MenuProductosDrop";
import MenuCategoriasDrop from "../../common/MenuCategoriasDrop";
import MenuAsistenciasDrop from "../../common/MenuAsistenciasDrop";
import { NavLink, useNavigate } from "react-router-dom";
import url_axios from "../../../config/Axios";

const MenuHamburguesa = () => {
  const [auth, setAuth] = useContext(LaFeContext);
  const [usuarios, guardarUsuarios] = useState("");

  const usuariosDrop = [{ name: "Usuarios", to: "/usuarios" }];
  const ventasDrop = [{ name: "Ventas", to: "/Ventas" }];
  const productosDrop = [{ name: "Productos", to: "/productos" }];
  const categoriasDrop = [{ name: "Categorias", to: "/categorias" }];
  const asistenciasDrop = [{ name: "Asistencias", to: "/asistencias" }];

  const navigate = useNavigate();

  const [MenuHamburguesa, setMenuHamburguesa] = useState(false);
  const toggleMenuHamburguesa = () => {
    setMenuHamburguesa(!MenuHamburguesa);
  };

  useEffect(() => {
    const obtenerUsuario = async () => {
      if (auth.access_token !== "") {
        try {
          const respuesta = await url_axios.get("/auth/profile", {
            headers: {
              Authorization: `Bearer ${auth.access_token}`,
            },
          });
          guardarUsuarios(respuesta.data.data);
        } catch (error) {
          console.log(error);
          if (error.response.status === 401) {
            navigate("/");
          }
        }
      } else {
        navigate("/");
      }
    };
    obtenerUsuario();
  }, [usuarios, auth.access_token, navigate]);

  return (
    <>
      <nav className="fixed top-0 z-50 w-full  border-b border-principal bg-principal">
        <div className="px-3 py-3 lg:px-5 lg:pl-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start">
              <button
                type="button"
                className="-m-2.5 pl-4 inline-flex sm:hidden items-center justify-center rounded-md p-2.5 "
                aria-expanded={MenuHamburguesa}
                onClick={toggleMenuHamburguesa}
              >
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </button>
              <div className="flex pl-4 sm:pl-8 md:mr-24">
                <span className="self-center text-2xl   font-semibold sm:text-2xl whitespace-nowrap text-white">
                  Bienvenido{" "}
                  <span className="font-bold text-secundario">
                    {usuarios.nombre}
                  </span>
                </span>
              </div>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="w-10 h-8 pr-3 text-white cursor-pointer "
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
              />
            </svg>
          </div>
        </div>
      </nav>
      <aside
        id="logo-sidebar"
        className={`fixed ${
          MenuHamburguesa
            ? "translate-x-0 ease-out"
            : "-translate-x-full ease-in"
        } top-0 left-0 z-40 w-68 h-screen pt-20 transition-transform -translate-x-full border-r border-principal sm:translate-x-0 bg-principal`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 pb-4 overflow-y-auto bg-principal">
          <ul className="space-y-2 font-medium">
            <li>
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  `flex items-center p-2 ${
                    isActive ? "bg-secundario" : ""
                  } rounded-lg text-white hover:bg-secundario group`
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z"
                  />
                </svg>

                <span className="flex-1 ml-3 whitespace-nowrap">Dashboard</span>
              </NavLink>
            </li>
            <MenuUsuariosDrop name="Usuarios" options={usuariosDrop} />
            <MenuVentasDrop name="Ventas" options={ventasDrop} />
            <MenuProductosDrop name="Productos" options={productosDrop} />
            <MenuCategoriasDrop name="Categorias" options={categoriasDrop} />
            <MenuAsistenciasDrop name="Asistencia" options={asistenciasDrop} />
            <CerrarSesion />
          </ul>
        </div>
      </aside>
    </>
  );
};

export default MenuHamburguesa;
