import { useContext, useEffect, useState } from "react";
import { LaFeContext } from "../../../context/LaFeContext";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import url_axios from "../../../config/Axios";

const CrearVenta = () => {
  const [productos, setProductos] = useState([]);
  const [auth, setAuth] = useContext(LaFeContext);
  const navigate = useNavigate();

  const consultarProductos = async () => {
    if (auth.access_token !== "") {
      try {
        const respuesta = await url_axios.get("/productos", {
          headers: {
            Authorization: `Bearer ${auth.access_token}`,
          },
        });

        setProductos(respuesta.data.data);
      } catch (error) {
        const errorMessage = error.response.data.message;
        Swal.fire({
          icon: "error",
          title: "Error",
          text: errorMessage,
        });
      }
    } else {
      navigate("/");
    }
  };

  useEffect(() => {
    consultarProductos();
  }, []);

  return (
    <form>
      <legend className="text-3xl text-center mb-4">Nueva venta</legend>
      <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-4">
        {productos.map((producto, index) => (
          <div key={index} className="bg-secundario rounded p-4 mb-4">
            <label className="block text-principal text-center text-2xl font-bold mb-2">
              {producto.nombre}
            </label>
            <div className="mb-2">
              <label className="block text-principal text-lg font-bold">
                Existencia:{" "}
                <span className="font-bold text-black">
                  {producto.cantidad_producto}
                </span>
              </label>
            </div>
            <div className="flex justify-between items-end">
              <div className="text-left">
                <span className="text-principal text-lg font-bold">
                  Precio:{" "}
                </span>
                <span className="font-bold text-xl">
                  ${producto.precio_venta}
                </span>
              </div>
              <div className="text-right">
                <span className="font-bold text-xl">
                  {producto.category?.nombre}
                </span>
              </div>
            </div>
            <div className="flex justify-between items-center p-2 gap-2">
              <i class="fa-solid fa-minus"></i>
              <input
                type="number"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-2"
                id={producto.id}
                placeholder="Cantidad"
              />
              <i class="fa-solid fa-plus"></i>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col p-2 gap-4 justify-between items-end ">
        <div>
          <label className="p-2 font-bold text-2xl">Total a pagar: </label>
          <input
            className="p-2 rounded-lg text-lg  text-white font-bold"
            type="number"
            name="price"
            placeholder="total a pagar"
            readOnly="readonly"
          />
        </div>
        <div>
          <input
            type="submit"
            className="bg-secundario hover:bg-principal text-white font-bold py-2 px-4 rounded"
            value="Realizar venta"
          />
        </div>
      </div>
    </form>
  );
};

export default CrearVenta;
