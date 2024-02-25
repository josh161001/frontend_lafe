import { useNavigate } from "react-router-dom";
import { LaFeContext } from "../../context/LaFeContext";
import { useContext } from "react";

const CerrarSesion = () => {
  const [auth, setAuth] = useContext(LaFeContext);
  const navigate = useNavigate();

  const cerrarSesion = () => {
    localStorage.removeItem("access_token");
    setAuth({
      access_token: "",
      auth: false,
    });
    navigate("/");
  };

  return (
    <li>
      <button
        onClick={cerrarSesion}
        className="flex items-center w-full p-2 rounded-lg text-white hover:bg-secundario group"
        aria-label="Cerrar Sesión"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          className="w-6 h-6 mr-2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5.636 5.636a9 9 0 1 0 12.728 0M12 3v9"
          />
        </svg>
        <span className="whitespace-nowrap">Cerrar Sesión</span>
      </button>
    </li>
  );
};

export default CerrarSesion;
