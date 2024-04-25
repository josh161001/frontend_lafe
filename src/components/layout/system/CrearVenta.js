import { useContext, useEffect, useState } from "react";
import { LaFeContext } from "../../../context/LaFeContext";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import url_axios from "../../../config/Axios";

const CrearVenta = () => {
  const [productos, setProductos] = useState([]);
  const [auth, setAuth] = useContext(LaFeContext);
  const [filtroCategoria, setFiltroCategoria] = useState("");
  const [filtroNombre, setFiltroNombre] = useState("");
  const [venta, setVenta] = useState({
    fecha_venta: new Date(),
    total_venta: 0,
    venta_productos: [],
  });

  const navigate = useNavigate();

  useEffect(() => {
    const consultarProductos = async () => {
      if (auth.access_token !== "") {
        const productoResponse = await url_axios.get("/productos", {
          headers: {
            Authorization: `Bearer ${auth.access_token}`,
          },
        });

        const productosCategoria = productoResponse.data.data.reduce(
          (categorias, producto) => {
            const categoria = producto.category?.nombre;

            categorias[categoria] = categorias[categoria] || [];

            // Inicializamos la cantidad_producto en 0
            producto.cantidad_producto = 0;

            categorias[categoria].push(producto);

            return categorias;
          },
          {}
        );

        setProductos(productosCategoria);
      } else {
        navigate("/");
      }
    };
    consultarProductos();
  }, [auth.access_token, navigate]);

  const categorias = [
    ...new Set(
      Object.values(productos)
        .flat()
        .map((producto) => producto.category?.nombre)
    ),
  ];

  const filtrarProductos = Object.values(productos)
    .flat()
    .filter(
      (productos) =>
        (productos.category?.nombre.includes(filtroCategoria) ||
          filtroCategoria === "") &&
        (productos.nombre.toLowerCase().includes(filtroNombre) ||
          filtroNombre === "")
    );

  const restarProducto = (index) => {
    const producto = filtrarProductos[index];

    if (producto.cantidad_producto > 0) {
      const updatedProductos = {
        ...productos,
        [producto.category.nombre]: productos[producto.category.nombre].map(
          (prod) =>
            prod.id === producto.id
              ? { ...prod, cantidad_producto: prod.cantidad_producto - 1 }
              : prod
        ),
      };

      setProductos(updatedProductos);
      actualizarVenta(updatedProductos);
    }
  };

  const sumarProducto = (index) => {
    const producto = filtrarProductos[index];

    // Buscar el producto en el estado productos
    const updatedProductos = {
      ...productos,
      [producto.category?.nombre]: productos[producto.category?.nombre].map(
        (prod) =>
          prod.id === producto.id
            ? { ...prod, cantidad_producto: prod.cantidad_producto + 1 }
            : prod
      ),
    };

    // Actualizar el estado
    setProductos(updatedProductos);

    // Actualizar el estado de la venta
    actualizarVenta(updatedProductos);
  };

  const actualizarVenta = (productosEstado) => {
    let nuevoTotal = 0;
    const ventaProductos = [];

    Object.values(productosEstado).forEach((categoria) => {
      categoria.forEach((producto) => {
        if (producto.cantidad_producto > 0) {
          ventaProductos.push({
            producto_id: producto.id,
            cantidad: producto.cantidad_producto,
          });
          nuevoTotal += producto.cantidad_producto * producto.precio_venta;
        }
      });
    });

    setVenta({
      fecha_venta: new Date(),
      total_venta: nuevoTotal,
      venta_productos: ventaProductos,
    });
  };

  const guardarVenta = async (e) => {
    e.preventDefault();

    if (auth.access_token !== "") {
      url_axios
        .post("/ventas", venta, {
          headers: {
            Authorization: `Bearer ${auth.access_token}`,
          },
        })
        .then((res) => {
          Swal.fire({
            icon: "success",
            title: "Venta realizada",
            text: "La venta se ha realizado correctamente",
          });

          setTimeout(() => {
            window.location.reload();
          }, 2000);
          navigate("/ventas");
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

  return (
    <>
      <legend className="text-3xl text-center mb-4">Nueva venta</legend>
      <div className="p-2">
        <input
          className="p-2 w-full rounded border focus:ring-azul border-grayTec"
          type="text"
          placeholder="Buscar por nombre..."
          value={filtroNombre}
          onChange={(e) => setFiltroNombre(e.target.value)}
        />
      </div>
      <div className="p-2 flex flex-col lg:flex-row md:flex-row  gap-2 ">
        {["Todas las categorias", ...categorias].map((categoria, index) => (
          <button
            key={index}
            className={`py-2 px-4 rounded ${
              filtroCategoria ===
              (categoria === "Todas las categorias" ? "" : categoria)
                ? "bg-principal text-white"
                : "bg-secundario text-white"
            }`}
            onClick={() =>
              setFiltroCategoria(
                categoria === "Todas las categorias" ? "" : categoria
              )
            }
          >
            {categoria}
          </button>
        ))}
      </div>

      <form onSubmit={guardarVenta}>
        <div className="grid grid-cols-1 pt-4 lg:grid-cols-3 md:grid-cols-2 gap-4">
          {filtrarProductos.map((producto, index) => (
            <div
              index={index}
              key={producto.id}
              className="bg-secundario rounded p-4 mb-4"
            >
              <label className="block text-principal text-center text-2xl font-bold mb-2">
                {producto.nombre}
              </label>

              <div className=" ">
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
                <i
                  onClick={() => restarProducto(index)}
                  className="fa-solid fa-minus bg-principal rounded-full text-white p-2 cursor-pointer"
                ></i>
                <p className="p-2 bg-white w-full text-center text-black ">
                  {producto.cantidad_producto}
                </p>
                <i
                  onClick={() => sumarProducto(index)}
                  className="fa-solid fa-plus p-2 bg-principal rounded-full text-white cursor-pointer"
                ></i>
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-col p-2 gap-4 justify-between items-end ">
          <label className="p-2 font-bold text-2xl ">Productos: </label>
          {venta.venta_productos.map((ventaProducto, index) => {
            const producto = filtrarProductos.find(
              (producto) => producto.id === ventaProducto.producto_id
            );

            if (producto) {
              return (
                <p className="p-2 bg-secundario" key={index}>
                  {producto.nombre} <span>x {ventaProducto.cantidad}</span> ={" "}
                  <span className="font-bold">
                    ${producto.precio_venta * ventaProducto.cantidad}
                  </span>
                </p>
              );
            } else {
              return null;
            }
          })}

          <div>
            <div className="flex">
              <label className="p-2 font-bold text-2xl">Total a pagar: </label>
              <p className="text-2xl p-2 bg-white  text-center font-medium">
                ${venta.total_venta}
              </p>
            </div>
          </div>
          <div>
            {venta.total_venta > 0 ? (
              <input
                type="submit"
                className="bg-principal text-white cursor-pointer font-bold py-2 px-4 rounded"
                value="Realizar venta"
              />
            ) : null}
          </div>
        </div>
      </form>
    </>
  );
};

export default CrearVenta;
