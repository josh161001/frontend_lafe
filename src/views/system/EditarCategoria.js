import FormEditarCategoria from "../../components/layout/system/FormEditarCategoria";
import FormRegistrarCategoria from "../../components/layout/system/FormRegistrarCategoria";
import MenuHamburguesa from "../../components/layout/system/MenuHamburguesa";

const EditarCategoria = () => {
  return (
    <>
      <MenuHamburguesa />
      <div>
        <div className="sm:ml-64">
          <div className="p-4 rounded-lg mt-12 sm:mt-12">
            <div className="flex  items-center mb-4">
              <h2 className="text-2xl p-4 font-semibold  text-gray-900 ">
                Editar Categorias{" "}
                <span className="text-principal font-bold">la FÉ</span>
              </h2>
            </div>
            <div className="flex  items-center justify-center ">
              <div className="bg-white rounded-md shadow-lg p-4 sm:p-12">
                <h1 className="text-xl sm:text-2xl font-semibold mb-2">
                  Editar categorias en
                  <span className="text-principal"> la FÉ</span>
                </h1>
                <small className="text-gray-400">
                  Para Editar una categoria ingresa los siguientes datos
                </small>
                <FormEditarCategoria />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default EditarCategoria;
