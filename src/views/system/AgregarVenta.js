import CrearVenta from "../../components/layout/system/CrearVenta";
import MenuHamburguesa from "../../components/layout/system/MenuHamburguesa";

const AgregarVenta = () => {
  return (
    <>
      <MenuHamburguesa />

      <div className="sm:ml-64">
        <div className="p-4 rounded-lg mt-12 sm:mt-12">
          <div className="flex  items-center mb-4">
            <h2 className="text-2xl p-4 font-semibold  text-gray-900 ">
              Nueva venta <span className="text-principal">la FÉ</span>
            </h2>
          </div>
          <div className="relative overflow-x-auto sm:rounded-lg">
            <CrearVenta />
          </div>
        </div>
      </div>
    </>
  );
};

export default AgregarVenta;
