import { useContext, useEffect, useState } from "react";
import { LaFeContext } from "../../../context/LaFeContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import es from "date-fns/locale/es";
import { useNavigate } from "react-router-dom";
import url_axios from "../../../config/Axios";
import Swal from "sweetalert2";

const FormRegistrarProducto = () => {
  const [auth, setAuth] = useContext(LaFeContext);
  const [categorias, setCategorias] = useState([]);
  const [producto, setProducto] = useState({
    nombre: "",
    fecha_caducidad: new Date(), //inicializar con fecha actual
    cantidad_producto: "",
    precio_venta: "",
    category_id: "",
  });

  const navigate = useNavigate();

  const productoState = (e) => {
    if (e.target.name === "category_id") {
      setProducto({ ...producto, category_id: e.target.value });
    } else {
      setProducto({ ...producto, [e.target.name]: e.target.value });
    }
  };

  const validarProducto = () => {
    const {
      nombre,
      fecha_caducidad,
      cantidad_producto,
      precio_venta,
      category_id,
    } = producto;

    return (
      !nombre ||
      !fecha_caducidad ||
      !cantidad_producto ||
      !precio_venta ||
      !category_id
    );
  };

  const guardarProductos = async (e) => {
    e.preventDefault();

    if (auth.access_token !== "") {
      try {
        const {
          nombre,
          fecha_caducidad,
          cantidad_producto,
          precio_venta,
          category_id,
        } = producto;

        const data = {
          nombre,
          fecha_caducidad: fecha_caducidad.toISOString(),
          cantidad_producto: parseInt(cantidad_producto),
          precio_venta: parseInt(precio_venta),
          category_id: parseInt(category_id, 10),
        };

        const respuesta = await url_axios.post("/productos", data, {
          headers: {
            Authorization: `Bearer ${auth.access_token}`,
          },
        });

        Swal.fire({
          icon: "success",
          title: "Producto registrado",
          text: "El producto se ha registrado correctamente",
        });

        navigate("/productos");
      } catch (error) {
        const errorMensaje = error.response.data.message;
        Swal.fire({
          icon: "error",
          title: "Error",
          text: errorMensaje,
        });
      }
    } else {
      navigate("/");
    }
  };

  const obtenerCategorias = async () => {
    if (auth.access_token !== "") {
      try {
        const respuesta = await url_axios.get("/categories", {
          headers: {
            Authorization: `Bearer ${auth.access_token}`,
          },
        });
        setCategorias(respuesta.data.data);
      } catch (error) {
        const errorMensaje = error.response.data.message;
        Swal.fire({
          icon: "error",
          title: "Error",
          text: errorMensaje,
        });
      }
    } else {
      navigate("/");
    }
  };

  useEffect(() => {
    obtenerCategorias();
  }, []);

  return (
    <form className="mt-2" onSubmit={guardarProductos}>
      {/*  */}
      <div className="grid grid-cols-1 lg:grid-cols-2 md:grid-cols-2 gap-2">
        <div>
          <label className="block text-xs font-semibold">Nombre</label>
          <input
            required
            name="nombre"
            type="text"
            placeholder="nombre..."
            className="block w-full rounded-md border border-gray-300 focus:border-verde focus:outline-none focus:ring-1 focus:ring-verde py-1 px-1.5 text-gray-500"
            onChange={productoState}
          />
        </div>
        <div>
          <label className="block text-xs font-bold ">Fecha de caducidad</label>
          <DatePicker
            selected={producto.fecha_caducidad}
            onChange={(date) =>
              setProducto({ ...producto, fecha_caducidad: date })
            }
            locale={es}
            showTimeSelect
            timeIntervals={15}
            timeCaption="Hora"
            dateFormat="dd/MM/yyyy h:mm aa"
            className="bg-principal border border-secundario text-white text-xs rounded-lg focus:ring-secundario focus:border-secundario block w-full  p-1.5 "
          />
        </div>
        <div>
          <label className="block text-xs font-semibold">
            Cantidad de producto
          </label>
          <input
            required
            name="cantidad_producto"
            type="text"
            placeholder="cantidad..."
            className="block w-full rounded-md border border-gray-300 focus:border-verde focus:outline-none focus:ring-1 focus:ring-verde py-1 px-1.5 text-gray-500"
            onChange={productoState}
          />
        </div>
        <div>
          <label className="block text-xs font-semibold">Precio de venta</label>
          <input
            required
            name="precio_venta"
            type="text"
            placeholder="precio..."
            className="block w-full rounded-md border border-gray-300 focus:border-verde focus:outline-none focus:ring-1 focus:ring-verde py-1 px-1.5  text-gray-500"
            onChange={productoState}
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-white">
            Categoría del producto
          </label>
          <select
            name="category_id"
            className="border text-xs rounded-lg  block w-full p-1.5 bg-principal border-secundario  text-white focus:ring-secundario focus:border-secundario"
            onChange={productoState}
            value={producto.category_id}
          >
            <option disabled value="">
              Selecciona una categoría
            </option>
            {categorias.map((categoria) => (
              <option key={categoria.id} value={categoria.id}>
                {categoria.nombre}
              </option>
            ))}
          </select>
        </div>
      </div>{" "}
      <div className=" mt-4 flex gap-2">
        <button
          disabled={validarProducto()}
          className={`mb-1.5 block w-full text-center text-white px-3 py-1.5 rounded-md ${
            validarProducto() ? "bg-secundario " : "bg-principal"
          }`}
        >
          Registrar Producto
        </button>
      </div>
    </form>
  );
};

export default FormRegistrarProducto;
