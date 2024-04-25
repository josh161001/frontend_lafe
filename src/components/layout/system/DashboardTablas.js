import React, { useContext, useEffect, useState, useRef } from "react";
import Chart from "chart.js/auto";
import url_axios from "../../../config/Axios";
import { LaFeContext } from "../../../context/LaFeContext";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const DashboardTablas = () => {
  const [auth, setAuth] = useContext(LaFeContext);
  const [ventasMes, setVentasMes] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [productos, setProductos] = useState([]);
  const chartRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.access_token !== "") {
      const consultarVentasMes = async () => {
        try {
          const respuesta = await url_axios.get("/ventas/total-ventas", {
            headers: {
              Authorization: `Bearer ${auth.access_token}`,
            },
          });
          setVentasMes(respuesta.data.data);
        } catch (error) {
          console.log(error);
        }
      };
      consultarVentasMes();
    } else {
      navigate("/");
    }
  }, [auth.access_token, navigate]);

  useEffect(() => {
    if (ventasMes.length === 0 || !chartRef.current) return;

    const monthlyData = Array.from({ length: 12 }, (_, i) => {
      const monthData = ventasMes.find((entry) => entry.mes === i + 1);
      return monthData ? monthData.total : 0;
    });

    const ctx = chartRef.current.getContext("2d");

    if (chartRef.current.chartInstance) {
      chartRef.current.chartInstance.destroy();
    }

    chartRef.current.chartInstance = new Chart(ctx, {
      type: "bar",
      data: {
        labels: [
          "Ene",
          "Feb",
          "Mar",
          "Abr",
          "May",
          "Jun",
          "Jul",
          "Ago",
          "Sep",
          "Oct",
          "Nov",
          "Dic",
        ],
        datasets: [
          {
            label: "Ventas Mensuales",
            data: monthlyData,
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }, [ventasMes]);

  useEffect(() => {
    const consultarUsuarios = async () => {
      try {
        const respuesta = await url_axios.get("/users", {
          headers: {
            Authorization: `Bearer ${auth.access_token}`,
          },
        });
        setUsuarios(respuesta.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    consultarUsuarios();
  }, []);

  useEffect(() => {
    const consultarProductos = async () => {
      try {
        const respuesta = await url_axios.get("/productos", {
          headers: {
            Authorization: `Bearer ${auth.access_token}`,
          },
        });
        setProductos(respuesta.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    consultarProductos();
  }, []);

  if (!auth.rol?.includes("ADMIN") || !auth === true) {
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
    <div>
      <h1 className="text-2xl font-bold text-gray-800">Ventas Mensuales</h1>
      <canvas
        ref={chartRef}
        id="salesChart"
        width="300"
        height="200"
        className="bg-white"
      ></canvas>
      <div className="grid grid-cols-1 lg:grid-cols-2 md:grid-cols-2 pt-4 gap-2 ">
        <div>
          <h1 className="text-2xl text-center font-bold text-gray-800">
            Tabla Usuarios
          </h1>
          <div className="relative overflow-x-auto sm:rounded-lg">
            <div>
              <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-sm uppercase  bg-secundario text-white">
                  <tr>
                    <th scope="col" className="p-4"></th>
                    <th scope="col" className="px-6 py-3 border-r ">
                      Nombre
                    </th>
                    <th scope="col" className="px-6 py-3 border-r ">
                      Correo
                    </th>
                    <th scope="col" className="px-6 py-3 border-r ">
                      Roles
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {usuarios.map((usuario, index) => (
                    <tr
                      key={usuario.id}
                      index={index}
                      className=" border-b  bg-principal  border-secundario hover:bg-secundario cursor-pointer"
                    >
                      <td className="w-4 p-4"></td>
                      <td className="px-6 py-4  text-white border-r  whitespace-nowrap ">
                        {usuario.nombre}
                      </td>
                      <td className="px-6 py-4  text-white border-r  whitespace-nowrap ">
                        {usuario.email}
                      </td>
                      <td className="px-6 py-4  text-white border-r  whitespace-nowrap ">
                        {usuario.roles.join(", ")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div>
          <h1 className="text-2xl text-center font-bold text-gray-800">
            Tabla Productos
          </h1>
          {/* tabla productos */}
          <div className="relative overflow-x-auto sm:rounded-lg">
            <div>
              <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-sm uppercase  bg-secundario text-white">
                  <tr>
                    <th scope="col" className="p-4"></th>
                    <th scope="col" className="px-6 py-3 border-r ">
                      Nombre
                    </th>
                    <th scope="col" className="px-6 py-3 border-r ">
                      Precio
                    </th>
                    <th scope="col" className="px-6 py-3 border-r ">
                      Categoria
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {productos.map((producto, index) => (
                    <tr
                      key={producto.id}
                      index={index}
                      className=" border-b  bg-principal  border-secundario hover:bg-secundario cursor-pointer"
                    >
                      <td className="w-4 p-4"></td>
                      <td className="px-6 py-4  text-white border-r  whitespace-nowrap ">
                        {producto.nombre}
                      </td>
                      <td className="px-6 py-4  text-white border-r  whitespace-nowrap ">
                        {producto.precio_venta}
                      </td>
                      <td className="px-6 py-4  text-white border-r  whitespace-nowrap ">
                        {producto.category?.nombre}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardTablas;
