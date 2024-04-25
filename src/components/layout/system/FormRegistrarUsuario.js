import { useContext, useState } from "react";
import { LaFeContext } from "../../../context/LaFeContext";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import url_axios from "../../../config/Axios";

const FormRegistrarUsuario = () => {
  const [auth, setAuth] = useContext(LaFeContext);
  const [usuario, guardarUsuarios] = useState({
    nombre: "",
    email: "",
    direccion: "",
    telefono: "",
    contraseña: "",
  });
  const roles = ["ADMIN", "USER"];

  const [seleccionarRol, setSeleccionarRol] = useState("");
  const navigate = useNavigate();

  const handleRolChange = (e) => {
    setSeleccionarRol(e.target.value);

    guardarUsuarios({
      ...usuario,
      roles: [e.target.value],
    });
  };

  const usuarioState = (e) => {
    if (e.target.name === "roles") {
      guardarUsuarios({
        ...usuario,
        roles: [seleccionarRol],
      });
    } else {
      guardarUsuarios({
        ...usuario,
        [e.target.name]: e.target.value,
      });
    }
  };

  const validarUsuario = () => {
    const { nombre, email, direccion, telefono, contraseña } = usuario;

    return (
      !nombre.length ||
      !email.length ||
      !direccion.length ||
      !telefono.length ||
      !contraseña.length ||
      !roles ||
      !roles.length === 0
    );
  };

  const guardarUsuario = (e) => {
    e.preventDefault();

    if (auth.access_token !== "") {
      url_axios
        .post("/users", usuario, {
          headers: {
            Authorization: `Bearer ${auth.access_token}`,
          },
        })
        .then((res) => {
          Swal.fire({
            icon: "success",
            title: "Usuario creado",
            text: "El usuario se ha creado correctamente",
          });
          navigate("/usuarios");
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
    <form className="mt-2" onSubmit={guardarUsuario}>
      <div className="grid grid-cols-1 lg:grid-cols-2 sm:grid-cols-1  gap-2">
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
        <div>
          <label className="block text-xs font-semibold">Email</label>
          <input
            name="email"
            type="email"
            placeholder="Email del usuario"
            required
            className="block w-full rounded-md border border-gray-300 focus:border-verde focus:outline-none focus:ring-1 focus:ring-verde py-1 px-1.5 text-gray-500"
            onChange={usuarioState}
          />
        </div>
        <div>
          <label className=" block text-xs font-semibold">Direccion</label>
          <input
            name="direccion"
            type="text"
            placeholder="Direccion del usuario"
            required
            className="block w-full rounded-md border border-gray-300 focus:border-verde focus:outline-none focus:ring-1 focus:ring-verde py-1 px-1.5 text-gray-500"
            onChange={usuarioState}
          />
        </div>

        <div>
          <label className=" block text-xs font-semibold">
            Numero de telefono
          </label>
          <input
            name="telefono"
            type="number"
            placeholder="Numero del usuario"
            required
            className="block w-full rounded-md border border-gray-300 focus:border-verde focus:outline-none focus:ring-1 focus:ring-verde py-1 px-1.5 text-gray-500"
            onChange={usuarioState}
          />
        </div>
        <div>
          <label className="block text-xs font-semibold">Contraseña</label>
          <input
            name="contraseña"
            type="password"
            placeholder="********"
            required
            className="block w-full rounded-md border border-gray-300 focus:border-verde focus:outline-none focus:ring-1 focus:ring-verde py-1 px-1.5 text-gray-500"
            onChange={usuarioState}
          />
        </div>
        <div>
          <label className="block text-xs font-semibold">Rol del usuario</label>
          <select
            name="roles"
            id="roles"
            value={seleccionarRol}
            className="border text-sm rounded-lg block w-full p-1.5 bg-principal border-principal placeholder-principal text-white focus:ring-secundario focus:border-secundario"
            onChange={handleRolChange}
          >
            <option disabled value="">
              --- Selecciona un rol ---
            </option>
            {roles.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className=" mt-4 flex gap-2">
        <button
          disabled={validarUsuario()}
          className={`mb-1.5 block w-full text-center text-white px-3 py-1.5 rounded-md ${
            validarUsuario() ? "bg-secundario " : "bg-principal"
          }`}
        >
          Registrar usuario
        </button>
      </div>
    </form>
  );
};

export default FormRegistrarUsuario;
