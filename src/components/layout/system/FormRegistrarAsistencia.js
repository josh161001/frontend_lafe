import { useContext, useState } from "react";
import { LaFeContext } from "../../../context/LaFeContext";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import url_axios from "../../../config/Axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import es from "date-fns/locale/es";

const FormRegistrarAsistencia = () => {
  const [auth, setAuth] = useContext(LaFeContext);
  const [asistencia, guardarAsistencia] = useState({
    hora_entrada: new Date(),
  });

  const navigate = useNavigate();

  const asistenciaState = (e) => {
    guardarAsistencia({
      ...asistencia,
      [e.target.name]: e.target.value,
    });
  };

  const validarAsistencia = () => {
    const { hora_entrada } = asistencia;

    return !hora_entrada;
  };

  const guardarAsistencias = (e) => {
    e.preventDefault();

    if (auth.access_token !== "") {
      url_axios
        .post("/asistencia", asistencia, {
          headers: {
            Authorization: `Bearer ${auth.access_token}`,
          },
        })
        .then((res) => {
          Swal.fire({
            icon: "success",
            title: "Asistencia creada",
            text: "La asistencia se ha creado correctamente",
          });

          auth.rol.includes("ADMIN")
            ? navigate("/asistencias")
            : navigate("/ventas");
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
    <form className="mt-2" onSubmit={guardarAsistencias}>
      {/*  */}
      <div>
        <label className="block text-xs w-full font-bold ">
          Fecha de ingreso{" "}
        </label>
        <DatePicker
          selected={asistencia.hora_entrada}
          onChange={(date) =>
            guardarAsistencia({ ...asistencia, hora_entrada: date })
          }
          locale={es}
          showTimeSelect
          timeIntervals={15}
          timeCaption="Hora"
          dateFormat="dd/MM/yyyy h:mm aa"
          className="bg-principal border border-secundario text-white text-xs rounded-lg focus:ring-secundario focus:border-secundario block w-full  p-1.5 "
        />
      </div>

      <div className=" mt-4 flex gap-2">
        <button
          disabled={validarAsistencia()}
          className={`mb-1.5 block w-full text-center text-white px-3 py-1.5 rounded-md ${
            validarAsistencia() ? "bg-secundario " : "bg-principal"
          }`}
        >
          Registrar asistencia
        </button>
      </div>
    </form>
  );
};

export default FormRegistrarAsistencia;
