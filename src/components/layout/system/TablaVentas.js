import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import url_axios from "../../../config/Axios";
import { LaFeContext } from "../../../context/LaFeContext";
import moment from "moment";
moment.locale("es");

const TablaVentas = (props) => {
  const [auth, setAuth] = useContext(LaFeContext);
  const [ventas, setVentas] = useState([]);
  const [acceso, setAcceso] = useState(true);
  const [filtroFecha, setFiltroFecha] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (auth.access_token !== "") {
      const consultarVentas = async () => {
        try {
          const respuesta = await url_axios.get("/ventas", {
            headers: {
              Authorization: `Bearer ${auth.access_token}`,
            },
          });

          setVentas(respuesta.data.data);
        } catch (error) {
          setAcceso(false);
        }
      };
      consultarVentas();
    } else {
      navigate("/");
    }
  }, [auth.access_token, navigate, ventas]);

  const eliminarVenta = async (id) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Ya no se podrá recuperar la venta eliminada!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, Eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        url_axios.delete(`/ventas/${id}`, {
          headers: {
            Authorization: `Bearer ${auth.access_token}`,
          },
        });
      }
    });
  };

  const filtrarVentasPorFecha = () => {
    if (filtroFecha.trim() !== "") {
      const fechaFiltro = moment(filtroFecha);
      const ventasFiltradas = ventas.filter((venta) => {
        const fechaVenta = moment(venta.fecha_venta);
        return fechaVenta.isSame(fechaFiltro, "day");
      });
      return ventasFiltradas;
    }
    return ventas;
  };

  return (
    <>
      <div className="p-2">
        <input
          className="p-2 w-full rounded border  bg-principal text-white border-secundario"
          type="date"
          value={filtroFecha}
          onChange={(e) => setFiltroFecha(e.target.value)}
        />
      </div>
      <div className="relative overflow-x-auto sm:rounded-lg">
        <div>
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-sm uppercase  bg-secundario text-white">
              <tr>
                <th scope="col" className="p-4"></th>
                <th scope="col" className="px-6 py-3 border-r ">
                  Fecha de Venta
                </th>
                <th scope="col" className="px-6 py-3 border-r ">
                  Usuario
                </th>
                <th scope="col" className="px-6 py-3 border-r ">
                  Total
                </th>
                <th scope="col" className="px-6 py-3 border-r ">
                  Cantidad producto vendido
                </th>
                <th scope="col" className="px-6 py-3 border-r ">
                  Productos vendidos
                </th>

                <th scope="col" className="px-6 py-3">
                  Acción
                </th>
              </tr>
            </thead>
            <tbody>
              {filtrarVentasPorFecha().map((venta, index) => (
                <tr
                  key={venta.id}
                  index={index}
                  className=" border-b  bg-principal  border-secundario  cursor-pointer"
                >
                  <td className="w-4 p-4"></td>
                  <td className="px-6 py-4  text-secundario border-r text-center font-bold hover:text-white whitespace-nowrap ">
                    {moment(venta.fecha_venta).format("LLLL")}
                  </td>
                  <td className="px-6 py-4  text-secundario border-r font-bold text-center hover:text-white whitespace-nowrap ">
                    {venta.usuario?.nombre || "Usuario eliminado"}
                  </td>
                  <td className="px-6 py-4  text-secundario font-bold border-r text-center hover:text-white whitespace-nowrap ">
                    ${venta.total_venta}
                  </td>
                  <td className="px-6 py-4   border-r text-secundario  text-center font-bold  hover:text-white whitespace-nowrap ">
                    {venta.venta_productos.length}
                  </td>
                  <td className="px-6 py-4  text-secundario border-r text-center  font-bold whitespace-nowrap ">
                    {/* Mostrar los productos vendidos */}
                    {venta.venta_productos.map((productoVenta) => (
                      <div key={productoVenta.producto?.id}>
                        <p className="font-bold text-secundario ">
                          {productoVenta.producto?.nombre}
                        </p>
                        <p className="font-bold text-white">
                          Cantidad: {productoVenta.cantidad}
                        </p>
                      </div>
                    ))}
                  </td>

                  <td className=" flex items-center px-4 py-4 space-x-3">
                    {/* eliminar */}
                    <button
                      onClick={() => eliminarVenta(venta.id)}
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

export default TablaVentas;
