import { useNavigate, useParams } from "react-router-dom";
import { LaFeContext } from "../../../context/LaFeContext";
import { useContext, useEffect, useState } from "react";
import url_axios from "../../../config/Axios";
import Swal from "sweetalert2";

const FormEditarUsuario = () => {
  const { id } = useParams();
  const [auth, setAuth] = useContext(LaFeContext);
  const [usuario, datoUsuario] = useState({
    nombre: "",
    email: "",
    direccion: "",
    telefono: "",
    contraseña: "",
    roles: [],
  });

  const roles = ["ADMIN", "USER"];
  const [seleccionarRol, setSeleccionarRol] = useState(usuario.roles[0]);
  const navigate = useNavigate();

  const handleRolChange = (e) => {
    setSeleccionarRol(e.target.value);

    datoUsuario({
      ...usuario,
      roles: [e.target.value],
    });
  };
  useEffect(() => {
    setSeleccionarRol(usuario.roles[0]);
  }, [usuario.roles]);

  const consultarUsuario = async () => {
    if (auth.access_token !== "") {
      try {
        const respuesta = await url_axios.get(`/users/${id}`, {
          headers: {
            Authorization: `Bearer ${auth.access_token}`,
          },
        });

        datoUsuario(respuesta.data.data);
      } catch (error) {
        Swal.fire("Error", error.response.data.message, "error");
      }
    }
  };

  useEffect(() => {
    consultarUsuario();
  }, []);

  const usuarioState = (e) => {
    if (e.target.name === "roles") {
      datoUsuario({
        ...usuario,
        roles: e.target.value,
      });
    } else {
      datoUsuario({
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
      !roles
    );
  };

  const guardarUsuario = (e) => {
    e.preventDefault();
    if (auth.access_token !== "") {
      url_axios
        .patch(`/users/${id}`, usuario, {
          headers: {
            Authorization: `Bearer ${auth.access_token}`,
          },
        })
        .then((res) => {
          Swal.fire({
            icon: "success",
            title: "Usuario actualizado",
            text: "El usuario se ha actualizado correctamente",
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
            value={usuario.nombre}
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
            disabled
            value={usuario.email}
            placeholder="Email del usuario"
            required
            className="block w-full rounded-md border bg-gray-300  border-gray-300 focus:border-verde focus:outline-none focus:ring-1 focus:ring-verde py-1 px-1.5 text-gray-500"
            onChange={usuarioState}
          />
        </div>
        <div>
          <label className=" block text-xs font-semibold">Direccion</label>
          <input
            value={usuario.direccion}
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
            value={usuario.telefono}
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
          Editar usuario
        </button>
      </div>
    </form>
  );
};

export default FormEditarUsuario;
