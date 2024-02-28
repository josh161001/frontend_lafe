import { useContext, useState } from "react";
import { LaFeContext } from "../../../context/LaFeContext";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import url_axios from "../../../config/Axios";

const FormRegistrarCategoria = () => {
  const [auth, setAuth] = useContext(LaFeContext);
  const [categoria, guardarCategoria] = useState({
    nombre: "",
  });

  const navigate = useNavigate();

  const usuarioState = (e) => {
    guardarCategoria({
      ...categoria,
      [e.target.name]: e.target.value,
    });
  };

  const validarCategoria = () => {
    const { nombre } = categoria;

    return !nombre.length;
  };

  const guardarCategorias = (e) => {
    e.preventDefault();

    if (auth.access_token !== "") {
      url_axios
        .post("/categories", categoria, {
          headers: {
            Authorization: `Bearer ${auth.access_token}`,
          },
        })
        .then((res) => {
          Swal.fire({
            icon: "success",
            title: "Categoria creada",
            text: "La categoria se ha creado correctamente",
          });

          navigate("/categorias");
        })
        .catch((error) => {
          const errorMessage = error.response.data.message;
          Swal.fire({
            icon: "error",
            title: "Error",
            text: errorMessage,
          });
        });
    } else {
      navigate("/");
    }
  };

  if (!auth.rol.includes("ADMIN") || !auth === true) {
    return (
      <>
        <div className="flex p-8 items-center justify-center">
          <div className="max-w-screen-lg bg-principal rounded-md shadow-lg p-4 sm:p-12">
            <h1 className="text-2xl sm:text-3xl text-white font-semibold mb-4">
              Acceso denegado
              <span className="text-secundario"> 401</span>
            </h1>
            <p className="text-gray-200 pb-6">
              Lo sentimos, pero no tienes los permisos necesarios para acceder a
              este recurso. <br /> Si crees que esto es un error, por favor
              contacta al administrador.
            </p>
            <p className="text-gray-200 text-sm">
              Si necesitas asistencia adicional, no dudes en contactarnos.
            </p>
          </div>
        </div>
      </>
    );
  }
  return (
    <form className="mt-2" onSubmit={guardarCategorias}>
      {/*  */}
      <div>
        <label className="block text-xs font-semibold">Nombre</label>
        <input
          required
          name="nombre"
          type="text"
          placeholder="nombre..."
          className="block w-full rounded-md border border-gray-300 focus:border-verde focus:outline-none focus:ring-1 focus:ring-verde py-1 px-1.5 text-gray-500"
          onChange={usuarioState}
        />
      </div>

      <div className=" mt-4 flex gap-2">
        <button
          disabled={validarCategoria()}
          className={`mb-1.5 block w-full text-center text-white px-3 py-1.5 rounded-md ${
            validarCategoria() ? "bg-secundario " : "bg-principal"
          }`}
        >
          Registrar categoria
        </button>
      </div>
    </form>
  );
};

export default FormRegistrarCategoria;
