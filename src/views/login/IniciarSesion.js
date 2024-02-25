import React from "react";
import FormLogin from "../../components/layout/login/FormLogin";

const IniciarSesion = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-200">
      <div className="max-w-screen-lg bg-white rounded-md shadow-lg p-4 sm:p-12">
        <h1 className="text-xl sm:text-2xl font-semibold mb-2">
          Bienvenido al cibercafé <br />
          <span className="text-principal">La fé</span>
        </h1>
        <small className="text-gray-400">
          Para ingresar a la plataforma, por favor ingresa <br /> tus
          credenciales, a continuación.
        </small>
        <FormLogin />
      </div>
    </div>
  );
};

export default IniciarSesion;
