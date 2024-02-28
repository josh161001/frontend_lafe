import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import url_axios from "../../../config/Axios";
import { LaFeContext } from "../../../context/LaFeContext";

const TablaCategorias = (props) => {
  const [auth, setAuth] = useContext(LaFeContext);
  const [categorias, guardarCategorias] = useState([]);
  const [acceso, setAcceso] = useState(true);
  const [filtroNombre, setFiltroNombre] = useState("");

  const navigate = useNavigate();
  useEffect(() => {
    if (auth.access_token !== "") {
      const consultarCategorias = async () => {
        try {
          const respuesta = await url_axios.get("/categories", {
            headers: {
              Authorization: `Bearer ${auth.access_token}`,
            },
          });

          guardarCategorias(respuesta.data.data);
        } catch (error) {
          setAcceso(false);
        }
      };
      consultarCategorias();
    } else {
      navigate("/");
    }
  }, [auth.access_token, navigate, categorias]);

  const eliminarCategoria = async (id) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Ya no se podrá recuperar la categoria eliminada!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, Eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        url_axios.delete(`/categories/${id}`, {
          headers: {
            Authorization: `Bearer ${auth.access_token}`,
          },
        });
      }
    });
  };

  const filtrarCategorias = Object.values(categorias).filter((categoria) => {
    return categoria.nombre.toLowerCase().includes(filtroNombre.toLowerCase());
  });

  // Retornar el mensaje "no tienes acceso" si no es ADMIN
  if (!acceso || !auth.rol.includes("ADMIN") || !auth === true) {
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
    <>
      <div className="p-2">
        <input
          className="p-2 w-full rounded border   border-principal"
          type="text"
          placeholder="Buscar por nombre..."
          value={filtroNombre}
          onChange={(e) => setFiltroNombre(e.target.value)}
        />
      </div>
      <div className="relative overflow-x-auto sm:rounded-lg">
        <div>
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-sm uppercase  bg-secundario text-white">
              <tr>
                <th scope="col" className="p-4"></th>
                <th scope="col" className="px-6 py-3 border-r ">
                  Nombre
                </th>

                <th scope="col" className="px-6 py-3">
                  Acción
                </th>
              </tr>
            </thead>
            <tbody>
              {filtrarCategorias.map((categoria, index) => (
                <tr
                  key={categoria.id}
                  index={index}
                  className=" border-b  bg-principal  border-secundario hover:bg-secundario cursor-pointer"
                >
                  <td className="w-4 p-4"></td>
                  <td className="px-6 py-4  text-white border-r text-center  whitespace-nowrap ">
                    {categoria.nombre}
                  </td>

                  <td className=" flex items-center px-4 py-4 space-x-3">
                    {/* editar */}
                    <Link
                      to={`/editar-categoria/${categoria.id}`}
                      className="inline-block px-1 py-1 rounded-lg bg-blue-900   text-red-600 dark:text-blue-500 hover:underline"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                        />
                      </svg>
                    </Link>
                    {/* eliminar */}
                    <button
                      onClick={() => eliminarCategoria(categoria.id)}
                      className="inline-block px-1 py-1 rounded-lg bg-red-900  text-red-600 dark:text-red-500 hover:underline"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          fillRule="evenodd"
                          d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default TablaCategorias;
