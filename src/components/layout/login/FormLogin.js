import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LaFeContext } from "../../../context/LaFeContext";
import Swal from "sweetalert2";
import url_axios from "../../../config/Axios";

const FormLogin = () => {
  //utilizar context
  const [auth, setAuth] = useContext(LaFeContext);

  //state credenciales
  const [credencialesUsuario, guardarCredencialesUsuario] = useState({
    email: "",
    contraseña: "",
  });

  const navigate = useNavigate();

  //funcion para leer los datos del formulario y guardarlos en el state
  const credencialesUsuarioState = (e) => {
    guardarCredencialesUsuario({
      ...credencialesUsuario,
      [e.target.name]: e.target.value,
    });
  };

  //funcion para validar que no haya campos vacios
  const validarCredencialesUsuario = () => {
    const { email, contraseña } = credencialesUsuario;
    return !email.length || !contraseña.length;
  };

  //funcion para iniciar sesion en el servidor
  const iniciarSesion = async (e) => {
    e.preventDefault();

    //validar usuario
    try {
      const respuesta = await url_axios.post(
        "/auth/login",
        credencialesUsuario
      );
      const { access_token } = respuesta.data.data;

      //guardar token en localstorage
      localStorage.setItem("access_token", access_token);

      //guardar token en el state
      setAuth({
        access_token,
        auth: true,
      });

      Swal.fire({
        icon: "success",
        title: "Inicio de sesión exitoso",
        text: "Bienvenido al cibercafe la fe",
      });

      //redireccionar
      navigate("/dashboard");

      //guardar token en localstorage
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Hubo un error",
        text: error.response.data.message,
      });
    }
  };

  return (
    <form className="mt-4" onSubmit={iniciarSesion}>
      <div className="mb-3">
        <label className="mb-2 block text-xs font-semibold">Correo</label>
        <input
          name="email"
          type="email"
          placeholder="correo@correo.com"
          className="block w-full rounded-md border border-gray-300 focus:border-principal focus:outline-none focus:ring-1 focus:ring-principal py-1 px-1.5 text-gray-500"
          onChange={credencialesUsuarioState}
        />
      </div>
      <div className="mb-3">
        <label className="mb-2 block text-xs font-semibold">Contraseña</label>
        <input
          name="contraseña"
          type="password"
          placeholder="*****"
          className="block w-full rounded-md border border-gray-300 focus:border-principal focus:outline-none focus:ring-1 focus:ring-principal py-1 px-1.5 text-gray-500"
          onChange={credencialesUsuarioState}
        />
      </div>

      <div className="mb-3 flex gap-2">
        <button
          disabled={validarCredencialesUsuario()}
          className={`mb-1.5 block w-full text-center text-white px-3 py-1.5 rounded-md ${
            validarCredencialesUsuario() ? "bg-secundario " : "bg-principal"
          }`}
        >
          Iniciar Sesión
        </button>
      </div>
    </form>
  );
};

export default FormLogin;
