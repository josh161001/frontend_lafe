import { useNavigate, useParams } from "react-router-dom";
import url_axios from "../../../config/Axios";
import Swal from "sweetalert2";
import { LaFeContext } from "../../../context/LaFeContext";
import { useContext, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import es from "date-fns/locale/es";

const FormEditarProducto = () => {
  const [auth, setAuth] = useContext(LaFeContext);
  const { id } = useParams();
  const [categorias, setCategorias] = useState([]);
  const [producto, datoProducto] = useState({
    nombre: "",
    fecha_caducidad: new Date(), //inicializar con fecha actual
    cantidad_producto: "",
    precio_venta: "",
    category_id: "",
  });

  const navigate = useNavigate();

  const consultarProducto = async () => {
    if (auth.access_token !== "") {
      try {
        const respuesta = await url_axios.get(`/productos/${id}`, {
          headers: {
            Authorization: `Bearer ${auth.access_token}`,
          },
        });

        datoProducto({
          ...respuesta.data.data,
          // obtiene el id de la categoria del producto para mostrarlo en el select
          category_id: respuesta.data.data.category.id,
        });
      } catch (error) {
        Swal.fire("Error", error.response.data.message, "error");
      }
    } else {
      navigate("/");
    }
  };
  useEffect(() => {
    consultarProducto();
  }, []);

  const productoState = (e) => {
    if (e.target.name === "category_id") {
      const categoria = parseInt(e.target.value, 10);
      datoProducto({ ...producto, category_id: categoria });
    } else {
      datoProducto({ ...producto, [e.target.name]: e.target.value });
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

  const guardarProducto = async (e) => {
    e.preventDefault();

    if (auth.access_token !== "") {
      try {
        const dataProducto = {
          nombre: producto.nombre,
          fecha_caducidad:
            producto.fecha_caducidad instanceof Date
              ? producto.fecha_caducidad.toISOString()
              : producto.fecha_caducidad,
          cantidad_producto: parseInt(producto.cantidad_producto),
          precio_venta: parseInt(producto.precio_venta),
          category_id: parseInt(producto.category_id, 10),
        };
        url_axios.patch(`/productos/${id}`, dataProducto, {
          headers: {
            Authorization: `Bearer ${auth.access_token}`,
          },
        });

        Swal.fire({
          icon: "success",
          title: "Producto actualizado",
          message: "El producto se ha actualizado correctamente",
        });

        navigate("/productos");
      } catch (error) {
        const errorMensaje = error.response.data.message;
        Swal.fire("Error", errorMensaje, "error");
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
        Swal.fire("Error", error.response.data.message, "error");
      }
    } else {
      navigate("/");
    }
  };

  useEffect(() => {
    obtenerCategorias();
  }, []);

  return (
    <form className="mt-2" onSubmit={guardarProducto}>
      {/*  */}
      <div className="grid grid-cols-1 lg:grid-cols-2 md:grid-cols-2 gap-2">
        <div>
          <label className="block text-xs font-semibold">Nombre</label>
          <input
            value={producto.nombre}
            name="nombre"
            type="text"
            placeholder="nombre..."
            className="block w-full rounded-md border border-gray-300 focus:border-verde focus:outline-none focus:ring-1 focus:ring-verde py-1 px-1.5 text-gray-500"
            onChange={productoState}
          />
        </div>
        <div>
          <label className="block text-xs font-bold ">Fecha del producto</label>
          <DatePicker
            selected={
              producto.fecha_caducidad && new Date(producto.fecha_caducidad)
            }
            onChange={(date) =>
              datoProducto({ ...producto, fecha_caducidad: date })
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
            value={producto.cantidad_producto}
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
            value={producto.precio_venta}
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
          Editar Producto
        </button>
      </div>
    </form>
  );
};
export default FormEditarProducto;
