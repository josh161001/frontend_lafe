import FormEditarUsuario from "../../components/layout/system/FormEditarUsuario";
import MenuHamburguesa from "../../components/layout/system/MenuHamburguesa";

const EditarUsuario = () => {
  return (
    <>
      <MenuHamburguesa />
      <div>
        <div className="sm:ml-64">
          <div className="p-4 rounded-lg mt-12 sm:mt-12">
            <div className="flex  items-center mb-4">
              <h2 className="text-2xl p-4 font-semibold  text-gray-900 ">
                Editar Usuario{" "}
                <span className="text-principal font-bold">Lafé</span>
              </h2>
            </div>
            <div className="flex  items-center justify-center ">
              <div className="bg-white rounded-md shadow-lg p-4 sm:p-12">
                <h1 className="text-xl sm:text-2xl font-semibold mb-2">
                  Editar un usuario en
                  <span className="text-principal"> la Fe</span>
                </h1>
                <small className="text-gray-400">
                  Para editar un usuario ingresa los siguientes datos
                </small>
                <FormEditarUsuario />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditarUsuario;