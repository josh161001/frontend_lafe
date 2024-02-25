import { NavLink } from "react-router-dom";

const PaginaDefault = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-200">
      <div className="  max-w-screen-lg bg-white  rounded-md shadow-lg p-4 sm:p-12">
        <h1 className="text-xl sm:text-2xl  font-semibold mb-2">
          Página no encontrada
          <span className="text-principal"> 404</span>
        </h1>
        <p className="text-gray-600 pb-3">
          La página que buscas no existe o no <br />
          está disponible.
        </p>
        <button className=" bg-principal p-2  rounded-lg text-white font-semibold">
          <NavLink to={"/"}>Volver al inicio</NavLink>
        </button>
      </div>
    </div>
  );
};

export default PaginaDefault;
