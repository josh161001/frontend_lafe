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
import EditarUsuario from "../views/system/EditarUsuario";
import Agregarcategoria from "../views/system/AgregarCategoria";
import EditarCategoria from "../views/system/EditarCategoria";
import AgregarProducto from "../views/system/AgregarProducto";
import EditarProducto from "../views/system/EditarProducto";
import AgregarAsistencia from "../views/system/AgregarAsistencia";

export const LaFeRouter = () => {
  const [auth, setAuth] = useContext(LaFeContext);

  return (
    <LaFeProvider values={[auth, setAuth]}>
      <Routes>
        {/* inicio de sesion*/}
        <Route path="/" element={<IniciarSesion />} />

        {/* Sistema */}

        {/* DASHBOARD */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* USUARIOS */}
        <Route path="/usuarios" element={<Usuarios />} />
        <Route path="/agregar-usuario" element={<AgregarUsuario />} />
        <Route path="/editar-usuario/:id" element={<EditarUsuario />} />

        {/* VENTAS */}
        <Route path="/ventas" element={<Ventas />} />

        {/* PRODUCTOS */}
        <Route path="/productos" element={<Productos />} />
        <Route path="/agregar-producto" element={<AgregarProducto />} />
        <Route path="/editar-producto/:id" element={<EditarProducto />} />

        {/* CATEGORIAS */}
        <Route path="/categorias" element={<Categorias />} />
        <Route path="/agregar-categoria" element={<Agregarcategoria />} />
        <Route path="/editar-categoria/:id" element={<EditarCategoria />} />

        {/* ASISTENCIAS */}
        <Route path="/asistencias" element={<Asistencias />} />
        <Route path="/agregar-asistencia" element={<AgregarAsistencia />} />

        {/* Pagina por defecto */}
        <Route path="*" element={<PaginaDefault />} />
      </Routes>
    </LaFeProvider>
  );
};
