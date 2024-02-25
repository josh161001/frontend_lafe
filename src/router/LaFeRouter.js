import { useContext } from "react";
import { LaFeContext, LaFeProvider } from "../context/LaFeContext";
import { Route, Routes } from "react-router-dom";
import PaginaDefault from "../views/login/PaginaDefault";
import IniciarSesion from "../views/login/IniciarSesion";
import Dashboard from "../views/system/Dashboard";
import Usuarios from "../views/system/Usuarios";
import Ventas from "../views/system/Ventas";
import Productos from "../views/system/Productos";
import Categorias from "../views/system/Categorias";
import Asistencias from "../views/system/Asistencias";
import AgregarUsuario from "../views/system/AgregarUsuario";

export const LaFeRouter = () => {
  const [auth, setAuth] = useContext(LaFeContext);

  return (
    <LaFeProvider values={[auth, setAuth]}>
      <Routes>
        {/* inicio de sesion*/}
        <Route path="/" element={<IniciarSesion />} />

        {/* Sistema */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/usuarios" element={<Usuarios />} />
        <Route path="/usuario" element={<AgregarUsuario />} />
        <Route path="/ventas" element={<Ventas />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/categorias" element={<Categorias />} />
        <Route path="/asistencias" element={<Asistencias />} />

        {/* Pagina por defecto */}
        <Route path="*" element={<PaginaDefault />} />
      </Routes>
    </LaFeProvider>
  );
};
